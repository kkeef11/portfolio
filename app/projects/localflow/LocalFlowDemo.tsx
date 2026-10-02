"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Chip, Divider, Grid2, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GitHubIcon from "@mui/icons-material/GitHub";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Pill from "./Pill";
import { Scenario, Segment, SegmentKind, scenarios, spokenWords } from "./scenarios";

const MotionBox = motion(Box);

const ACCENT = "#865bec";
const REPO_URL = "https://github.com/kkeef11/localflow";

type Phase = "idle" | "listening" | "transcribing" | "cleaning" | "done";

const WORD_MS = 260;
const TRANSCRIBE_MS = 800;
const CLEANUP_MS = 1100;
const ROUTE_MS = 400;

// Which pipeline step lights up in each phase.
const ACTIVE_STEPS: Record<Phase, number[]> = {
  idle: [],
  listening: [0, 1],
  transcribing: [2],
  cleaning: [3],
  done: [4],
};

const pipelineFor = (s: Scenario) => [
  { label: "Hotkey", tech: s.mode === "dictation" ? "Right Option" : "Right Shift" },
  { label: "Mic capture", tech: "AVAudioEngine" },
  { label: "Transcribe", tech: "WhisperKit large-v3" },
  s.action
    ? { label: "Route", tech: "CommandRouter" }
    : { label: s.mode === "dictation" ? "Clean up" : "Rewrite", tech: "qwen2.5:7b · Ollama" },
  { label: s.action ? "Act" : "Paste", tech: s.action ? "NSWorkspace" : "⌘V at cursor" },
];

const SEGMENT_SX: Record<SegmentKind, object> = {
  filler: { color: "#777", textDecoration: "line-through" },
  struck: { color: "#e06c75", textDecoration: "line-through" },
  cue: { color: "#c9b5ff", backgroundColor: "rgba(134,91,236,0.22)", borderRadius: "4px", px: "4px" },
  dict: { color: "white", textDecoration: `underline dotted ${ACCENT}`, textUnderlineOffset: "4px" },
};

const LEGEND: { kind: SegmentKind; label: string }[] = [
  { kind: "filler", label: "filler removed" },
  { kind: "struck", label: "self-corrected" },
  { kind: "cue", label: "spoken instruction" },
  { kind: "dict", label: "dictionary term" },
];

function AnnotatedTranscript({ spoken, annotate }: { spoken: Segment[]; annotate: boolean }) {
  return (
    <Typography component="p" sx={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85rem", lineHeight: 1.9 }}>
      {spoken.map((seg, i) => (
        <Box
          component="span"
          key={i}
          sx={annotate && seg.kind ? SEGMENT_SX[seg.kind] : { color: "#ddd" }}
        >
          {seg.text}
          {i < spoken.length - 1 ? " " : ""}
        </Box>
      ))}
    </Typography>
  );
}

function Panel({ title, children, dim }: { title: string; children: React.ReactNode; dim?: boolean }) {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        opacity: dim ? 0.45 : 1,
        transition: "opacity 0.3s",
        minHeight: "4.5rem",
      }}
    >
      <Typography variant="overline" sx={{ color: "#aaaaaa", lineHeight: 1.5 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function KeyCap({ symbol, label, pressed }: { symbol: string; label: string; pressed: boolean }) {
  return (
    <MotionBox
      animate={{ y: pressed ? 3 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      sx={{
        width: 64,
        height: 56,
        borderRadius: "8px",
        border: `1px solid ${pressed ? ACCENT : "#444"}`,
        backgroundColor: pressed ? "rgba(134,91,236,0.25)" : "#232323",
        boxShadow: pressed ? "none" : "0 3px 0 #111",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: "6px 8px",
        transition: "background-color 0.15s, border-color 0.15s",
      }}
    >
      <Typography sx={{ fontSize: "0.9rem", lineHeight: 1 }}>{symbol}</Typography>
      <Typography sx={{ fontSize: "0.65rem", lineHeight: 1, color: "#bbb" }}>{label}</Typography>
    </MotionBox>
  );
}

function Caret() {
  return (
    <motion.span
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, times: [0, 0.5, 0.5, 1], repeat: Infinity }}
      style={{ display: "inline-block", width: 2, height: "1.1em", backgroundColor: "#e5e5e7", verticalAlign: "text-bottom", marginLeft: 1 }}
    />
  );
}

function MacWindow({ scenario, phase }: { scenario: Scenario; phase: Phase }) {
  const done = phase === "done";
  const showOutput = done && scenario.output;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 440,
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#1c1c1e",
        border: "1px solid #3a3a3c",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "6px", px: "12px", height: 30, backgroundColor: "#2c2c2e" }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <Box key={c} sx={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: c }} />
        ))}
        <Typography sx={{ flex: 1, textAlign: "center", fontSize: "0.75rem", color: "#aaa", mr: "45px" }}>
          {scenario.app}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: "14px 16px",
          height: 150,
          color: "#e5e5e7",
          fontSize: "0.9rem",
          whiteSpace: "pre-wrap",
          lineHeight: 1.55,
          overflow: "hidden",
        }}
      >
        {scenario.context}
        {scenario.selection && !showOutput && (
          <Box component="span" sx={{ backgroundColor: "#264f78" }}>
            {scenario.selection}
          </Box>
        )}
        {showOutput && (
          <motion.span
            initial={{ backgroundColor: "rgba(134,91,236,0.45)" }}
            animate={{ backgroundColor: "rgba(134,91,236,0)" }}
            transition={{ duration: 1.4, delay: 0.2 }}
          >
            {scenario.output}
          </motion.span>
        )}
        {!scenario.selection || showOutput ? <Caret /> : null}
      </Box>
    </Box>
  );
}

