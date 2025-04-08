"use client";

import { Grid2 } from "@mui/material";
import React from "react";
import VisxBarChart from "./visx/BarChart";
import RechartsBarChart from "./recharts/BarChart";
import { useCrypto } from "@/app/queries/crypto";

const Page = () => {
  const { data: cryptoData, isLoading: cryptoLoading } = useCrypto();
  let firstTen = null;
  if (cryptoData && cryptoData?.data) {
    firstTen = cryptoData.data.slice(0, 10);
  }
  return (
    <Grid2 container padding="2rem" display="flex" justifyContent="center">
      <Grid2 padding="1rem" size={{ xs: 12, md: 8, lg: 6 }}>
        {firstTen && <VisxBarChart height={200} width={400} data={firstTen} />}
      </Grid2>
      <Grid2 padding="1rem" size={{ xs: 12, md: 8, lg: 6 }}>
        {firstTen && (
          <RechartsBarChart height={200} width={400} data={firstTen} />
        )}
      </Grid2>
    </Grid2>
  );
};

export default Page;
