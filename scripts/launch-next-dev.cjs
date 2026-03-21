/**
 * Sets NEXT_USE_TEMP_DIST so next.config can use a temp distDir on Windows
 * (must run in the same process tree as `next dev` — npm env alone is not enough).
 */
const { spawnSync } = require("child_process");
const path = require("path");

process.env.NEXT_USE_TEMP_DIST = "1";

const nextCli = require.resolve("next/dist/bin/next");
const extraArgs = process.argv.slice(2);

const result = spawnSync(process.execPath, [nextCli, "dev", ...extraArgs], {
  stdio: "inherit",
  env: process.env,
  cwd: path.join(__dirname, ".."),
});

process.exit(result.status ?? 1);
