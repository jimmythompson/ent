var React = require("react");

module.exports = React.createClass({
    propTypes: {
        content: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <div className="sidebar">
                <textarea id="text-area" value={this.props.content} />
                <button id="generate" className="button-primary">Generate</button>
            </div>
        );
    }
});