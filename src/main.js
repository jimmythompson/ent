var app = require('app');
var Menu = require('menu');
var BrowserWindow = require('browser-window');

var buildMenu = require('./app/menu');

// Keep a global reference of the window object
var mainWindow = null;

app.on('window-all-closed', function () {
    app.quit();
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({width: 1024, height: 768});

    mainWindow.loadUrl('file://' + __dirname + '/browser/index.html');

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    Menu.setApplicationMenu(Menu.buildFromTemplate(
        buildMenu(app, mainWindow)
    ));
});