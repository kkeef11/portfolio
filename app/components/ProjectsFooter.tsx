"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const projects = [
  { id: 1, title: "SSR vs CSR", path: "/projects/ssr" },
  { id: 2, title: "visx vs victory (coming soon..)", path: "/projects" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="center"
      padding="2rem"
      width="100%"
    >
      <Box display="flex" justifyContent="center" gap={4}>
        {projects.map((project) => (
          <Link key={project.id} href={project.path} passHref>
            <MotionBox
              display="flex"
              alignItems="center"
              whileHover={{ scale: 1.1, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{ cursor: "pointer", padding: "0.5rem", color: "white" }}
            >
              <FolderIcon sx={{ color: "#555555" }} />
              <Typography sx={{ marginLeft: "0.5rem" }}>
                {project.title}
              </Typography>
            </MotionBox>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
