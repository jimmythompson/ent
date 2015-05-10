var named = require('named-regexp').named;

var expression = named(/^(:<depth>=+) (:<name>[^=]+)$/);

var textToLines = function (text) {
    if (Array.isArray(text)) {
        return text;
    }

    return text.split("\n");
};

var intermediate = function (name, parent) {
    return { name: name, parent: parent }
};

var node = function (name, children) {
    children = typeof children !== 'undefined' ? children : [];
    return { name: name, children: children };
};

var parseLine = function (line) {
    parsed = expression.exec(line).captures;

    return {
        name: parsed.name[0],
        depth: parsed.depth[0].length
    };
};

module.exports = {
    parse: function (text) {
        lines = textToLines(text);
        root = node(lines[0]);

        if (!text) {
            return root;
        }

        return root;
    }
};