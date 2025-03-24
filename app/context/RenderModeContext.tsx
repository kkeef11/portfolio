"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type RenderMode = "ssr" | "csr";

interface RenderModeContextProps {
  renderMode: RenderMode;
  toggleRenderMode: () => void;
}

const RenderModeContext = createContext<RenderModeContextProps | undefined>(
  undefined
);

export const RenderModeProvider = ({ children }: { children: ReactNode }) => {
  const [renderMode, setRenderMode] = useState<RenderMode>("ssr");

  const toggleRenderMode = () => {
    setRenderMode((prevMode) => (prevMode === "ssr" ? "csr" : "ssr"));
  };

  return (
    <RenderModeContext.Provider value={{ renderMode, toggleRenderMode }}>
      {children}
    </RenderModeContext.Provider>
  );
};

export const useRenderMode = () => {
  const context = useContext(RenderModeContext);

  if (!context) {
    throw new Error("useRenderMode must be used within a RenderModeProvider");
  }
  return context;
};
