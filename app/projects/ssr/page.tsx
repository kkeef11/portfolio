import { GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { fetchCryptoDataSSR } from "@/app/api/ssr/crypto";
import ClientDataGrid from "./DataGrid";

let renderCount = 0;

const getCryptoData = async () => {
  renderCount++;
  return await fetchCryptoDataSSR();
};

export default async function CryptoTableSSR() {
  const { data, timestamp: timeTaken } = await getCryptoData();
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
          Server Side Rendered Table
        </Typography>
        <Typography variant="subtitle1" color="white">
          Time to response: {timeTaken}ms
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="subtitle1" color="white">
            Render count (total): {renderCount}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        height="35rem"
        width="fit-content"
      >
        <ClientDataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
}
