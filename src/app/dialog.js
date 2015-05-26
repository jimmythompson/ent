var fs = require("fs");
var dialog = require("dialog");
var BrowserWindow = require("browser-window");

module.exports.openFile = function () {
    var browserWindow = BrowserWindow.getFocusedWindow();

    var fileNames = dialog.showOpenDialog(browserWindow, {
        properties: [ "openFile" ],
        filters: [
            { name: 'Text Files', extensions: ['txt'] }
        ]
    });

    if (!fileNames) {
        return false;
    }

    var fileName = fileNames[0];

    return fs.readFileSync(fileName, "utf8");
};

module.exports.saveFile = function (text) {
    var fileName = dialog.showSaveDialog(
        BrowserWindow.getFocusedWindow(), {});

    if (!fileName) {
        return false;
    }

    fs.writeFileSync(fileName, text);

    return true;
};
