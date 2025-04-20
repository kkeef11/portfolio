import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

interface DataPoint {
  timestamp: string | number;
  price: number;
}

function BaseRechartLineGraph({ data }: { data: DataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <Area
          type="monotone"
          dataKey="price"
          stroke="#083852"
          fill="url(#colorPrice)"
          strokeWidth={2}
        />
        <XAxis dataKey="date" stroke="white" />
        <YAxis stroke="white" />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default BaseRechartLineGraph;
