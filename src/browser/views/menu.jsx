var React = require("react"),
    MenuActions = require("../actions/menu_actions");

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
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
    },

    render: function () {
        return (
            <li style={{float: 'right'}}><a onClick={this.props.onClick}>{this.props.name}</a></li>
        );
    }
});

module.exports = React.createClass({
    render: function () {
        return (
            <nav role="navigation">
                <ul className="icon-bar">
                    <LeftItem id="load" name="Load" onClick={this._onLoadClicked} />
                    <LeftItem id="save" name="Save" onClick={this._onSaveClicked} />
                    <LeftItem id="export" name="Export" onClick={this._onLoadClicked} />
                    <RightItem id="show-hide" name="&#x25BC;" />
                </ul>
            </nav>
        );
    },

    _onLoadClicked: function () {
        MenuActions.openLoadFilePrompt();
    },

    _onSaveClicked: function () {
        MenuActions.openSaveFilePrompt();
    }
});
