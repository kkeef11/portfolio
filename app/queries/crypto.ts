import { useQuery } from "@tanstack/react-query";
import { fetchCryptoDataCSR } from "../api/csr/crypto";

export function useCrypto() {
  return useQuery({
    queryKey: ["crypto"],
    queryFn: fetchCryptoDataCSR,
    staleTime: 180000,
    select: (response) => ({
      data: response.data,
      timeStamp: response.timestamp,
    }),
  });
}
