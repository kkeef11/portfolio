import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";
export const maxDuration = 60; // Exa calls can take a few seconds each

const EXA_ENDPOINT = "https://api.exa.ai/search";

// Discovery queries. Exa returns an AI summary per result, so this is the only
// paid step — no separate LLM needed.
const QUERIES: { query: string; category: string }[] = [
  {
    query:
      "Anthropic or Claude announcement — a new model, API change, feature, or research post",
    category: "anthropic",
  },
  {
    query:
      "major AI model release or significant AI industry news from OpenAI, Google, Meta, or an open-source lab",
    category: "industry",
  },
  {
    query: "notable AI agent framework or AI developer-tooling release",
    category: "industry",
  },
];

interface ExaResult {
  title?: string;
  url: string;
  publishedDate?: string;
  summary?: string;
}

async function exaSearch(
  query: string,
  apiKey: string,
  sinceISO: string
): Promise<ExaResult[]> {
  const res = await fetch(EXA_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey },
    body: JSON.stringify({
      query,
      type: "auto",
      category: "news",
      numResults: 8,
      startPublishedDate: sinceISO,
      contents: {
        summary: {
          query:
            "One or two sentence summary of what happened and why it matters.",
        },
      },
    }),
  });
  if (!res.ok) throw new Error(`Exa ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.results ?? []) as ExaResult[];
}

export async function GET(req: NextRequest) {
  // 1) Auth — only Vercel Cron (which sends this header when CRON_SECRET is set)
  //    or someone holding the secret may trigger the paid Exa work.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    if (req.headers.get("authorization") !== `Bearer ${secret}`) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  const apiKey = process.env.EXA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "EXA_API_KEY not set" }, { status: 500 });
  }

  // 2) Idempotency — if we already refreshed in the last 12h, do nothing.
  //    Guards against repeated triggers multiplying Exa usage.
  const latest = await prisma.article.findFirst({
    orderBy: { createdAt: "desc" },
  });
  if (latest && Date.now() - latest.createdAt.getTime() < 12 * 60 * 60 * 1000) {
    return NextResponse.json({
      skipped: true,
      reason: "already refreshed within 12h",
    });
  }

  const sinceISO = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

  // 3) Discover + summarize via Exa (dedup by URL across queries).
  const collected = new Map<
    string,
    {
      title: string;
      summary: string;
      url: string;
      source: string | null;
      category: string;
      publishedAt: Date | null;
    }
  >();
  const errors: string[] = [];

  for (const { query, category } of QUERIES) {
    try {
      const results = await exaSearch(query, apiKey, sinceISO);
      for (const r of results) {
        if (!r.url || !r.title || !r.summary) continue;
        if (collected.has(r.url)) continue;
        let source: string | null = null;
        try {
          source = new URL(r.url).hostname.replace(/^www\./, "");
        } catch {}
        collected.set(r.url, {
          title: r.title.trim(),
          summary: r.summary.trim(),
          url: r.url,
          source,
          category,
          publishedAt: r.publishedDate ? new Date(r.publishedDate) : null,
        });
      }
    } catch (e) {
      errors.push(String(e));
    }
  }

  // 4) Store — the @unique url + skipDuplicates makes this dedup-safe.
  const rows = Array.from(collected.values());
  let inserted = 0;
  if (rows.length) {
    const result = await prisma.article.createMany({
      data: rows,
      skipDuplicates: true,
    });
    inserted = result.count;
  }

  // 5) Retention — prune anything older than the window, but ALWAYS keep at least
  //    the newest N (the floor) so a long quiet stretch can't empty the feed.
  //    Configurable via NEWS_RETENTION_DAYS (default 7) and NEWS_RETENTION_FLOOR (default 8).
  const retentionDays = Number(process.env.NEWS_RETENTION_DAYS ?? 7);
  const floor = Number(process.env.NEWS_RETENTION_FLOOR ?? 8);
  const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000);
  const keep = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: floor,
    select: { id: true },
  });
  const pruned = await prisma.article.deleteMany({
    where: {
      createdAt: { lt: cutoff },
      id: { notIn: keep.map((k) => k.id) },
    },
  });

  return NextResponse.json({
    ok: true,
    found: rows.length,
    inserted,
    pruned: pruned.count,
    errors,
  });
}
