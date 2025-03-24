"use client";

import React from "react";
import {
  Tabs,
  Tab,
  Box,
  IconButton,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionIcon from "@mui/icons-material/Description";
import Zoom from "@mui/material/Zoom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const pages = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
];

const TransparentTooltip = styled(
  ({ className, ...props }: TooltipProps & { className?: string }) => (
    <Tooltip
      {...props}
      classes={{ popper: className }}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -15],
              },
            },
          ],
        },
      }}
      slots={{
        transition: Zoom,
      }}
      title={props.title || ""}
    >
      {props.children}
    </Tooltip>
  )
)(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    color: "white",
    boxShadow: "none",
  },
}));

const NavBar = () => {
  const pathname = usePathname();
  const currentIndex = pages.findIndex(
    (page) => pathname === page.path || pathname.startsWith(page.path + "/")
  );

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Tabs
        value={currentIndex}
        textColor="inherit"
        indicatorColor="secondary"
        sx={{
          "& .MuiTab-root": {
            color: "white", // Sets text color to white
            textTransform: "none",
            fontFamily: "Open Sans",
            fontSize: "18px",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "white", // Sets the indicator color to white
          },
        }}
      >
        {pages.map((page, index) => (
          <Tab
            key={index}
            component={Link} // Next.js Link
            href={page.path} // Set URL
            prefetch={true}
            label={page.label}
            color="white"
          />
        ))}
      </Tabs>
      <Box display="flex" alignItems="center">
        <MotionBox
          display="flex"
          alignItems="center"
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
          sx={{ cursor: "pointer", color: "white" }}
        >
          <TransparentTooltip title="GitHub">
            <IconButton
              component="a"
              href="https://github.com/kkeef11"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "white" }}
            >
              <GitHubIcon />
            </IconButton>
          </TransparentTooltip>
        </MotionBox>
        <MotionBox
          display="flex"
          alignItems="center"
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
          sx={{ cursor: "pointer", color: "white" }}
        >
          <TransparentTooltip title="LinkedIn">
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/kevin-keefer-571107164"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "white" }}
            >
              <LinkedInIcon />
            </IconButton>
          </TransparentTooltip>
        </MotionBox>
        <MotionBox
          display="flex"
          alignItems="center"
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
          sx={{ cursor: "pointer", color: "white" }}
        >
          <TransparentTooltip
            title="Resume
          "
          >
            <IconButton
              component="a"
              href="/api/resume"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <DescriptionIcon sx={{ color: "white" }} />
            </IconButton>
          </TransparentTooltip>
        </MotionBox>
      </Box>
    </Box>
  );
};

export default NavBar;
