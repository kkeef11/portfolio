"use client";

import React, { useRef, useState, useEffect } from "react";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { Box, Button, Typography, Alert } from "@mui/material";
import { useCrypto } from "../../queries/crypto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ExternalToolbarControls } from "@/app/components/DataGridTools";

// to do - make time to response include render of the page time
const RenderCSR = () => {
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [renderCount, setRenderCount] = useState<number>(0);
  const renderStartTime = useRef(performance.now());
  const { data: cryptoData, isLoading: cryptoLoading } = useCrypto();
  const apiRef = useGridApiRef();

  useEffect(() => {
    if (cryptoData) {
      const endTime = performance.now();
      setTimeTaken(endTime - renderStartTime.current);
    }
  }, [cryptoData]);

  useEffect(() => {
    const stored = localStorage.getItem("csrRenderCount");
    const count = stored ? parseInt(stored) + 1 : 1;
    localStorage.setItem("csrRenderCount", count.toString());
    setRenderCount(count);
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "rank",
      headerName: "Rank",
      width: 90,
    },
    {
      field: "symbol",
      headerName: "Symbol",
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
      width: 90,
    },
    {
      field: "supply",
      headerName: "Supply",
      width: 90,
    },
    {
      field: "maxSupply",
      headerName: "Max Supply",
      width: 120,
    },
    {
      field: "marketCapUsd",
      headerName: "Market Cap",
      width: 120,
    },
    {
      field: "volumeUsd24Hr",
      headerName: "Volume",
      width: 90,
    },
    {
      field: "priceUsd",
      headerName: "Price",
      width: 90,
    },
    {
      field: "changePercent24Hr",
      headerName: "Change",
      width: 90,
    },
    {
      field: "vwap24Hr",
      headerName: "VWAP",
      width: 90,
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box
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
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1" color="white">
            Render count (total): {renderCount}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              height: "1.5rem",
              fontSize: "0.75rem",
              marginLeft: "0.7rem",
            }}
            onClick={() => {
              localStorage.removeItem("csrRenderCount");
              window.location.reload();
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>

      {!cryptoLoading ? (
        <Box
          display="flex"
          flexDirection="column"
          height="35rem"
          width="fit-content"
        >
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Link href="/projects/ssr" passHref>
                <Button
                  variant="contained"
                  startIcon={<FontAwesomeIcon icon={faWindowRestore} />}
                  sx={{
                    backgroundColor: "transparent",
                    color: "white",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  View SSR Page
                </Button>
              </Link>
            </Box>
            {renderCount > 1 && (
              <Alert
                severity="info"
                sx={{
                  backgroundColor: "#e3f2fd",
                  fontSize: "0.75rem",
                  paddingY: "0.1rem",
                  paddingX: "0.5rem",
                }}
              >
                This render was faster because React Query cached the previous
                response!
              </Alert>
            )}
            <ExternalToolbarControls apiRef={apiRef} />
          </Box>
          <DataGrid
            rows={cryptoData?.data}
            columns={columns}
            pageSizeOptions={[10, 20, 50]}
            sx={{
              backgroundColor: "lightgray", // Change this to your preferred color
              "& .MuiDataGrid-cell": {
                backgroundColor: "white", // Changes the background of individual cells
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1976d2", // Changes the background of column headers
                color: "black", // Changes text color of headers
              },
            }}
          />
        </Box>
      ) : (
        <FontAwesomeIcon
          className="inlineLoading"
          icon={faCircleNotch}
          spin
          size="3x"
          color="white"
        />
      )}
    </Box>
  );
};

export default RenderCSR;
