var React = require("react"),
    TreeActions = require("../actions/tree_actions"),
    IpcActions = require("../actions/ipc_actions");

var Canvas = require('./canvas'),
    Menu = require("./menu"),
    Sidebar = require("./sidebar");

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <Menu />
                <Sidebar onGenerateButtonPressed={this._changeTree}/>
                <Canvas />
            </div>
        );
    },

    _changeTree: function (tree) {
        TreeActions.changeTree(tree);
    },

    componentDidMount: function () {
        IpcActions.initBindings();
    }
});