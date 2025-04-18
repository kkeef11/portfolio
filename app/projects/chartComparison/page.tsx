"use client";

import { Box, Grid } from "@mui/material";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { useFetchCryptoChartData } from "@/app/queries/crypto";
import RechartLineGraph from "./recharts/LineChart";
import VisxLineGraph from "./visx/LineChart";

function useResponsiveSize() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
}

const Page = () => {
  const [visxRef, visxSize] = useResponsiveSize();
  const { data: chartData, isLoading } = useFetchCryptoChartData({
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (chartData) {
      console.log("chartData", chartData.data.Items);
    }
  }, [chartData]);

  const memoizedChartData = useMemo(() => {
    return chartData?.data?.Items;
  }, [chartData]);
  return !isLoading && memoizedChartData ? (
    <Grid container padding="2rem" display="flex" justifyContent="center">
      <Grid padding="1rem" size={{ xs: 10, md: 10, lg: 10 }}>
        <div
          ref={visxRef}
          style={{
            width: "100%",
            height: 400, // Or responsive height based on your layout
          }}
        >
          {visxSize.width > 0 && visxSize.height > 0 && (
            <VisxLineGraph
              data={memoizedChartData}
              width={visxSize.width}
              height={visxSize.height}
            />
          )}
        </div>
      </Grid>
      <Grid padding="1rem" size={{ xs: 10, md: 10, lg: 10 }}>
        <RechartLineGraph data={memoizedChartData} />
      </Grid>
    </Grid>
  ) : (
    <Grid container padding="2rem" display="flex" justifyContent="center">
      Loading
    </Grid>
  );
};

export default Page;
