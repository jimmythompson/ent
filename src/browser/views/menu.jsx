var React = require("react"),
    MenuActions = require("../actions/menu_actions"),
    ConfigStore = require("../stores/config_store");

var getStateFromStore = function () {
    return {
        sidebarEnabled: ConfigStore.isSidebarEnabled()
    }
};

var LeftItem = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    render: function () {
        return (
            <li><a onClick={this.props.onClick}>{this.props.name}</a></li>
        );
    }
});

var RightItem = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    render: function () {
        return (
            <li style={{float: 'right'}}><a onClick={this.props.onClick}>{this.props.name}</a></li>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function () {
        return getStateFromStore();
    },

    render: function () {
        return (
            <nav role="navigation">
                <ul className="icon-bar">
                    <LeftItem id="load" name="Load" onClick={this._onLoadClicked} />
                    <LeftItem id="save" name="Save" onClick={this._onSaveClicked} />
                    {this._renderShowHideButton()}
                </ul>
            </nav>
        );
    },

    componentDidMount: function () {
        ConfigStore.addListener(this._onChange);
    },

    componentWillUnmount: function () {
        ConfigStore.removeListener(this._onChange);
    },

    _renderShowHideButton: function () {
        if (this.state.sidebarEnabled) {
            return <RightItem name="&#x25BC;" onClick={this._onShowHideClicked} />
        }

        return <RightItem name="&#x25B2;" onClick={this._onShowHideClicked} />
    },

    _onLoadClicked: function () {
        MenuActions.openLoadFilePrompt();
    },

    _onSaveClicked: function () {
        MenuActions.openSaveFilePrompt();
    },

    _onExportClicked: function() {
        MenuActions.exportFilePrompt();
    },

    _onShowHideClicked: function () {
        MenuActions.toggleShowHide();
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    }
});
