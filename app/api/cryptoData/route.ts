// app/api/cryptoData/route.ts
import { fetchCryptoData } from "../lib/dynamodb";

export async function GET() {
  try {
    const data = await fetchCryptoData();
    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
