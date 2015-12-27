var React = require("react"),
    ConfigStore = require("../stores/config_store");

var Sidebar = require("./sidebar");

var getStateFromStore = function () {
    return {
        sidebarEnabled: ConfigStore.isSidebarEnabled()
    }
};

module.exports = React.createClass({
    propTypes: {
        onGenerateButtonPressed: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return getStateFromStore();
    },

    render: function () {
        return (
            <div className="sidebar-container">
                {this._renderSidebar()}
            </div>
        );
    },

    componentDidMount: function () {
        ConfigStore.addListener(this._onChange);
    },

    componentWillUnmount: function () {
        ConfigStore.removeListener(this._onChange);
    },

    _renderSidebar: function () {
        if (this.state.sidebarEnabled) {
            return <Sidebar onGenerateButtonPressed={this.props.onGenerateButtonPressed} />;
        }
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    }
});