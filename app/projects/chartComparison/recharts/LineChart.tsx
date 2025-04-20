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
        backgroundColor: "#d0dadb",
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
              <stop offset="5%" stopColor="#4597c1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4597c1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="timestamp"
            stroke="white"
            tick={{ fontSize: 12, fill: "#083852" }}
            ticks={[data[Math.floor(data.length / 2)].timestamp]}
            tickFormatter={(d) => dayjs(d).format("YYYY-MM-DD HH:mm:ss")}
          />
          <YAxis
            domain={["dataMin - 500", "dataMax + 500"]}
            stroke="white"
            tick={{ fontSize: 12, fill: "#083852" }}
            tickCount={15}
            tickFormatter={(v) => v.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#3b6978",
              border: "1px solid white",
              color: "white",
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
            stroke="#083852"
            fill="url(#colorPrice)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default RechartLineGraph;
