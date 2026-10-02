// Scripted LocalFlow scenarios. The dictation examples mirror the few-shot
// examples in LocalFlow's cleanup prompt (PromptBuilder.swift); the command
// examples mirror CommandRouter / ActionRegistry behavior.

export type Mode = "dictation" | "command";

// How the cleanup model treated each spoken segment.
//  filler  - removed (um, uh, like, you know)
//  struck  - deleted by a self-correction ("scratch that")
//  cue     - spoken formatting / correction instruction
//  dict    - matched a custom dictionary term
export type SegmentKind = "filler" | "struck" | "cue" | "dict";

export interface Segment {
  text: string;
  kind?: SegmentKind;
}

export interface Scenario {
  id: string;
  label: string;
  mode: Mode;
  app: string;
  // Text already in the window before the cursor.
  context: string;
  // Text selected when the hotkey is pressed (command-mode rewrites).
  selection?: string;
  spoken: Segment[];
  // Text pasted at the cursor (or replacing the selection).
  output?: string;
  // App action instead of pasted text (command mode).
  action?: { toast: string };
  route?: string;
  dictionary?: string[];
  rules: string[];
}

export const scenarios: Scenario[] = [
  {
    id: "paragraph",
    label: "Formatting cues",
    mode: "dictation",
    app: "Mail",
    context: "To: John\nSubject: Launch\n\n",
    spoken: [
      { text: "um", kind: "filler" },
      { text: "so", kind: "filler" },
      { text: "send the email to john" },
      { text: "new paragraph", kind: "cue" },
      { text: "tell him it's ready" },
    ],
    output: "Send the email to John.\n\nTell him it's ready.",
    rules: ["Filler removed", "“new paragraph” → blank line", "Proper noun capitalized"],
  },
  {
    id: "scratch",
    label: "Self-correction",
    mode: "dictation",
    app: "Messages",
    context: "",
    spoken: [
      { text: "the meeting is" },
      { text: "at three", kind: "struck" },
      { text: "no scratch that", kind: "cue" },
      { text: "at four pm" },
    ],
    output: "The meeting is at four PM.",
    rules: ["“scratch that” deletes the previous clause", "Punctuation added"],
  },
  {
    id: "bullets",
    label: "Bullet list",
    mode: "dictation",
    app: "Notes",
    context: "Friday\n",
    spoken: [
      { text: "bullet point", kind: "cue" },
      { text: "finish the report" },
      { text: "bullet point", kind: "cue" },
      { text: "send invoices" },
      { text: "bullet point", kind: "cue" },
      { text: "uh", kind: "filler" },
      { text: "book flights to denver" },
    ],
    output: "- Finish the report\n- Send invoices\n- Book flights to Denver",
    rules: ["“bullet point” → list item", "Filler removed", "Proper noun capitalized"],
  },
  {
    id: "filler",
    label: "Filler words",
    mode: "dictation",
    app: "Slack",
    context: "",
    spoken: [
      { text: "i think we should" },
      { text: "like", kind: "filler" },
      { text: "ship it today" },
      { text: "you know", kind: "filler" },
    ],
    output: "I think we should ship it today.",
    rules: ["Filler removed", "Capitalization + punctuation"],
  },
  {
    id: "numbers",
    label: "Phone numbers",
    mode: "dictation",
    app: "Messages",
    context: "",
    spoken: [
      { text: "call me back at" },
      { text: "uh", kind: "filler" },
      { text: "five five five one two three four" },
    ],
    output: "Call me back at 555-1234.",
    rules: ["Filler removed", "Spoken digits → formatted number"],
  },
  {
    id: "dictionary",
    label: "Custom dictionary",
    mode: "dictation",
    app: "Slack",
    context: "",
    spoken: [
      { text: "can you push the" },
      { text: "local flow", kind: "dict" },
      { text: "fix to" },
      { text: "git hub", kind: "dict" },
      { text: "before standup" },
    ],
    output: "Can you push the LocalFlow fix to GitHub before standup?",
    dictionary: ["LocalFlow", "GitHub"],
    rules: ["Dictionary terms preserved exactly", "Question mark inferred"],
  },
  {
    id: "rewrite",
    label: "Rewrite selection",
    mode: "command",
    app: "Mail",
    context: "Re: Q3 numbers\n\n",
    selection: "hey can u send me the numbers by friday thx",
    spoken: [{ text: "make this more formal" }],
    route: '.rewrite(instruction: "make this more formal")',
    output: "Hi, could you please send me the figures by Friday? Thank you.",
    rules: ["Selection captured via ⌘C", "LLM rewrite", "Selection replaced via ⌘V"],
  },
  {
    id: "open",
    label: "Open an app",
    mode: "command",
    app: "Notes",
    context: "Groceries\n- Milk\n- Eggs\n",
    spoken: [{ text: "open safari" }],
    route: '.action(open, "Safari")',
    action: { toast: "Opening Safari.app" },
    rules: ["Matched “open …” prefix", "Resolved /Applications/Safari.app", "No LLM call needed"],
  },
];

export const spokenWords = (s: Scenario) =>
  s.spoken.flatMap((seg) => seg.text.split(" "));
