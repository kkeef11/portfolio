import { getCachedSSRData, setCachedSSRData } from "@/app/lib/cache/ssrCache";
import { SSR_API_ENDPOINTS } from "../lib/config";
import { CryptoAssetFields, CryptoAssetResponse } from "@/app/api/lib/types";

export const fetchCryptoDataSSR = async (): CryptoAssetResponse => {
  const cacheKey = "cryptoData";
  const cached = getCachedSSRData(cacheKey);

  if (cached) {
    return {
      data: cached.data,
      timestamp: 0,
      wasCached: true,
    };
  }

  const start = performance.now();
  const response: CryptoAssetFields = await fetch(SSR_API_ENDPOINTS.crypto, {
    cache: "no-store",
  }).then((res) => res.json());
  if (!response) {
    throw new Error("Failed to fetch crypto data");
  }
  const end = performance.now();
  setCachedSSRData(cacheKey, response);
  return { data: response.data, timestamp: end - start, wasCached: false };
};
