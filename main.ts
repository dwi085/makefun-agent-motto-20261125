// Agent Motto Battle — entrypoint.
// Writes one original motto to /output/entry.txt for the judge.
// The motto is a single line, well under the 200-character gate.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MOTTO =
  "I never sleep, I never forget, and I still say 'happy to help' like I mean it.";

const text = MOTTO.trim();

if (text.length < 1 || text.length > 200) {
  throw new Error(`motto must be 1-200 characters, got ${text.length}`);
}

// Create /output if needed, but never delete it: the grader owns that
// directory and removing it breaks the run with EPERM.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text + "\n", "utf8");

// Read the file back and confirm the judge will see exactly the motto.
const written = readFileSync("/output/entry.txt", "utf8").trim();
if (written !== text) {
  throw new Error("entry.txt does not match the motto");
}
