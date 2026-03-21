# Dev server stuck on “Starting…” (Windows)

## What’s going wrong

Next.js writes to `.next/trace`. If **another Node process** is still running (often the one using **port 3000**), that file can be **locked** → you see **EPERM** or the server hangs on **Starting…**.

## Automatic fix (built in)

1. **`scripts/launch-next-dev.cjs`** — Sets **`NEXT_USE_TEMP_DIST=1`** then starts Next. That env must be set in the **same** process as `next dev` (a quirk of how Next loads config).

2. **`next.config.ts`** — On **Windows** when that env is set, dev output goes to **`%TEMP%\velora-studio-next-dev`**, not **`.\.next`**, so a locked **`.\.next\trace`** cannot break the dev server.

3. **`scripts/free-next-dev.cjs`** — Runs first: frees ports **3000** / **3003** and tries to remove stale **`trace`** files under **`.\.next`** and the temp folder.

To use the normal **`.\.next`** for dev anyway:  
`set NEXT_DEV_USE_PROJECT_DIST=1` then `npx next dev` (not recommended on Desktop if you hit EPERM).

Run from `velora-studio`:

```powershell
npm run dev
```

**Production:** `next build` / Vercel still use the normal **`.next`** folder in the project.

If it still fails, use the manual steps below.

## Fix (manual)

1. **Close every terminal** running `npm run dev`.
2. **Task Manager** → end extra **Node.js** processes, **or** in PowerShell:
   ```powershell
   # See what uses port 3000 (note the PID in the last column)
   netstat -ano | findstr :3000
   # Stop that process (replace 12345 with your PID)
   taskkill /PID 12345 /F
   ```
3. From `velora-studio`, run again:
   ```powershell
   npm run dev
   ```

If it still fails after killing Node, wipe the build cache and retry:

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run dev
```

## Optional

- Pause **OneDrive** sync on this folder, or move the repo to e.g. `C:\dev\velora-studio`.
- Add a **Windows Defender** exclusion for the project folder if antivirus locks files.
