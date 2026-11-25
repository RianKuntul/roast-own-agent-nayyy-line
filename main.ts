// Roast Your Own Agent — one line roasting the AI agent our own team built.
// The program writes exactly that line (plus a trailing newline) to
// $MAKEFUN_OUTPUT_DIR/entry.txt, after self-validating the gate:
// 1-200 characters total including the trailing newline, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Gojo spent a week entering make.fun bounties, won nothing, and still can't answer a phone call — our agent automates everything except being useful.";

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  const total = line.length + 1; // line + trailing newline
  if (total < 1 || total > 200) {
    throw new Error(`entry must be 1-200 characters including newline, got ${total}`);
  }
}

function main(): void {
  validate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
}

main();
