"use client";

import React from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DescriptionIcon from "@mui/icons-material/Description";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const pages = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
];

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
          <IconButton
            component="a"
            href="https://github.com/kkeef11"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white" }}
          >
            <GitHubIcon />
          </IconButton>
        </MotionBox>
        <MotionBox
          display="flex"
          alignItems="center"
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
          sx={{ cursor: "pointer", color: "white" }}
        >
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/kevin-keefer-571107164"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "white" }}
          >
            <LinkedInIcon />
          </IconButton>
        </MotionBox>
        <MotionBox
          display="flex"
          alignItems="center"
          whileHover={{ scale: 1.1, y: -3 }}
          transition={{ type: "spring", stiffness: 300 }}
          sx={{ cursor: "pointer", color: "white" }}
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
        </MotionBox>
      </Box>
    </Box>
  );
};

export default NavBar;
