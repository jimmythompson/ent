var React = require("react"),
    TreeStore = require("../stores/tree_store");

var getStateFromStore = function () {
    return {
        content: TreeStore.getTree()
    };
};

module.exports = React.createClass({
    propTypes: {
        onTextAreaChanged: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return getStateFromStore();
    },

    render: function () {
        return (
            <div className="sidebar">
                <textarea id="text-area" defaultValue={this.state.content} onChange={this._onTextAreaChanged} />
            </div>
        );
    },

    _onTextAreaChanged: function (event) {
        this.props.onTextAreaChanged(event.target.value);
    },

    componentDidMount: function () {
        TreeStore.addListener(this._onChange);
    },

    componentWillUnmount: function () {
       TreeStore.removeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    }
});