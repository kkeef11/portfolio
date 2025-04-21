"use client";

import React, { useRef, useState, useEffect, useMemo, useReducer } from "react";
import { DataGrid, useGridApiRef } from "@mui/x-data-Grid";
import { columns } from "@/app/lib/dataGridColumns";
import {
  Box,
  Button,
  Typography,
  Grid2,
  InputAdornment,
  TextField,
  Zoom,
} from "@mui/material";
import { useFetchCryptoTableData } from "../../queries/crypto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faPersonDigging,
  faSearch,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ExternalToolbarControls } from "@/app/components/DataGridTools";
import { useRenderStore } from "@/app/store/useRenderStore";
import { useQueryClient } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { CryptoAsset } from "@/app/api/lib/types";

const MotionButton = motion(Button);
const MotionBox = motion(Box);

interface InitialState {
  searchTerm: string;
  filteredData: CryptoAsset[];
}

interface Action {
  type: string;
  payload: string | CryptoAsset[];
}

const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload as string };
    case "SET_FILTERED_DATA":
      return { ...state, filteredData: action.payload as CryptoAsset[] };
    default:
      return state;
  }
};

const initialState = {
  searchTerm: "",
  filteredData: [],
};

// to do - make time to response include render of the page time
const RenderCSR = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: cryptoData, isLoading: cryptoLoading } =
    useFetchCryptoTableData();
  const queryClient = useQueryClient();
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const renderStartTime = useRef<number>(performance.now());
  const apiRef = useGridApiRef();
  const setCsrCacheHit = useRenderStore((state) => state.setCsrCacheHit);

  useEffect(() => {
    if (cryptoData) {
      console.log(cryptoData);
      const endTime = performance.now();
      setTimeTaken(endTime - renderStartTime.current);
    }
  }, [cryptoData]);

  useEffect(() => {
    const cached = queryClient.getQueryCache().find({ queryKey: ["crypto"] });

    const wasFromCache =
      !!cached?.state.data &&
      !cached.state.isInvalidated &&
      cached.state.fetchStatus === "idle" &&
      cached.state.status === "success";

    setCsrCacheHit(wasFromCache);

    if (wasFromCache) {
      toast(
        "This render was faster because React Query cached the previous response!",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            marginLeft: "40rem",
          },
        }
      );
    }
  }, [queryClient, setCsrCacheHit]);

  const filteredData = useMemo(() => {
    return cryptoData
      ? cryptoData.data.filter((coin) => {
          const searchString = `${coin.name} ${coin.priceUsd} ${coin.changePercent24Hr} ${coin.marketCapUsd} ${coin.rank} ${coin.supply} ${coin.maxSupply} ${coin.symbol} ${coin.volumeUsd24Hr} ${coin.vwap24Hr} ${coin.id}`;
          return searchString
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase());
        })
      : [];
  }, [cryptoData, state.searchTerm]);

  useEffect(() => {
    if (cryptoData?.data) {
      dispatch({ type: "SET_FILTERED_DATA", payload: filteredData });
    }
  }, [cryptoData, state.searchTerm, filteredData]);

  return (
    <Grid2
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <ToastContainer />
      {!cryptoLoading && cryptoData?.data?.length && (
        <Grid2
          size={{ xs: 12, md: 8, lg: 6 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingBottom="1rem"
        >
          <Typography variant="h5" color="white">
            Crypto Assets - Coin Cap
          </Typography>
          <Typography variant="h6" color="white">
            Client Side Rendered Table
          </Typography>
          <Typography variant="subtitle1" color="white">
            Time to response: {timeTaken?.toFixed()}ms
          </Typography>
        </Grid2>
      )}

      {!cryptoLoading ? (
        state.filteredData ? (
          <Grid2
            size={{ xs: 12, md: 10, lg: 8.5 }}
            sx={{ overflowX: "scroll" }}
            display="flex"
            justifyContent="center"
          >
            <Zoom in={!!state.filteredData} timeout={400}>
              <Box display="flex" flexDirection="column" width="100%">
                <Box display="flex" width="100%" justifyContent="space-between">
                  <ExternalToolbarControls apiRef={apiRef} />
                  <Link href="/projects/ssr" passHref>
                    <MotionButton
                      variant="contained"
                      startIcon={<FontAwesomeIcon icon={faWindowRestore} />}
                      whileHover={{ scale: 1.1, y: -3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      sx={{
                        backgroundColor: "transparent",
                        color: "white",
                        border: "none",
                        boxShadow: "none",
                        textTransform: "none",
                        "&:hover": {
                          boxShadow: "none",
                        },
                        marginLeft: "1rem",
                      }}
                    >
                      View SSR Page
                    </MotionButton>
                  </Link>

                  <MotionBox
                    whileHover={{ scale: 1.1, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TextField
                      fullWidth
                      variant="standard"
                      placeholder="Search"
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SEARCH_TERM",
                          payload: e.target.value,
                        })
                      }
                      sx={{
                        paddingTop: "0.5rem",
                        paddingRight: "0.5rem",
                        "& .MuiInputBase-input": {
                          color: "white", // <-- actual text color
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "white",
                          opacity: 1, // required in some cases to ensure visibility
                        },
                        "& .MuiOutlinedInput-root": {
                          height: "2.5rem",
                        },
                        "& .MuiInput-underline:before": {
                          borderBottom: "1px solid white",
                        },
                        "& .MuiInput-underline:hover:before": {
                          borderBottom: "1px solid white",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottom: "2px solid white", // slightly thicker when focused
                        },
                      }}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <FontAwesomeIcon
                                icon={faSearch}
                                style={{ fontSize: "0.8rem" }}
                                color="white"
                              />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </MotionBox>
                </Box>
                <Box>
                  <DataGrid
                    apiRef={apiRef}
                    rows={state.filteredData}
                    columns={columns}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    pageSizeOptions={[10, 25, 100]}
                    sx={{
                      backgroundColor: "lightgray",
                      "& .MuiDataGrid-cell": {
                        backgroundColor: "white",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#1976d2",
                        color: "black",
                      },
                      height: "35rem",
                    }}
                  />
                </Box>
              </Box>
            </Zoom>
          </Grid2>
        ) : (
          <Grid2
            size={{ xs: 12, md: 10, lg: 8.5 }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              paddingBottom="1rem"
            >
              <FontAwesomeIcon icon={faPersonDigging} size="6x" color="white" />
            </Box>{" "}
            <Typography variant="subtitle1" color="white" textAlign="center">
              Oh no! Looks like the CoinCap API has been upgraded,
              <br /> so for now this page is under construction until we get a
              access key!
            </Typography>
          </Grid2>
        )
      ) : (
        <FontAwesomeIcon
          className="inlineLoading"
          icon={faCircleNotch}
          spin
          size="3x"
          color="white"
        />
      )}
    </Grid2>
  );
};

export default RenderCSR;
