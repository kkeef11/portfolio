"use client";

import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import type { Mode } from "./scenarios";

// Mirrors LocalFlow's native IndicatorView: a 120x44 capsule with a 1.5px
// border, 7 waveform bars while listening, 3 pulsing dots while processing.
// Light = dictation, dark = command.

const BASE_HEIGHTS = [20, 28, 16, 24, 14, 26, 18];
const BAR_COUNT = 7;

const COLORS: Record<Mode, { bg: string; fg: string }> = {
  dictation: { bg: "#ffffff", fg: "#000000" },
  command: { bg: "#000000", fg: "#ffffff" },
};

export type PillPhase = "listening" | "processing";

// Fake mic levels: a ring of recent intensities, newest on the right,
// like WaveformModel.push(level:) in the app.
function useSimulatedLevels(active: boolean) {
  const [bars, setBars] = useState<number[]>(Array(BAR_COUNT).fill(0));

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setBars((prev) => [...prev.slice(1), Math.sqrt(0.15 + Math.random() * 0.8)]);
    }, 100);
    return () => {
      clearInterval(id);
      setBars(Array(BAR_COUNT).fill(0));
    };
  }, [active]);

  return bars;
}

export default function Pill({ mode, phase }: { mode: Mode; phase: PillPhase }) {
  const { bg, fg } = COLORS[mode];
  const bars = useSimulatedLevels(phase === "listening");

  return (
    <Box
      sx={{
        width: 120,
        height: 44,
        borderRadius: "999px",
        border: `1.5px solid ${fg}`,
        backgroundColor: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      }}
    >
      {phase === "listening" ? (
        <Box display="flex" alignItems="center" gap="5px">
          {bars.map((intensity, i) => (
            <motion.div
              key={i}
              animate={{ height: BASE_HEIGHTS[i] * (0.3 + 0.7 * intensity) }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              style={{ width: 4, borderRadius: 2, backgroundColor: fg }}
            />
          ))}
        </Box>
      ) : (
        <Box display="flex" alignItems="center" gap="8px">
          {[0, 0.2, 0.4].map((delay) => (
            <motion.div
              key={delay}
              animate={{ opacity: [0.25, 1, 0.25, 0.25], scale: [0.8, 1, 0.8, 0.8] }}
              transition={{
                duration: 1.2,
                times: [0, 0.4, 0.8, 1],
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
              style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: fg }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
