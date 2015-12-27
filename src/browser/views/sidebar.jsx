var React = require("react"),
    TreeStore = require("../stores/tree_store");

var getStateFromStore = function () {
    return {
        content: TreeStore.getContent()
    };
};

module.exports = React.createClass({
    getInitialState: function () {
        return getStateFromStore();
    },

    render: function () {
        return (
            <div className="sidebar">
                <textarea id="text-area" value={this.state.content} onChange={function () {}} />
                <button id="generate" className="button-primary">Generate</button>
            </div>
        );
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