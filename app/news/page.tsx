"use client";

import {
  Box,
  CircularProgress,
  Divider,
  Grid2,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useFetchNews, type Article } from "../queries/news";

const MotionBox = motion(Box);

function ArticleCard({ a }: { a: Article }) {
  return (
    <MotionBox
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}
      sx={{
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: "8px",
        padding: "1.25rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <MuiLink
        href={a.url}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
      >
        <Typography sx={{ color: "white", fontWeight: 600, lineHeight: 1.3 }}>
          {a.title}
        </Typography>
      </MuiLink>
      <Typography variant="body2" sx={{ color: "#aaaaaa", flexGrow: 1 }}>
        {a.summary}
      </Typography>
      <Typography variant="caption" sx={{ color: "#555555" }}>
        {a.source ?? "source"}
        {a.publishedAt
          ? ` · ${new Date(a.publishedAt).toLocaleDateString()}`
          : ""}
      </Typography>
    </MotionBox>
  );
}

function Section({ title, items }: { title: string; items: Article[] }) {
  if (!items.length) return null;
  return (
    <Grid2 size={{ xs: 12, md: 10, lg: 8 }} sx={{ marginBottom: "2.5rem" }}>
      <Typography variant="h5" sx={{ color: "white", marginBottom: "1rem" }}>
        {title}
      </Typography>
      <Grid2 container spacing={3}>
        {items.map((a) => (
          <Grid2 key={a.id} size={{ xs: 12, sm: 6 }} sx={{ display: "flex" }}>
            <ArticleCard a={a} />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}

export default function NewsPage() {
  const { data, isLoading, isError } = useFetchNews();
  const articles = data?.articles ?? [];
  const lastUpdated = data?.lastUpdated ?? null;
  const anthropic = articles.filter((a) => a.category === "anthropic");
  const industry = articles.filter((a) => a.category !== "anthropic");

  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      sx={{ width: "100%", paddingBottom: "3rem" }}
    >
      <Grid2
        size={{ xs: 12, md: 8, lg: 6 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography
          variant="h2"
          sx={{
            background: "linear-gradient(90deg, #865bec, white)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            paddingTop: "5rem",
          }}
        >
          AI News
        </Typography>
        <Typography
          variant="h6"
          color="#aaaaaa"
          textAlign="center"
          paddingTop="1rem"
          sx={{ "@media (max-width: 900px)": { fontSize: "1rem" } }}
        >
          An auto-updating feed of what&apos;s new in AI — Anthropic and Claude
          first, then the broader industry. Headlines are discovered by neural
          (semantic) search via Exa and summarized automatically, refreshed each
          morning by a scheduled cloud job. This shows only the{" "}
          <strong>latest batch</strong>, so a quiet day is short by design.
        </Typography>
        {lastUpdated && (
          <Typography
            variant="body2"
            sx={{ color: "#777777", marginTop: "1rem" }}
          >
            Latest fetch ·{" "}
            {new Date(lastUpdated).toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </Typography>
        )}
        <Divider
          sx={{
            backgroundColor: "white",
            height: "2px",
            width: "100%",
            marginY: "2rem",
          }}
        />
      </Grid2>

      {isLoading && (
        <CircularProgress sx={{ color: "#865bec", marginTop: "2rem" }} />
      )}

      {isError && (
        <Typography color="#aaaaaa" sx={{ marginTop: "2rem" }}>
          Couldn&apos;t load the news feed right now. Try again shortly.
        </Typography>
      )}

      {!isLoading && !isError && articles.length === 0 && (
        <Typography color="#aaaaaa" sx={{ marginTop: "2rem" }}>
          Nothing new surfaced in the latest run — check back after the next
          refresh.
        </Typography>
      )}

      <Section title="Anthropic / Claude" items={anthropic} />
      <Section title="Industry" items={industry} />
    </Grid2>
  );
}
