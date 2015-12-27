var React = require("react");

var Canvas = require('./canvas'),
    Menu = require("./menu"),
    Sidebar = require("./sidebar");

var exampleTree = [ "= Break into house",
                    "== Through the door",
                    "=== Smash door",
                    "=== Pick lock",
                    "== Through the window" ].join("\n");

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <Menu />
                <Sidebar content={exampleTree} />
                <Canvas />
            </div>
        );
    }
});