"use client";

import { Box, Button } from "@mui/material";
import { useRenderMode } from "../context/RenderModeContext";

export default function RenderModeTab() {
  const { renderMode, toggleRenderMode } = useRenderMode();

  return (
    <Box>
      <Button onClick={toggleRenderMode}>
        {renderMode === "ssr" ? "CSR" : "SSR"}
      </Button>
    </Box>
  );
}
