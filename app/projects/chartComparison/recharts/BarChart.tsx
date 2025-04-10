import { CryptoAsset } from "@/app/api/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function RechartsBarChart({
  data,
  height,
  width,
}: {
  data: CryptoAsset[];
  height: number;
  width: number;
}) {
  const formattedData = data.map((point) => ({
    name: point.name,
    "Market Cap USD": point.marketCapUsd,
  }));
  return (
    <BarChart width={width} height={height} data={formattedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      hat
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Market Cap USD" fill="#8884d8" />
    </BarChart>
  );
}

export default RechartsBarChart;
