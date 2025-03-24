"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionBox = motion(Box);

export default function ProjectPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "SSR vs CSR",
      path: "/projects/ssr",
      description:
        "A comparison between server-side and client-side rendering.",
    },
    {
      id: 2,
      title: "visx vs victory",
      path: "/projects",
      description:
        "Coming soon will be a comparison of visx vs VictoryCharts for displaying data such as crypto prices.",
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="80%"
    >
      <Box>
        <Typography variant="h3" color="white" fontFamily="Open Sans">
          Mini Projects
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        width="50%"
        paddingTop="3rem"
        gap={4}
        position="relative"
      >
        {projects.map((project) => (
          <Box
            key={project.id}
            display="flex"
            flexDirection="column"
            alignItems="center"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <MotionBox
              whileHover={{ scale: 1.1, y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              sx={{
                cursor: "pointer",
                padding: "1rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                width: "200px",
                textAlign: "center",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Link href={project.path} passHref>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
                  <FolderIcon sx={{ color: "#555555" }} />
                  <Typography sx={{ color: "white" }}>
                    {project.title}
                  </Typography>
                </Box>
              </Link>
            </MotionBox>
            <Box height="40px" width="100%" />
            <MotionBox
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: hoveredProject === project.id ? 1 : 0,
                height: hoveredProject === project.id ? "3rem" : 0,
              }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                top: "100%", // Ensures it appears below the project title
                left: 0,
                width: "100%",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "5px",
                padding: "10px",
                textAlign: "center",
                overflow: "hidden",
                zIndex: 1, // Keeps it below the project title
              }}
            >
              <Typography
                variant="body2"
                color="white"
                textAlign="center"
                padding="0.5rem"
              >
                {project.description}
              </Typography>
            </MotionBox>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
