var named = require('named-regexp').named,
    range = require("range").range;

var expression = named(/^(:<depth>=+) (:<name>[^=]+)$/);

var textToLines = function (text) {
    if (Array.isArray(text)) {
        return text;
    }

    return text.split("\n");
};

var parseLine = function (line) {
    var parsed = expression.exec(line).captures;

    return {
        name: parsed.name[0],
        depth: parsed.depth[0].length,
        parent: null,
        children: []
    };
};

var deepConvert = function (node) {
    return {
        name: node.name,
        children: node.children.map(deepConvert)
    };
};

module.exports = {
    parse: function (text) {
        if (!text) {
            return null;
        }

        var lines = textToLines(text);
        var root = parseLine(lines[0]);

        lines.slice(1)
             .filter(function(line) {
                 return line.trim().length !== 0;
             }).reduce(function (previous, current) {
                 var parsed = parseLine(current);

                 if (parsed.depth > previous.depth) {
                     parsed.parent = previous;
                     previous.children.push(parsed);
                 } else {
                     var actualParent = previous.parent;
                     var howFarToJump = previous.depth - parsed.depth;

                     range(0, howFarToJump).forEach(function (i) {
                         actualParent = actualParent.parent;
                     });

                     parsed.parent = actualParent;
                     actualParent.children.push(parsed);
                 }

                 return parsed;
            }, root);

        return deepConvert(root);
    }
};