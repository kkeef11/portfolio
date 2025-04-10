"use client";

import Link from "next/link";
import { Box, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const projects = [{ id: 1, title: "Back to projects", path: "/projects" }];

export default function Footer() {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="center"
      width="100%"
      paddingBottom="1rem"
    >
      <Box display="flex" justifyContent="center">
        {projects.map((project) => (
          <Link key={project.id} href={project.path} passHref>
            <MotionBox
              display="flex"
              alignItems="center"
              whileHover={{ scale: 1.1, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{ cursor: "pointer", padding: "0.5rem", color: "white" }}
            >
              <FolderIcon sx={{ color: "grey" }} />
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
