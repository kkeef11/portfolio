"use client";

import { useState } from "react";
import { Box, Divider, Grid2, Typography } from "@mui/material";
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
      title: "Visx vs Recharts",
      path: "/projects/chartComparison",
      description:
        "A comparison of Visx and Recharts charting libraries for data visualization",
    },
  ];

  return (
    <Grid2
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "80%", width: "100%" }}
    >
      <Grid2
        size={{ xs: 12, md: 8, lg: 6 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h2"
          sx={{
            background: "linear-gradient(90deg, #865bec, white)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Mini Projects
        </Typography>
        <Typography
          variant="h6"
          color="#aaaaaa"
          textAlign="center"
          paddingTop="1rem"
          sx={{
            "@media (max-width: 900px)": {
              fontSize: "1rem", // Reduce font size for mobile
            },
          }}
        >
          These are just a few of the mini projects I have worked on in my spare
          time. Just a neat little way of comparing things for my own knowledge.
          I have also worked on a few larger projects, but I am unable to share
          them at this time.
        </Typography>
        <Divider
          sx={{
            backgroundColor: "white",
            height: "2px",
            width: "100%",
            marginY: "2rem",
          }}
        />
      </Grid2>

      <Grid2
        display="flex"
        justifyContent="center"
        sx={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "2rem" }}
        size={{ xs: 12, md: 8, lg: 6 }}
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
                width: "fit-content",
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
                height: hoveredProject === project.id ? "5rem" : 0,
              }}
              transition={{ duration: 0.3 }}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                height: "auto",
                width: "100%",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Typography
                variant="body2"
                color="white"
                textAlign="center"
                padding="0.3rem"
                marginTop="0.5rem"
                marginBottom="0.5rem"
              >
                {project.description}
              </Typography>
            </MotionBox>
          </Box>
        ))}
      </Grid2>
    </Grid2>
  );
}
