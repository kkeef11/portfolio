import { GridColDef } from "@mui/x-data-Grid";

export const columns: GridColDef[] = [
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
