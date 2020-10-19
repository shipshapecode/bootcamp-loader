import { app, Menu, Tray } from 'electron';
const { menubar } = require('menubar');
const applescript = require('applescript');
import { dirname, join, resolve } from 'path';

const mb = menubar({
  browserWindow: {
    height: 200,
    width: 200,
  },
  icon: join(__dirname || resolve(dirname('')), '..', 'resources/menubar-icons/iconTemplate.png'),
  index: `file://${join(__dirname, '../src/index.html')}`,
  preloadWindow: true,
  showDockIcon: false,
  windowPosition: 'trayLeft',
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  mb.app.quit();
}

mb.on('ready', () => {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Reboot to Windows',
      click() {
        bootToWindows();
      },
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click() {
        app.quit();
      },
    },
  ]);

  mb.tray.on('right-click', () => {
    mb.tray.popUpContextMenu(contextMenu);
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function bootToWindows() {
  applescript.execString(
    `tell application "System Preferences"
       activate
       delay 2
       reveal pane id "com.apple.preference.startupdisk"
       delay 2
       tell application "System Events" to tell process "System Preferences"
         click button "Click the lock to make changes." of window 1
       end tell
     end tell`,
    (err: any, rtn: any) => {
      if (err) {
        console.log('err', err);
      }
    }
  );
}
