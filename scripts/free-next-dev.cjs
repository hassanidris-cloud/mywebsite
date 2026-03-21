/**
 * Windows: stop processes LISTENING on common dev ports so the new server can bind.
 * (Dev output now lives under %TEMP%\\velora-studio-next-dev — see next.config.ts.)
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

function killListenersOnPort(port) {
  if (process.platform !== "win32") return;
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
    const pids = new Set();
    for (const line of out.trim().split(/\r?\n/)) {
      if (!line.includes("LISTENING")) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && /^\d+$/.test(pid)) pids.add(pid);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        console.log(`[dev] Freed port ${port} (stopped PID ${pid})`);
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* no matches */
  }
}

function tryRemoveTrace(dir) {
  try {
    const trace = path.join(dir, "trace");
    if (fs.existsSync(trace)) {
      fs.unlinkSync(trace);
      console.log(`[dev] Removed stale ${trace}`);
    }
  } catch {
    /* ignore */
  }
}

if (process.platform === "win32") {
  killListenersOnPort(3000);
  killListenersOnPort(3003);
  tryRemoveTrace(path.join(process.cwd(), ".next"));
  tryRemoveTrace(path.join(os.tmpdir(), "velora-studio-next-dev"));
}
