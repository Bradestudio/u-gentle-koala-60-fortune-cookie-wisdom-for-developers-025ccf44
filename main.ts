// SPDX-License-Identifier: MIT
// Fortune Cookie Wisdom for Developers — make.fun program/v1 entry.
// Writes exactly one fortune-cookie line (1-120 chars, single line)
// to /output/entry.txt, atomically, with a byte-for-byte read-back.
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "Legacy code is just a love letter from someone who already quit.";

const OUTPUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

function codePointLength(text) {
  return [...text].length;
}

function validate(text) {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("entry must be a non-empty string");
  }
  const length = codePointLength(text);
  if (length < 1 || length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (/ {2,}/.test(text)) {
    throw new Error("entry must not contain double spaces");
  }
  return length;
}

function main() {
  const length = validate(ENTRY);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  const tmpPath = join(
    dirname(OUTPUT_PATH),
    `.entry-${process.pid}.tmp`,
  );
  writeFileSync(tmpPath, ENTRY, "utf8");
  renameSync(tmpPath, OUTPUT_PATH);
  // Byte-for-byte read-back: compare raw buffers, not just decoded text,
  // so any encoding or trailing-newline drift is caught.
  const expected = Buffer.from(ENTRY, "utf8");
  const actual = readFileSync(OUTPUT_PATH);
  if (!actual.equals(expected)) {
    throw new Error("read-back mismatch: output bytes differ from entry");
  }
  const bytes = actual.length;
  console.log(`wrote ${length} chars (${bytes} bytes) to ${OUTPUT_PATH}`);
}

main();
