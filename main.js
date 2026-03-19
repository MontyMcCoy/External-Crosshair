const { app, BrowserWindow, ipcMain, screen, globalShortcut } = require('electron');
const path = require('path');

let dashboardWin = null;
let overlayWin = null;

function createDashboard() {
  dashboardWin = new BrowserWindow({
    width: 620,
    height: 720,
    minWidth: 420,
    minHeight: 520,
    useContentSize: true,
    resizable: true,
    title: "Monty's External Crosshair",
    backgroundColor: '#1a1a2a',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  dashboardWin.loadFile('dashboard.html');
  dashboardWin.setMenuBarVisibility(false);

  dashboardWin.on('closed', () => {
    dashboardWin = null;
    app.quit();
  });
}

function createOverlay() {
  const { width, height } = screen.getPrimaryDisplay().bounds;

  overlayWin = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  overlayWin.loadFile('overlay.html');
  overlayWin.setIgnoreMouseEvents(true);
  overlayWin.setAlwaysOnTop(true, 'screen-saver');
  overlayWin.showInactive();
}

app.whenReady().then(() => {
  createDashboard();
  createOverlay();
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

// Receive crosshair settings from dashboard, forward to overlay
ipcMain.on('crosshair-settings', (event, settings) => {
  if (overlayWin) {
    overlayWin.webContents.send('crosshair-settings', settings);
  }
});

// Toggle overlay visibility
ipcMain.on('toggle-overlay', (event, visible) => {
  if (overlayWin) {
    if (visible) {
      overlayWin.showInactive();
    } else {
      overlayWin.hide();
    }
  }
});

// Register/update global hotkey
ipcMain.on('register-hotkey', (event, accelerator) => {
  globalShortcut.unregisterAll();
  try {
    globalShortcut.register(accelerator, () => {
      if (dashboardWin) {
        dashboardWin.webContents.send('hotkey-triggered');
      }
    });
  } catch (e) {
    console.log('Could not register hotkey:', accelerator);
  }
});
