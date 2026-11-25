import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// English has no tidy name for the instant a name you just heard evaporates.
// "namelapse" pairs a familiar root with "lapse" so the slip sounds ordinary and faintly comic.
// That transparent shape keeps it pronounceable, spellable, and easy to remember.
const word = "namelapse";
const definition = 'the instant a name you were just told vanishes, leaving you to greet them with a careful "hey"';
// The trigger and its tell sit in one breath, so a cold reader gets it immediately.
const line = `${word}: ${definition}`;

const points = Array.from(line);
if (line.trim().length === 0 || points.length > 140 || /[\r\n\v\f\u0085\u2028\u2029]/.test(line)) {
  throw new Error("entry must be non-blank, 1-140 code points, and single line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
// Fixed literals and overwrite-only writes keep entry.txt byte-identical across runs.
writeFileSync(join(outputDir, "entry.txt"), `${line}\n`, "utf8");
