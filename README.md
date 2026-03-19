# Monty's External Crosshair - Build Instructions

## Requirements
- Windows 10 or 11
- Node.js (download from https://nodejs.org — use the LTS version)

---

## Steps to build your .exe

### 1. Install Node.js
Go to https://nodejs.org and download the LTS installer. Run it and click through — all defaults are fine.

### 2. Open the project folder
Put this entire folder somewhere easy to find (e.g. `C:\Users\YourName\crosshair-app`)

### 3. Open a terminal in the folder
- Hold **Shift** and **right-click** inside the folder
- Select "Open PowerShell window here" (or "Open Terminal here")

### 4. Install dependencies
Type this and press Enter:
```
npm install
```
Wait for it to finish (may take a minute).

### 5. Test it first (optional)
```
npm start
```
This runs the app without building — the dashboard and overlay will open live.

### 6. Build the .exe
```
npm run build
```
This creates a `dist/` folder. Inside it you'll find:
- `Monty's External Crosshair.exe` — installer you can run on any Windows PC
- Or the raw `.exe` inside `dist/win-unpacked/`

---

## How to use
- Open the app — the dashboard appears and the crosshair overlays your screen
- Use sliders to adjust size, thickness, gap, outline, and dot
- Click **Cross Color** / **Dot Color** to change colors
- Use the **D-Pad** to reposition the crosshair if needed
- Set a **hotkey** to toggle the crosshair on/off (default: Insert)
- The crosshair works on top of any game or app

---

## Notes
- If the crosshair doesn't show in games: run the app as Administrator
- For fullscreen games, try Borderless Windowed mode
- The crosshair is click-through — your mouse works normally underneath it
