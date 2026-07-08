import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

// Always read fresh from the DB (no static caching).
export const dynamic = "force-dynamic";

// Public read endpoint: returns the most recent stored articles.
// No API keys, no external calls — just rows from Supabase.
export async function GET() {
  try {
    // "Latest batch only" — return just the most recent refresh run's items.
    // A run inserts its rows within the same minute, so a window back from the
    // newest row captures exactly that batch and excludes the prior day's
    // (which is 24h+ older). Short/older on quiet days — by design.
    const newest = await prisma.article.findFirst({
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    });
    if (!newest) return NextResponse.json({ articles: [], lastUpdated: null });

    const since = new Date(newest.createdAt.getTime() - 18 * 60 * 60 * 1000);
    const articles = await prisma.article.findMany({
      where: { createdAt: { gte: since } },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json({ articles, lastUpdated: newest.createdAt });
  } catch {
    return NextResponse.json({ error: "Failed to load news" }, { status: 500 });
  }
}
