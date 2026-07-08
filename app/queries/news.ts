import { useQuery } from "@tanstack/react-query";

export interface Article {
  id: string;
  title: string;
  summary: string;
  url: string;
  source?: string | null;
  category: string; // "anthropic" | "industry"
  publishedAt?: string | null;
  createdAt: string;
}

export function useFetchNews() {
  return useQuery<{ articles: Article[]; lastUpdated: string | null }>({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error("Failed to load news");
      return res.json();
    },
    staleTime: 1000 * 60 * 30, // 30 min
    refetchOnWindowFocus: false,
  });
}
