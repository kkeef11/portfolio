import { useQuery } from "@tanstack/react-query";
import { fetchCryptoDataCSR } from "../api/csr/crypto";

export function useCrypto() {
  return useQuery({
    queryKey: ["crypto"],
    queryFn: fetchCryptoDataCSR,
    staleTime: 180000,
    select: (response) => {
      console.log("CSR Data:", response.data);
      return {
        data: response.data,
        timeStamp: response.timestamp,
      };
    },
  });
}
