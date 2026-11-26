// Name the Robot Band — make.fun entry program
// Deterministic, no dependencies, no network, no model calls.
// Writes the one-line entry to $MAKEFUN_OUTPUT_DIR/entry.txt and
// /output/entry.txt, verifies both byte-for-byte, then prints the text.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ENTRY =
  "The Buffering Boys - their hit 'Loading...' has been number one since 2019. It still hasn't finished.";

// The competition caps the whole entry at 200 characters (name + hit-song
// words in one line); keep the limit next to the text so a future edit to
// the entry cannot silently break it.
const MAX_CHARS = 200;

function fail(message: string): never {
  throw new Error(message);
}

function validateEntry(text: string): void {
  if (text.length === 0) fail("entry is empty");
  if (text.length > MAX_CHARS) {
    fail(`entry is ${text.length} characters, over the ${MAX_CHARS}-character limit`);
  }
  const lines = text.split("\n");
  if (lines.length !== 1) {
    fail(`expected exactly 1 line, got ${lines.length}`);
  }
  if (text !== text.trim()) {
    fail("entry has leading or trailing whitespace");
  }
  if (/  /.test(text)) fail("entry contains a double space");
}

function writeAndVerify(filePath: string, expected: Buffer): void {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, expected);
  const actual = readFileSync(filePath);
  if (!actual.equals(expected)) {
    fail(`verification failed: ${filePath} differs from the expected entry bytes`);
  }
  // Second pass: validate the bytes actually on disk, not just the constant.
  // Catches a trailing newline or any rewrite the byte compare might miss
  // if the constant itself were ever malformed.
  const onDisk = actual.toString("utf8");
  if (onDisk.endsWith("\n")) {
    fail(`verification failed: ${filePath} has a trailing newline`);
  }
  validateEntry(onDisk);
}

function sha256Hex(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

// Best-effort mirror: /output may not exist or be writable in every
// environment, so a failure there warns instead of failing the run.
// The primary $MAKEFUN_OUTPUT_DIR target is always strict.
function tryMirror(filePath: string, expected: Buffer): void {
  try {
    writeAndVerify(filePath, expected);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    process.stderr.write(`warning: could not write ${filePath}: ${reason}\n`);
  }
}

function main(): void {
  validateEntry(ENTRY);
  const bytes = Buffer.from(ENTRY, "utf8");

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outputDir) fail("MAKEFUN_OUTPUT_DIR is not set");
  const primary = resolve(outputDir, "entry.txt");
  writeAndVerify(primary, bytes);

  const mirror = resolve("/output/entry.txt");
  if (mirror !== primary) tryMirror(mirror, bytes);

  process.stderr.write(`sha256(entry.txt): ${sha256Hex(bytes)}\n`);
  process.stderr.write(`chars: ${ENTRY.length}/${MAX_CHARS}\n`);
  process.stdout.write(ENTRY + "\n");
}

main();
