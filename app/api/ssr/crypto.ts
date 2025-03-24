import { API_ENDPOINTS } from "../../lib/config";
import { CryptoAssetResponse } from "@/app/lib/types";

export const fetchCryptoDataSSR = async (): CryptoAssetResponse => {
  const startTime = Date.now();
  const response = await fetch(API_ENDPOINTS.crypto, {
    cache: "no-store",
  }).then((res) => res.json());
  if (!response) {
    throw new Error("Failed to fetch crypto data");
  }
  const endTime = Date.now();

  return { data: response.data, timestamp: endTime - startTime };
};
