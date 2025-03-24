"use client";

import { Box } from "@mui/material";
import Footer from "../components/ProjectsFooter";
import { usePathname } from "next/navigation";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "95%" }}>
      <main style={{ flex: 1 }}>{children}</main>
      {pathname !== "/projects" && <Footer />}
    </Box>
  );
}
