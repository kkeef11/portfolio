import { CSR_API_ENDPOINTS } from "../lib/config";
import { CryptoAssetResponse } from "../lib/types";

export const fetchCryptoDataCSR = async (): CryptoAssetResponse => {
  const response = await fetch(CSR_API_ENDPOINTS.crypto).then((res) =>
    res.json()
  );
  if (!response) {
    throw new Error("Failed to fetch crypto data");
  }
  return { data: response.data, timestamp: Date.now(), wasCached: false };
};
