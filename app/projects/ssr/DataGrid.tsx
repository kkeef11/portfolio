"use client";

import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { columns } from "@/app/lib/dataGridColumns";
import { Box, Button, InputAdornment, TextField, Zoom } from "@mui/material";
import { CryptoAsset } from "@/app/api/lib/types";
import { ExternalToolbarControls } from "@/app/components/DataGridTools";
import Link from "next/link";
import { faSearch, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { useEffect, useMemo, useReducer } from "react";

const MotionButton = motion(Button);
const MotionBox = motion(Box);

interface InitialState {
  searchTerm: string;
  filteredData: CryptoAsset[];
}

interface Action {
  payload: string | CryptoAsset[];
  type: string;
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

export default function ClientDataGrid({
  rows,
  wasCached,
}: {
  rows: CryptoAsset[];
  wasCached: boolean;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiRef = useGridApiRef();
  useEffect(() => {
    if (wasCached) {
      toast(
        "This render was faster because the we served the page from the cache!",
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
  }, [wasCached]);

  const filteredData = useMemo(() => {
    return rows
      ? rows.filter((coin) => {
          const searchString = `${coin.name} ${coin.priceUsd} ${coin.changePercent24Hr} ${coin.marketCapUsd} ${coin.rank} ${coin.supply} ${coin.maxSupply} ${coin.symbol} ${coin.volumeUsd24Hr} ${coin.vwap24Hr} ${coin.id}`;
          return searchString
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase());
        })
      : [];
  }, [rows, state.searchTerm]);

  useEffect(() => {
    if (rows) {
      dispatch({ type: "SET_FILTERED_DATA", payload: filteredData });
    }
  }, [rows, state.searchTerm, filteredData]);

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <ToastContainer />
      <Zoom in={true} timeout={400} style={{ height: "fit-content" }}>
        <Box>
          <Box display="flex" width="100%" justifyContent="space-between">
            <ExternalToolbarControls apiRef={apiRef} />
            <Link href="/projects/csr" passHref>
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
                }}
              >
                View CSR Page
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

          <Box height="fit-content">
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
                "& .MuiDataGrid-cell": { backgroundColor: "white" },
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
    </Box>
  );
}
