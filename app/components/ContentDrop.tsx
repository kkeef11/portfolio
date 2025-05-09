"use client";
import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const ContentDrop: React.FC<{
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}> = ({ children, sx }) => {
  return (
    <MotionBox
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 10,
        duration: 2,
      }}
      sx={sx}
    >
      {children}
    </MotionBox>
  );
};
