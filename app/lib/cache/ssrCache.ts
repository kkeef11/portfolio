import { CryptoAssetFields } from "@/app/api/lib/types";

type CacheEntry = {
  data: CryptoAssetFields;
  timestamp: number;
};

const ssrCache: Record<string, CacheEntry> = {};

export const getCachedSSRData = (key: string, maxAgeMs = 1000 * 60) => {
  const entry = ssrCache[key];
  if (!entry) return null;
  const isExpired = Date.now() - entry.timestamp > maxAgeMs;
  return isExpired ? null : entry.data;
};

export const setCachedSSRData = (key: string, data: CryptoAssetFields) => {
  ssrCache[key] = {
    data,
    timestamp: Date.now(),
  };
};
