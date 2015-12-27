var React = require("react"),
    TreeActions = require("../actions/tree_actions"),
    IpcActions = require("../actions/ipc_actions");

var Canvas = require('./canvas'),
    Menu = require("./menu"),
    SidebarContainer = require("./sidebar_container");


module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <Menu />
                <SidebarContainer onGenerateButtonPressed={this._changeTree} />
                <Canvas ref="canvas" />
            </div>
        );
    },

    componentDidMount: function () {
        IpcActions.initBindings();
    },

    _changeTree: function (tree) {
        TreeActions.changeTree(tree);
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    }
});