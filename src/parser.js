var named = require('named-regexp').named;

var expression = named(/^(:<depth>=+) (:<name>[^=]+)$/);

var textToLines = function (text) {
    if (Array.isArray(text)) {
        return text;
    }

    return text.split("\n");
};

var parseLine = function (line) {
    parsed = expression.exec(line).captures;

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
        var lines = textToLines(text);

        if (!text) {
            return {name: "", children: []};
        }

        var root = parseLine(lines[0]);

        lines.slice(1)
             .filter(function(line) {
                 return (line.trim().length !== 0);
             }).reduce(function (previous, current) {
                 parsed = parseLine(current);

                if (parsed.depth > previous.depth) {
                    parsed.parent = previous;
                    previous.children.push(parsed);
                } else {
                    var actualParent = previous.parent;
                    var howFarToJump = previous.depth - parsed.depth;

                    for (var i = 0; i < howFarToJump; i++) {
                        actualParent = actualParent.parent;
                    }

                    parsed.parent = actualParent;
                    actualParent.children.push(parsed);
                }

                 return parsed;
            }, root);

        return deepConvert(root);
    }
};