var xmldom = require("xmldom");
var parser = require("../app/parser");
var dialogs = require("../app/dialog");
var generator = require("../app/generate-image");

var $content = document.getElementById("content");
var $textarea = document.getElementById("text-area");

var updateTreeView = function () {
    var root = parser.parse($textarea.value);

    generator.clear();

    if (root) {
        generator.generate(root, $content);
    }
};

document.getElementById("generate").addEventListener("click", updateTreeView);

document.getElementById("load").addEventListener("click", function () {
    $textarea.value = dialogs.openDialog();
    updateTreeView();
});

document.getElementById("save").addEventListener("click", function () {
    dialogs.saveDialog($textarea.value);
});

document.getElementById("export").addEventListener("click", function () {
    var svgGraph = document.getElementsByTagName('svg');
    var svgXML = (new xmldom.XMLSerializer()).serializeToString(svgGraph[0]);
    dialogs.saveDialog(svgXML);
});

