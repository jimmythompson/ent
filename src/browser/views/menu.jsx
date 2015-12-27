var React = require("react");

var LeftItem = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <li><a id="{this.props.id}">{this.props.name}</a></li>
        );
    }
});

var RightItem = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <li style={{float: 'right'}}><a id="{this.props.id}">{this.props.name}</a></li>
        );
    }
});

module.exports = React.createClass({
    render: function () {
        return (
            <nav role="navigation">
                <ul className="icon-bar">
                    <LeftItem id="load" name="Load" />
                    <LeftItem id="save" name="Save" />
                    <LeftItem id="export" name="Export" />
                    <RightItem id="show-hide" name="&#x25BC;" />
                </ul>
            </nav>
        );
    }
});