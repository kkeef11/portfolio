import { useQuery } from "@tanstack/react-query";
import { fetchCryptoDataCSR } from "../api/csr/crypto";

export function useFetchCryptoTableData() {
  return useQuery({
    queryKey: ["crypto"],
    queryFn: fetchCryptoDataCSR,
    staleTime: 180000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    meta: {
      timestamp: Date.now(),
    },
  });
}

export function useFetchCryptoChartData(options) {
  return useQuery({
    queryKey: ["cryptoData"],
    queryFn: async () => {
      console.log("Fetching data from API");
      return await fetch("/api/cryptoData").then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      });
    },
    staleTime: 900000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
