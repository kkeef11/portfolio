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

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "kevin-keefer-resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="4rem"
      position="relative"
    >
      <Box
        display="flex"
        justifyContent="center"
        flexGrow={1}
        marginTop="0.5rem"
        sx={{
          backgroundColor: "#191c1a",
          borderRadius: "20px",
          height: "100%",
          overflow: "hidden",
          "@media (max-width: 600px)": {
            justifyContent: "flex-start", // This will change justifyContent to flex-start on small screens
          },
        }}
      >
        <Tabs
          value={currentIndex}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{
            paddingTop: "0.5rem",
            "& .MuiTab-root": {
              color: "white",
              textTransform: "none",
              fontSize: "18px",
              transition: "color 0.3s ease-in-out", // Tab hover effect
              "&:hover": {
                animation: "flash 0.5s ease-in-out", // Flash effect
              },
            },
            "& .MuiTabs-indicator": {
              background: "linear-gradient(90deg, #865bec, white)", // Gradient indicator
              height: "3px",
            },
            "@keyframes flash": {
              "0%": { color: "#865bec" },
              "50%": { color: "white" },
              "100%": { color: "#865bec" },
            },
          }}
        >
          {pages.map((page, index) => (
            <Tab
              key={index}
              component={Link}
              href={page.path}
              prefetch={true}
              label={page.label}
              color="white"
            />
          ))}
        </Tabs>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        position="absolute"
        right="10px"
        top="15px"
      >
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
              // component="a"
              // href="/api/resume"
              // download
              // target="_blank"
              // rel="noopener noreferrer"
              onClick={handleResumeDownload}
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
