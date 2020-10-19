"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var menubar = require('menubar').menubar;
var applescript = require('applescript');
var path_1 = require("path");
var mb = menubar({
    browserWindow: {
        height: 200,
        width: 200
    },
    icon: path_1.join(__dirname || path_1.resolve(path_1.dirname('')), '..', 'resources/menubar-icons/iconTemplate.png'),
    index: "file://" + path_1.join(__dirname, '../src/index.html'),
    preloadWindow: true,
    showDockIcon: false,
    windowPosition: 'trayLeft'
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
    applescript.execString("set thePW to \"MY_PASSWORD\"\n     tell application \"System Preferences\"\n       activate\n       delay 2\n       reveal pane id \"com.apple.preference.startupdisk\"\n       delay 2\n       tell application \"System Events\" to tell process \"System Preferences\"\n         click button \"Click the lock to make changes.\" of window 1\n         if thePW\n           delay 2\n           keystroke thePW\n           keystroke return\n         end if\n       end tell\n     end tell", function (err, rtn) {
        if (err) {
            console.log('err', err);
        }
    });
}
//# sourceMappingURL=index.js.map