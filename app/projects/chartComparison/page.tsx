import { fetchCryptoData } from "@/app/api/lib/dynamodb";
import ChartPage from "./ChartPage";

export default async function Page() {
  const data = await fetchCryptoData();
  return <ChartPage data={data?.Items ?? []} />;
}
