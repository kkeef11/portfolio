"use client";

import { Box, Divider, Fade, Grid2, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useFetchCryptoChartData } from "@/app/queries/crypto";
import RechartLineGraph from "./recharts/LineChart";
import VisxLineGraph from "./visx/LineChart";
import useResponsiveSize from "@/app/hooks/useResponsiveSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faMagnifyingGlassArrowRight,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import BaseRechartLineGraph from "./recharts/BaseLineChart";
import FlipCard from "@/app/components/FlipCard";
import BaseVisxLineGraph from "./visx/BaseLineChart";

const MotionBox = motion(Box);

const Page = () => {
  const { data: chartData, isLoading } = useFetchCryptoChartData();
  const hasData = !!chartData?.data?.Items?.length;
  const [ref, { width }] = useResponsiveSize(hasData);
  const [customRechartView, setCustomRechartView] = useState(false);
  const [customVisxView, setCustomVisxView] = useState(false);

  useEffect(() => {
    if (chartData) {
      console.log("chartData", chartData.data.Items);
    }
  }, [chartData]);

  const memoizedChartData = useMemo(() => {
    return chartData?.data?.Items;
  }, [chartData]);
  return !isLoading && memoizedChartData ? (
    <Fade in={true} timeout={400}>
      <Grid2 container padding="2rem" display="flex" justifyContent="center">
        <ToastContainer />
        <Grid2
          padding="1rem"
          size={{ xs: 10, md: 12, lg: 10 }}
          sx={{
            padding: "1rem",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            width: "fit-content",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" color="white">
              Chart Comparison - Bitcoin Historical Price
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="white">
            Here I&apos;m comparing two charting libraries, Visx and Recharts,
            using the same data set. This data set was built by firing an AWS
            Lambda function every 15 minutes to query a CoinCap API for Bitcoin
            prices at that given moment. Each entry is stored in DynamoDB and
            fetched here for display. Below are my thoughts on each library!
          </Typography>
        </Grid2>
        <Grid2
          padding="1rem"
          sx={{ width: "100%" }}
          size={{ xs: 10, md: 12, lg: 10 }}
        >
          <Box sx={{ position: "relative", width: "100%", height: 400 }}>
            <FlipCard
              showFront={customVisxView}
              front={
                <div ref={ref} style={{ width: "100%", height: 400 }}>
                  {width > 0 && (
                    <BaseVisxLineGraph
                      data={memoizedChartData}
                      width={width}
                      height={400}
                    />
                  )}
                </div>
              }
              back={
                <div ref={ref} style={{ width: "100%", height: 400 }}>
                  {width > 0 && (
                    <VisxLineGraph
                      data={memoizedChartData}
                      width={width}
                      height={400}
                    />
                  )}
                </div>
              }
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            paddingTop="1rem"
          >
            <MotionBox
              whileHover={{ scale: 1, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{
                padding: "1rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                width: "fit-content",
                textAlign: "center",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => setCustomVisxView(!customVisxView)}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    variant="subtitle1"
                    color="white"
                    flexWrap="wrap"
                    sx={{ marginLeft: "1rem" }}
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      size="xl"
                      color="white"
                      style={{ paddingRight: "0.3rem" }}
                    />
                    Click{" "}
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="white"
                      sx={{
                        marginRight: "0.2rem",
                        marginLeft: "0.2rem",
                        textDecoration: "underline",
                      }}
                    >
                      here
                    </Typography>
                    to see what Visx looks like out of the box!
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    backgroundColor: "white",
                    height: "2px",
                    width: "100%",
                  }}
                />
                <Box display="flex" alignItems="center" justifyContent="center">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassArrowRight}
                    size="xl"
                    color="white"
                  />
                  <Typography
                    variant="subtitle1"
                    color="white"
                    sx={{ marginLeft: "1rem" }}
                  >
                    Visx - A low level library for building custom charts, with
                    a focus on customizability and performance. Given the low
                    level nature of the library, it&apos;s way more flexible and
                    allows for more customization than Recharts. However, it
                    requires considerably more effort to set up and use
                    effectively. So if you&apos;re looking for a quick, out of
                    the box working graph, this won&apos;t be the best option.
                    But if you have the capacity to work with it, it&apos;s
                    phenomenal.
                  </Typography>
                </Box>
              </Box>
            </MotionBox>
          </Box>
        </Grid2>
        <Grid2 padding="1rem" width="100%" size={{ xs: 10, md: 12, lg: 10 }}>
          <Box sx={{ position: "relative", width: "100%", height: 400 }}>
            <FlipCard
              showFront={customRechartView}
              front={<BaseRechartLineGraph data={memoizedChartData} />}
              back={<RechartLineGraph data={memoizedChartData} />}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            paddingTop="1rem"
          >
            <MotionBox
              whileHover={{ scale: 1, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{
                padding: "1rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                width: "fit-content",
                textAlign: "center",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => setCustomRechartView(!customRechartView)}
                  sx={{ cursor: "pointer" }}
                >
                  <Typography
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    variant="subtitle1"
                    color="white"
                    flexWrap="wrap"
                    sx={{ marginLeft: "1rem" }}
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      size="xl"
                      color="white"
                      style={{ paddingRight: "0.3rem" }}
                    />
                    Click{" "}
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      color="white"
                      sx={{
                        marginRight: "0.2rem",
                        marginLeft: "0.2rem",
                        textDecoration: "underline",
                      }}
                    >
                      here
                    </Typography>
                    to see what Recharts looks like out of the box!
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    backgroundColor: "white",
                    height: "2px",
                    width: "100%",
                  }}
                />
                <Box display="flex" alignItems="center" justifyContent="center">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlassArrowRight}
                    size="xl"
                    color="white"
                  />
                  <Typography
                    variant="subtitle1"
                    color="white"
                    sx={{ marginLeft: "1rem" }}
                  >
                    Recharts - A high level charting library built on React
                    components. It&apos;s pretty easy to use and provides a lot
                    of built-in features, like the tooltip needs nothing except
                    to be used. But it may not be as flexible as Visx when it
                    comes to customizations. If you need something quick and
                    simple, this is 100% the route you want to take.
                  </Typography>
                </Box>
              </Box>
            </MotionBox>
          </Box>
        </Grid2>
      </Grid2>
    </Fade>
  ) : (
    <Grid2
      container
      padding="2rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Box display="flex">
        <FontAwesomeIcon
          className="inlineLoading"
          icon={faCircleNotch}
          spin
          size="3x"
          color="white"
        />
      </Box>
    </Grid2>
  );
};

export default Page;
