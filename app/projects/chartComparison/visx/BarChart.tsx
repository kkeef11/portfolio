import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientTealBlue } from "@visx/gradient";
import { CryptoAsset } from "@/app/lib/types";
import { useMemo } from "react";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";

function VisxBarChart({
  data,
  height,
  width,
}: {
  data: CryptoAsset[];
  height: number;
  width: number;
}) {
  const margin = { top: 0, bottom: 100, left: 0, right: 20 };
  const xMax = width - margin.left - margin.right;
  const yMax = height;

  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, width],
        domain: data.map((point) => point.name),
        padding: 0.4,
      }),
    [data, xMax]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [
          0,
          Math.max(...data.map((point) => Number(point.marketCapUsd))),
        ],
      }),
    [data, yMax]
  );

  return (
    <svg width={width} height={height} overflow="visible">
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={margin.top} left={margin.left}>
        {data.map((d, i) => {
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(Number(d.marketCapUsd)) ?? 0);
          const barX = xScale(d.name);
          const barY = yScale(Number(d.marketCapUsd));
          return (
            <Bar
              key={`bar-${i}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
            />
          );
        })}
        {/* <AxisBottom top={yMax} scale={xScale} />
        <AxisLeft scale={yScale} /> */}
        <AxisBottom
          top={height} // Position the X-axis at the bottom of the chart area
          scale={xScale} // Correctly reference xScale
          numTicks={width > 520 ? 10 : 5}
          stroke="white"
          tickStroke="white"
          tickLabelProps={() => ({
            fill: "white",
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
        <AxisLeft
          scale={yScale} // Correctly reference yScale
          stroke="white"
          tickStroke="white"
          tickLabelProps={() => ({
            fill: "white",
            fontSize: 11,
            textAnchor: "middle",
          })}
        />
      </Group>
    </svg>
  );
}

export default VisxBarChart;
