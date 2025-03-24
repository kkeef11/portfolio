"use client";

import Link from "next/link";
import { Box, Button } from "@mui/material";

export default function RenderToggle() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Link href="/projects/ssr" passHref>
        <Button
          variant="contained"
          sx={{ backgroundColor: "white", color: "black" }}
        >
          View SSR Page
        </Button>
      </Link>
      <Link href="/projects/csr" passHref>
        <Button
          variant="contained"
          sx={{ backgroundColor: "white", color: "black" }}
        >
          View CSR Page
        </Button>
      </Link>
    </Box>
  );
}
