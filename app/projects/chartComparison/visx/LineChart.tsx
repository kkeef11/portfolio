import React, { useEffect, useRef, useState } from "react";
import { LinePath, Bar, AreaClosed, Line } from "@visx/shape";
import { Group } from "@visx/group";
import { curveMonotoneX } from "@visx/curve";
import { scaleTime, scaleLinear } from "@visx/scale";
import {
  useTooltip,
  TooltipWithBounds,
  defaultStyles,
  Tooltip,
} from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { bisector } from "d3-array";
import { LinearGradient } from "@visx/gradient";
import { GridColumns, GridRows } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { useCallback, useMemo } from "react";
import dayjs from "dayjs";

type Data = {
  timestamp: string;
  price: number;
};

type VisxLineGraphProps = {
  data: Data[];
  height: number;
  width: number;
};

const VisxLineGraph = React.memo(
  ({ data, width, height }: VisxLineGraphProps) => {
    // Define the margins
    const margin = { top: 10, right: 10, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const tooltipPadding = 12;
    const tooltipOffset = 115;
    const tooltipStyles = {
      ...defaultStyles,
      background: "#3b6978",
      border: "1px solid white",
      color: "white",
    };

    const xAccessor = (d) => d.timestamp;
    const yAccessor = (d) => d.price;
    const formatDate = (d) => dayjs(d).format("YYYY-MM-DD HH:mm:ss");
    const bisectDate = bisector<Data, Date>((d) => new Date(d.timestamp)).left;

    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: [
            new Date(Math.min(...data.map((d) => xAccessor(d)))),
            new Date(Math.max(...data.map((d) => xAccessor(d)))),
          ],
        }),
      [innerWidth, margin.left, data]
    );
    const priceScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [
            Math.min(...data.map(yAccessor)),
            Math.max(...data.map(yAccessor)),
          ],
          nice: true,
        }),
      [margin.top, innerHeight]
    );

    const {
      tooltipData,
      tooltipLeft = 0,
      tooltipTop = 0,
      tooltipOpen,
      showTooltip,
      hideTooltip,
    } = useTooltip();

    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = dateScale.invert(x);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;
        if (d1 && xAccessor(d1)) {
          d =
            x0.valueOf() - xAccessor(d0).valueOf() >
            xAccessor(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }

        const isRightSide = tooltipLeft > width / 2;
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: priceScale(yAccessor(d)),
        });
      },
      [showTooltip, priceScale, dateScale]
    );

    return (
      <div style={{ position: "relative" }}>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#area-background-gradient)"
            rx={14}
          />
          <Group top={margin.top}>
            <LinearGradient
              id="area-background-gradient"
              from="#d1dadc"
              to="#b5bdbf"
            />
            <LinearGradient
              id="area-gradient"
              from="#4597c1"
              to="#346f8e"
              toOpacity={0.1}
            />
            <GridRows
              left={margin.left}
              scale={priceScale}
              width={innerWidth}
              height={innerHeight - 1}
              stroke="#e0e0e0"
            />
            <AreaClosed<Data>
              data={data}
              x={(d) => dateScale(xAccessor(d)) ?? 0}
              y={(d) => priceScale(yAccessor(d)) ?? 0}
              yScale={priceScale}
              strokeWidth={1}
              stroke="url(#area-gradient)"
              fill="url(#area-gradient)"
              curve={curveMonotoneX}
            />
            <AxisLeft
              left={margin.left}
              scale={priceScale}
              stroke="white"
              tickStroke="white"
              tickLabelProps={() => ({
                fill: "#083852",
                fontSize: 11,
                dx: -35,
                dy: 3,
              })}
            />
            <AxisBottom
              top={innerHeight + margin.top}
              scale={dateScale}
              stroke="white"
              tickStroke="white"
              tickLabelProps={() => ({
                fill: "#083852",
                fontSize: 11,
                dx: -50,
                dy: 3,
              })}
              tickFormat={(d) => {
                const date = new Date(d);
                return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
              }}
              tickValues={[xAccessor(data[Math.floor(data.length / 2)])]}
              numTicks={1}
            />
            <LinePath
              data={data}
              curve={curveMonotoneX}
              x={(d) => dateScale(xAccessor(d))}
              y={(d) => priceScale(yAccessor(d))}
              stroke="#083852"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <Bar
              x={margin.left}
              y={margin.top}
              width={innerWidth}
              height={innerHeight}
              fill="transparent"
              rx={14}
              onTouchStart={handleTooltip}
              onTouchMove={handleTooltip}
              onMouseMove={handleTooltip}
              onMouseLeave={() => hideTooltip()}
            />
            {tooltipData && (
              <g>
                <Line
                  from={{ x: tooltipLeft, y: margin.top }}
                  to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                  stroke="#75daad"
                  strokeWidth={2}
                  pointerEvents="none"
                  strokeDasharray="5,2"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop + 1}
                  r={4}
                  fill="black"
                  fillOpacity={0.1}
                  stroke="black"
                  strokeOpacity={0.1}
                  strokeWidth={2}
                  pointerEvents="none"
                />
                <circle
                  cx={tooltipLeft}
                  cy={tooltipTop}
                  r={4}
                  fill="#75daad"
                  stroke="white"
                  strokeWidth={2}
                  pointerEvents="none"
                />
              </g>
            )}
          </Group>
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 12}
              left={
                tooltipLeft > width - 150
                  ? tooltipLeft - tooltipOffset
                  : tooltipLeft + tooltipPadding
              }
              style={tooltipStyles}
            >
              {`$${Number(yAccessor(tooltipData)).toFixed(2)}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top + 12}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
              }}
            >
              {formatDate(xAccessor(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
);

export default VisxLineGraph;
