var remote = require("remote");

var fs = remote.require("fs");
var dialog = remote.require("dialog");
var BrowserWindow = remote.require("browser-window");

module.exports.openDialog = function () {
    var browserWindow = BrowserWindow.getFocusedWindow();

    var fileName = dialog.showOpenDialog(browserWindow, {
        properties: [ "openFile" ],
        filters: [
            { name: 'Text Files', extensions: ['txt'] }
        ]
    })[0];

    return fs.readFileSync(fileName);
};

module.exports.saveDialog = function (text) {
    var fileName = dialog.showSaveDialog(
        BrowserWindow.getFocusedWindow(), {});

    fs.writeFileSync(fileName, text);
};
