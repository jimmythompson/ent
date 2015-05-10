var named = require('named-regexp').named;

var expression = named(/^(:<depth>=+) (:<name>[^=]+)$/);

var textToLines = function (text) {
    if (Array.isArray(text)) {
        return text;
    }

    return text.split("\n");
};

var node = function (name, children) {
    children = typeof children !== 'undefined' ? children : [];
    return { name: name, children: children };
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
    return converted = {
        name: node.name,
        children: node.children.map(deepConvert)
    };
};

module.exports = {
    parse: function (text) {
        var lines = textToLines(text);

        var root = {
            name: lines[0],
            depth: 0,
            parent: null,
            children: []
        };

        if (!text) {
            return deepConvert(root);
        }

        lines.slice(1).reduce(function (previous, current) {
            parsed = parseLine(current);

            if (parsed.depth > previous.depth) {
                parsed.parent = previous;
                previous.children.push(parsed);
            } else {
                var actualParent = previous.parent;

                var backjump = previous.depth - parsed.depth;
                for (var i = 0; i < backjump; i++) {
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