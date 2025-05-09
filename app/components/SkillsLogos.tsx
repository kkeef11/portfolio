"use client";
import { Box, Typography } from "@mui/material";
import React from "react";
import elasticSearch from "../../public/images/elasticsearch.svg";
import firebase from "../../public/images/firebase.svg";
import nodejs from "../../public/images/nodejs.svg";
import postgresql from "../../public/images/postgresql.svg";
import prisma from "../../public/images/prisma.svg";
import react from "../../public/images/reactjs.svg";
import typescript from "../../public/images/typescript.svg";
import aws from "../../public/images/aws.svg";
import mongo from "../../public/images/mongodb.svg";
import mui from "../../public/images/mui.svg";
import puppeteer from "../../public/images/puppeteer.svg";
import zustand from "../../public/images/zustand.svg";
import redux from "../../public/images/redux.svg";
import visx from "../../public/images/visx.svg";
import d3 from "../../public/images/d3-2.svg";
import reactquery from "../../public/images/ReactQueryIcon.svg";
import tanstack from "../../public/images/tanstack.png";
import Image from "next/image";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

export const SkillsLogos = () => {
  const logos = [
    { src: typescript, alt: "TypeScript" },
    { src: react, alt: "React" },
    { src: nodejs, alt: "Node.js" },
    { src: postgresql, alt: "PostgreSQL" },
    { src: prisma, alt: "Prisma" },
    { src: elasticSearch, alt: "Elasticsearch" },
    { src: firebase, alt: "Firebase" },
    { src: aws, alt: "AWS" },
    { src: mongo, alt: "MongoDB" },
    { src: mui, alt: "Material UI" },
    { src: puppeteer, alt: "Puppeteer" },
    { src: zustand, alt: "Zustand" },
    { src: redux, alt: "Redux" },
    { src: reactquery, alt: "React Query" },
    { src: tanstack, alt: "TanStack" },
    { src: visx, alt: "Visx" },
    { src: d3, alt: "D3.js" },
  ];
  return (
    <Box
      display="flex"
      marginY="3rem"
      justifyContent="center"
      flexWrap={"wrap"}
    >
      {logos.map((logo, index) => (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          key={index}
          sx={{
            borderRadius: "20px",
            border: "1px solid #aaaaaa",
            padding: "1rem",
            marginBottom: "2rem",
            marginX: "1rem",
          }}
        >
          <MotionImage
            key={index}
            src={logo.src}
            alt={logo.alt}
            width={50}
            height={50}
            whileHover={{ scale: 1.1, y: -3 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              margin: "0 10px",
              cursor: "pointer",
            }}
          />
          <Typography
            variant="subtitle1"
            color="#aaaaaa"
            sx={{
              textAlign: "center",
              fontSize: "0.8rem",
              marginTop: "0.5rem",
            }}
          >
            {logo.alt}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
