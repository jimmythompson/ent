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

    console.log("Opening file " + fileName);

    return fs.readFileSync(fileName);
};

module.exports.saveDialog = function (text) {
    console.log("Opening save dialog.");
    var browserWindow = BrowserWindow.getFocusedWindow();

    var fileName = dialog.showSaveDialog(browserWindow, {});

    console.log("Saving to " + fileName);
    fs.writeFileSync(fileName, text);
};
