var remote = require("remote");

var dialog = remote.require("dialog");
var BrowserWindow = remote.require("browser-window");

module.exports.openDialog = function () {
    var browserWindow = BrowserWindow.getFocusedWindow();

    console.log(dialog.showOpenDialog(browserWindow, {
        properties: [ "openFile", "openDirectory", "multiSelections" ]}));
};

module.exports.saveDialog = function () {
    console.log("Opening save dialog.");
};

