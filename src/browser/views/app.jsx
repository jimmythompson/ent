var React = require("react"),
    ConfigStore = require("../stores/config_store"),
    TreeActions = require("../actions/tree_actions"),
    IpcActions = require("../actions/ipc_actions");

var Canvas = require('./canvas'),
    Menu = require("./menu"),
    Sidebar = require("./sidebar");

var getStateFromStore = function () {
    return {
        sidebarEnabled: ConfigStore.isSidebarEnabled()
    }
};

module.exports = React.createClass({
    getInitialState: function () {
        return getStateFromStore();
    },

    render: function () {
        return (
            <div>
                <Menu />
                {this._renderSidebar()}
                <Canvas ref="canvas"/>
            </div>
        );
    },

    componentDidMount: function () {
        IpcActions.initBindings();
        ConfigStore.addListener(this._onChange);
    },

    componentWillUnmount: function () {
        ConfigStore.removeListener(this._onChange);
    },

    _renderSidebar: function () {
        if (this.state.sidebarEnabled) {
            return <Sidebar onGenerateButtonPressed={this._changeTree}/>;
        }
    },

    _changeTree: function (tree) {
        TreeActions.changeTree(tree);
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    }
});