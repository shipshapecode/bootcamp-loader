import { app, Menu, Tray } from 'electron';
const { menubar } = require('menubar');
const applescript = require('applescript');

const mb = menubar({
  index: false,
  showDockIcon: false,
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
    'do shell script "bless -mount /Volumes/BOOTCAMP/ -legacy -setBoot -nextonly; shutdown -r now" with administrator privileges',
    (err: any, rtn: any) => {
      if (err) {
        console.log('err', err);
      }
    }
  );
}
