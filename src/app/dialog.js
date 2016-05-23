var electron = require("electron");
var fs = require("fs");
var dialog = electron.dialog;
var BrowserWindow = electron.BrowserWindow;

module.exports.openFile = function () {
    var fileNames = dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
        properties: [ "openFile" ],
        filters: [{ name: "Text Files", extensions: ["txt"] }]
    });

    if (!fileNames) {
        return false;
    }

    var fileName = fileNames[0];

    return fs.readFileSync(fileName, "utf8");
};

module.exports.saveFile = function (text) {
    var fileName = dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
        title: "Export tree as text",
        filters: [{ name: "Text", extensions: ["txt"] }]
    });

    if (!fileName) {
        return false;
    }

    fs.writeFileSync(fileName, text);

    return true;
};

module.exports.exportToSvg = function (text) {
    var fileName = dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
        title: "Export tree to SVG",
        filters: [{ name: "SVG", extensions: ["svg"] }]
    });

    if (!fileName) {
        return false;
    }

    fs.writeFileSync(fileName, text);

    return true;
};
