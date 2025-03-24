"use client";

import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { CryptoAsset } from "@/app/lib/types";
import { ExternalToolbarControls } from "@/app/components/DataGridTools";
import Link from "next/link";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ClientDataGrid({
  rows,
  columns,
}: {
  rows: CryptoAsset[];
  columns: GridColDef[];
}) {
  const apiRef = useGridApiRef();
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" width="100%" justifyContent="space-between">
        <Box display="flex">
          <Link href="/projects/csr" passHref>
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
              View CSR Page
            </Button>
          </Link>
        </Box>
        <ExternalToolbarControls apiRef={apiRef} />
      </Box>
      <Box width="100%" height="32rem">
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 20, 50]}
          sx={{
            backgroundColor: "lightgray",
            "& .MuiDataGrid-cell": { backgroundColor: "white" },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1976d2",
              color: "black",
            },
          }}
        />
      </Box>
    </Box>
  );
}
