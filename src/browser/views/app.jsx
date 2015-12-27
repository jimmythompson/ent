var React = require("react");

var Canvas = require('./canvas'),
    Menu = require("./menu"),
    Sidebar = require("./sidebar");


module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <Menu />
                <Sidebar />
                <Canvas />
            </div>
        );
    }
});