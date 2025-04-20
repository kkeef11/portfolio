import React from "react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { extent, max } from "d3-array";
import { Group } from "@visx/group";

type Datum = {
  timestamp: number;
  price: number;
};

type Props = {
  data: Datum[];
  width: number;
  height: number;
};

const margin = { top: 20, right: 30, bottom: 40, left: 50 };

function BaseVisxLineGraph({ data, width, height }: Props) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleTime({
    range: [0, innerWidth],
    domain: extent(data, (d) => new Date(d.timestamp)) as [Date, Date],
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [0, max(data, (d) => d.price) ?? 0],
    nice: true,
  });

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        <LinePath
          data={data}
          x={(d) => xScale(new Date(d.timestamp)) ?? 0}
          y={(d) => yScale(d.price) ?? 0}
          stroke="#222"
          strokeWidth={1.5}
        />
        <AxisBottom
          top={innerHeight}
          scale={xScale}
          stroke="white"
          tickStroke="white"
          tickLabelProps={() => ({
            fill: "white",
            fontSize: 11,
            dx: -35,
            dy: 3,
          })}
        />
        <AxisLeft
          scale={yScale}
          stroke="white"
          tickStroke="white"
          tickLabelProps={() => ({
            fill: "white",
            fontSize: 11,
            dx: -35,
            dy: 3,
          })}
        />
      </Group>
    </svg>
  );
}

export default BaseVisxLineGraph;
