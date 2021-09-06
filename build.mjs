import { build } from "esbuild";

const [, , ...args] = process.argv;
const watch = args.some((v) => v === "--watch");

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  logLevel: "info",
  outfile: "dist/index.js",
  format: "cjs",
  watch,
});