export default function LocalFlowDemo() {
  const [scenario, setScenario] = useState<Scenario>(scenarios[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [wordsHeard, setWordsHeard] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const play = useCallback((s: Scenario) => {
    clearTimers();
    setScenario(s);
    setWordsHeard(0);
    setPhase("listening");

    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
    const words = spokenWords(s);
    let t = 300;
    words.forEach((_, i) => {
      t += WORD_MS;
      at(t, () => setWordsHeard(i + 1));
    });
    t += 450;
    at(t, () => setPhase("transcribing"));
    t += TRANSCRIBE_MS;
    at(t, () => setPhase("cleaning"));
    t += s.action ? ROUTE_MS : CLEANUP_MS;
    at(t, () => setPhase("done"));
  }, []);

  // Autoplay the first scenario once, then clean up timers on unmount.
  useEffect(() => {
    const id = setTimeout(() => play(scenarios[0]), 700);
    return () => {
      clearTimeout(id);
      clearTimers();
    };
  }, [play]);

  // The real hotkeys work here too: Right Option / Right Shift play the next
  // scenario of that mode.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const mode = e.code === "AltRight" ? "dictation" : e.code === "ShiftRight" ? "command" : null;
      if (!mode) return;
      e.preventDefault();
      const pool = scenarios.filter((s) => s.mode === mode);
      const idx = pool.findIndex((s) => s.id === scenario.id);
      play(pool[(idx + 1) % pool.length]);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [play, scenario.id]);

  const words = spokenWords(scenario);
  const steps = pipelineFor(scenario);
  const active = ACTIVE_STEPS[phase];
  const transcribed = phase === "cleaning" || phase === "done";
  const done = phase === "done";
  const pillPhase = phase === "listening" ? "listening" : phase === "transcribing" || phase === "cleaning" ? "processing" : null;

  return (
    <Grid2 container direction="column" alignItems="center" sx={{ width: "100%", paddingX: "1rem", paddingTop: "3rem", paddingBottom: "2rem" }}>
      <Grid2 size={{ xs: 12, md: 10, lg: 8 }} display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h2"
          sx={{
            background: `linear-gradient(90deg, ${ACCENT}, white)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          LocalFlow
        </Typography>
        <Typography
          variant="h6"
          color="#aaaaaa"
          textAlign="center"
          paddingTop="1rem"
          sx={{ "@media (max-width: 900px)": { fontSize: "1rem" } }}
        >
          A fully offline macOS dictation app. Hold a key, speak, and polished text lands at your
          cursor — speech-to-text and LLM cleanup both run on-device, so no audio or text ever
          leaves the machine.
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center" paddingTop="1rem">
          {["Swift", "SwiftUI + AppKit", "WhisperKit", "Ollama", "CGEvent", "XcodeGen"].map((t) => (
            <Chip key={t} label={t} size="small" sx={{ color: "#ddd", backgroundColor: "rgba(255,255,255,0.08)" }} />
          ))}
          <Chip
            component="a"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            clickable
            size="small"
            icon={<GitHubIcon sx={{ "&&": { color: "white" }, fontSize: "1rem" }} />}
            label="Source"
            sx={{ color: "white", backgroundColor: "rgba(134,91,236,0.35)" }}
          />
        </Box>
        <Divider sx={{ backgroundColor: "white", height: "2px", width: "100%", marginY: "2rem" }} />
      </Grid2>

      {/* Scenario picker */}
      <Grid2 size={{ xs: 12, md: 10, lg: 8 }} display="flex" flexDirection="column" gap={1.5} paddingBottom="1.5rem">
        {(["dictation", "command"] as const).map((mode) => (
          <Box key={mode} display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography sx={{ color: "#aaaaaa", fontSize: "0.85rem", width: { xs: "100%", sm: 190 } }}>
              {mode === "dictation" ? "Dictation · ⌥ Right Option" : "Command · ⇧ Right Shift"}
            </Typography>
            {scenarios
              .filter((s) => s.mode === mode)
              .map((s) => {
                const selected = s.id === scenario.id;
                return (
                  <Chip
                    key={s.id}
                    label={s.label}
                    onClick={() => play(s)}
                    icon={selected && done ? <FontAwesomeIcon icon={faRotateRight} style={{ color: "white", fontSize: "0.75rem" }} /> : undefined}
                    sx={{
                      color: "white",
                      backgroundColor: selected ? ACCENT : "rgba(255,255,255,0.1)",
                      "&:hover": { backgroundColor: selected ? ACCENT : "rgba(255,255,255,0.18)" },
                    }}
                  />
                );
              })}
          </Box>
        ))}
        <Typography sx={{ color: "#777", fontSize: "0.8rem", display: { xs: "none", md: "block" } }}>
          Tip: on a keyboard, press Right Option or Right Shift to cycle through scenarios.
        </Typography>
      </Grid2>

      <Grid2 container size={{ xs: 12, md: 10, lg: 8 }} spacing={3}>
        {/* Stage: fake desktop with window, pill, and hotkey */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              position: "relative",
              borderRadius: "12px",
              background: "radial-gradient(circle at 30% 20%, #2a2140 0%, #161616 70%)",
              border: "1px solid #2a2a2a",
              padding: "1.5rem 1rem 0",
              height: 360,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              overflow: "hidden",
            }}
          >
            <MacWindow scenario={scenario} phase={phase} />

            <AnimatePresence>
              {done && scenario.action && (
                <MotionBox
                  key={scenario.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    backgroundColor: "rgba(44,44,46,0.95)",
                    border: "1px solid #3a3a3c",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    color: "white",
                    fontSize: "0.8rem",
                  }}
                >
                  🧭 {scenario.action.toast}
                </MotionBox>
              )}
            </AnimatePresence>

            {/* Pill sits bottom-center, like the app's floating NSPanel */}
            <Box sx={{ position: "absolute", bottom: 90, left: "50%", transform: "translateX(-50%)" }}>
              <AnimatePresence>
                {pillPhase && (
                  <MotionBox
                    key="pill"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pill mode={scenario.mode} phase={pillPhase} />
                  </MotionBox>
                )}
              </AnimatePresence>
            </Box>

            <Box sx={{ position: "absolute", bottom: 14, right: 16 }}>
              <KeyCap
                symbol={scenario.mode === "dictation" ? "⌥" : "⇧"}
                label={scenario.mode === "dictation" ? "option" : "shift"}
                pressed={phase === "listening"}
              />
            </Box>
          </Box>
        </Grid2>

        {/* Pipeline readout */}
        <Grid2 size={{ xs: 12, md: 6 }} display="flex" flexDirection="column" gap={1.5}>
          <Box display="flex" gap="4px" flexWrap="wrap">
            {steps.map((step, i) => {
              const on = active.includes(i);
              return (
                <Box
                  key={step.label}
                  sx={{
                    flex: "1 1 0",
                    minWidth: 70,
                    borderRadius: "6px",
                    padding: "6px 8px",
                    border: `1px solid ${on ? ACCENT : "#333"}`,
                    backgroundColor: on ? "rgba(134,91,236,0.2)" : "transparent",
                    transition: "all 0.2s",
                  }}
                >
                  <Typography sx={{ color: on ? "white" : "#999", fontSize: "0.75rem", fontWeight: 600 }}>
                    {step.label}
                  </Typography>
                  <Typography sx={{ color: on ? "#c9b5ff" : "#666", fontSize: "0.65rem" }}>{step.tech}</Typography>
                </Box>
              );
            })}
          </Box>

          <Panel title="You say" dim={phase === "idle"}>
            <Typography sx={{ color: "white", fontStyle: "italic", fontSize: "0.95rem" }}>
              {phase === "idle" ? "…" : `“${words.slice(0, phase === "listening" ? wordsHeard : words.length).join(" ")}”`}
            </Typography>
          </Panel>

          <Panel title="Raw transcript · WhisperKit" dim={!transcribed}>
            {transcribed ? (
              <AnnotatedTranscript spoken={scenario.spoken} annotate={done} />
            ) : (
              <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>
                {phase === "transcribing" ? "Transcribing on-device…" : "Waits for key release"}
              </Typography>
            )}
            {scenario.dictionary && transcribed && (
              <Typography sx={{ color: "#888", fontSize: "0.75rem", pt: 0.5 }}>
                Dictionary: {scenario.dictionary.join(", ")}
              </Typography>
            )}
          </Panel>

          <Panel
            title={scenario.action ? "Routed action" : scenario.selection ? "Replaces selection" : "Pasted at cursor"}
            dim={!done}
          >
            {done ? (
              <>
                {scenario.route && (
                  <Typography sx={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.75rem", color: "#c9b5ff", pb: 0.5 }}>
                    CommandRouter → {scenario.route}
                  </Typography>
                )}
                {scenario.output && (
                  <Typography sx={{ color: "white", whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>{scenario.output}</Typography>
                )}
                <Box display="flex" gap={0.75} flexWrap="wrap" pt={1}>
                  {scenario.rules.map((r) => (
                    <Chip key={r} label={r} size="small" sx={{ color: "#ccc", backgroundColor: "rgba(255,255,255,0.08)", fontSize: "0.7rem" }} />
                  ))}
                </Box>
              </>
            ) : (
              <Typography sx={{ color: "#666", fontSize: "0.85rem" }}>
                {phase === "cleaning" ? (scenario.action ? "Matching command…" : "Cleaning up locally…") : "—"}
              </Typography>
            )}
          </Panel>

          <Box display="flex" gap={1.5} flexWrap="wrap" sx={{ opacity: done && !scenario.action ? 1 : 0, transition: "opacity 0.3s" }}>
            {LEGEND.map(({ kind, label }) => (
              <Box key={kind} display="flex" alignItems="center" gap={0.5}>
                <Box component="span" sx={{ ...SEGMENT_SX[kind], fontSize: "0.75rem", fontFamily: "var(--font-geist-mono)" }}>
                  abc
                </Box>
                <Typography sx={{ color: "#888", fontSize: "0.7rem" }}>{label}</Typography>
              </Box>
            ))}
          </Box>
        </Grid2>
      </Grid2>

      <Grid2 size={{ xs: 12, md: 10, lg: 8 }} paddingTop="2rem">
        <Typography sx={{ color: "#777", fontSize: "0.8rem", textAlign: "center" }}>
          This is a scripted playback — the real app is a native macOS menu-bar app that needs
          Accessibility access and ~8 GB of local models, so it can&apos;t run in a browser. The
          scenarios come from the examples in LocalFlow&apos;s cleanup prompt and command router.
        </Typography>
      </Grid2>
    </Grid2>
  );
}
