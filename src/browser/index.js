var $ = require("jquery");
var ipc = require("ipc");
var xmldom = require("xmldom");

var parser = require("../app/parser");
var generator = require("./image_generator");

var $success = $(".success");
var $content = document.getElementById("content");
var $textarea = document.getElementById("text-area");

var renderTree = function () {
    var root = parser.parse($textarea.value);

    generator.clear();

    if (root) {
        generator.generate(root, $content);
    }
};

var showSuccessMessage = function (message) {
    $success.text(message);
    $success.fadeIn("slow", function () {
        setTimeout(function () {
            $success.fadeOut("slow");
        }, 2000);
    });
};

$("#generate").on("click", renderTree);

$("#load").on("click", function () {
    $textarea.value = ipc.sendSync("dialog:open");
    renderTree();
    showSuccessMessage("Successfully loaded file");
});

$("#save").on("click", function () {
    ipc.send("dialog:save", $textarea.value);
});

ipc.on("message:success", showSuccessMessage);
