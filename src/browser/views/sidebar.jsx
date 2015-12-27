var React = require("react"),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    TreeStore = require("../stores/tree_store");

var getStateFromStore = function () {
    return {
        content: TreeStore.getTree()
    };
};

module.exports = React.createClass({
    mixins: [ LinkedStateMixin ],

    propTypes: {
        onGenerateButtonPressed: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return getStateFromStore();
    },

    render: function () {
        return (
            <div className="sidebar">
                <textarea id="text-area" valueLink={this.linkState('content')} ref="text"/>
                <button id="generate" className="button-primary" onClick={this._onGenerateButtonPressed}>Generate</button>
            </div>
        );
    },

    _onGenerateButtonPressed: function () {
        this.props.onGenerateButtonPressed(this.refs.text.value);
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