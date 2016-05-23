const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

var buildMenu = require('./app/menu');
var events = require("./app/events");

// Keep a global reference of the window object
var mainWindow = null;

app.on('window-all-closed', function () {
    app.quit();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({width: 1024, height: 768});

    mainWindow.loadURL('file://' + __dirname + '/browser/index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(
        buildMenu(app, mainWindow)
    ));
});