import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import dayjs from "dayjs";
import { Card } from "@mui/material";

interface DataPoint {
  timestamp: string | number;
  price: number;
}

function RechartLineGraph({ data }: { data: DataPoint[] }) {
  return (
    <Card
      sx={{
        backgroundColor: "#323332",
      }}
    >
      <ResponsiveContainer
        width="100%"
        height={400}
        style={{ paddingTop: "1rem" }}
      >
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 20, left: 10 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#865bec" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#865bec" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#dadada" />
          <XAxis
            dataKey="timestamp"
            stroke="#dadada"
            tick={{ fontSize: 12, fill: "#dadada" }}
            ticks={[data[Math.floor(data.length / 2)].timestamp]}
            tickFormatter={(d) => dayjs(d).format("YYYY-MM-DD HH:mm:ss")}
          />
          <YAxis
            domain={[
              Math.min(...data.map((d) => d.price)) - 500,
              Math.max(...data.map((d) => d.price)) + 500,
            ]}
            stroke="#dadada"
            tick={{ fontSize: 12, fill: "#dadada" }}
            tickCount={15}
            tickFormatter={(v) => v.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#3b6978",
              border: "1px solid #dadada",
              color: "#dadada",
              borderRadius: 6,
            }}
            labelStyle={{ color: "#ffffff", fontSize: 12 }}
            formatter={(value) => [`$${Number(value).toFixed(2)}`, "Price"]}
            labelFormatter={(label) =>
              dayjs(label).format("YYYY-MM-DD HH:mm:ss")
            }
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#75daad"
            fill="url(#colorPrice)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default RechartLineGraph;
