var fs = require("fs");
var dialog = require("dialog");
var BrowserWindow = require("browser-window");

module.exports.openFile = function () {
    var browserWindow = BrowserWindow.getFocusedWindow();

    var fileName = dialog.showOpenDialog(browserWindow, {
        properties: [ "openFile" ],
        filters: [
            { name: 'Text Files', extensions: ['txt'] }
        ]
    })[0];

    return fs.readFileSync(fileName, "utf8");
};

module.exports.saveFile = function (text) {
    var fileName = dialog.showSaveDialog(
        BrowserWindow.getFocusedWindow(), {});

    fs.writeFileSync(fileName, text);
};
