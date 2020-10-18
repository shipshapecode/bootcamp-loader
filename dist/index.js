"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var menubar = require('menubar').menubar;
var applescript = require('applescript');
var mb = menubar({
    index: false,
    showDockIcon: false
});
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    mb.app.quit();
}
mb.on('ready', function () {
    var contextMenu = electron_1.Menu.buildFromTemplate([
        {
            label: 'Reboot to Windows',
            click: function () {
                bootToWindows();
            }
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: function () {
                electron_1.app.quit();
            }
        },
    ]);
    mb.tray.on('right-click', function () {
        mb.tray.popUpContextMenu(contextMenu);
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
function bootToWindows() {
    console.log('windows time');
    applescript.execString('do shell script "bless -mount /Volumes/BOOTCAMP/ -legacy -setBoot -nextonly; shutdown -r now" with administrator privileges', function (err, rtn) {
        console.log('done with script');
        console.log('err', err);
    });
}
//# sourceMappingURL=index.js.map