"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";
import {
  gridPreferencePanelStateSelector,
  GridPreferencePanelsValue,
} from "@mui/x-data-grid";
import { faColumns, faFilter } from "@fortawesome/free-solid-svg-icons";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

interface ExternalToolbarControlsProps {
  apiRef: React.MutableRefObject<GridApiCommunity>;
}

export function ExternalToolbarControls({
  apiRef,
}: ExternalToolbarControlsProps) {
  const handleToggleColumn = () => {
    const preferencePanel = gridPreferencePanelStateSelector(
      apiRef.current.state
    );
    if (preferencePanel.open) {
      apiRef.current.hidePreferences();
    } else {
      apiRef.current.showPreferences(GridPreferencePanelsValue.columns);
    }
  };
  const handleToggleFilter = () => {
    apiRef.current.showFilterPanel();
  };
  return (
    <Box display="flex" justifyContent="space-between">
      <MotionButton
        startIcon={
          <FontAwesomeIcon icon={faColumns} style={{ fontSize: "0.8rem" }} />
        }
        whileHover={{ scale: 1.1, y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        sx={{ color: "white", fontSize: "0.9rem", textTransform: "none" }}
        onClick={handleToggleColumn}
        title="Columns"
      >
        Columns
      </MotionButton>
      <MotionButton
        startIcon={
          <FontAwesomeIcon icon={faFilter} style={{ fontSize: "0.8rem" }} />
        }
        whileHover={{ scale: 1.1, y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        sx={{ color: "white", fontSize: "0.9rem", textTransform: "none" }}
        onClick={handleToggleFilter}
        title="Filters"
      >
        Filters
      </MotionButton>
    </Box>
  );
}
