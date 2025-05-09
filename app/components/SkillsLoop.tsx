"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

const MotionBox = motion(Box);

export const SkillsLoop = () => {
  const skills = [
    "design databases",
    "build dashboards",
    "create REST APIs",
    "build Next.js apps",
    "develop React components",
    "optimize web performance",
    "scrape websites",
    "deploy to cloud platforms",
    "implement responsive UIs",
    "create CI/CD pipelines",
    "write lambda functions",
    "develop microservices",
    "automate tasks",
    "integrate third-party APIs",
    "write unit tests",
    "debug applications",
    "manage state with Redux",
    "use Zustand and Redux for state management",
    "use Prisma for database management",
  ];

  const [currentSkill, setCurrentSkill] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MotionBox
      sx={{
        overflow: "visible",
        whiteSpace: "nowrap",
      }}
      key={currentSkill}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          background: "linear-gradient(90deg, #865bec, white)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        I {skills[currentSkill]}.
      </Typography>
    </MotionBox>
  );
};
