"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RenderModeProvider } from "./context/RenderModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/NavBar";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "My Portfolio",
//   description: "A portfolio showcasing SSR and CSR toggling",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <NavBar />
        </header>
        <QueryClientProvider client={queryClient}>
          <RenderModeProvider>{children}</RenderModeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
