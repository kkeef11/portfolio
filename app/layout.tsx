"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RenderModeProvider } from "./context/RenderModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily:
      "'San Francisco', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  palette: {
    primary: {
      main: "#865bec",
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#865bec",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#865bec",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#865bec",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "#865bec",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#865bec",
        },
      },
    },
  },
});

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
          <ThemeProvider theme={theme}>
            <RenderModeProvider>{children}</RenderModeProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
