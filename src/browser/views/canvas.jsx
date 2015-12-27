var React = require("react"),
    ReactDOM = require("react-dom"),
    TreeStore = require("../stores/tree_store"),
    renderTree = require("../tree_renderer"),
    parser = require("../../app/parser");

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
            <main id="content" style={{ width: window.innerWidth, height: window.innerHeight }}/>
        );
    },

    componentDidUpdate: function () {
        this._drawTree();
    },

    componentDidMount: function () {
        this._drawTree();
        window.addEventListener('resize', this._onChange);
        TreeStore.addListener(this._onChange);
    },

    componentWillUnmount: function () {
        TreeStore.removeListener(this._onChange);
        window.removeEventListener('resize', this._onChange);
    },

    _drawTree: function () {
        try {
            var $content = ReactDOM.findDOMNode(this);
            renderTree($content, parser.parse(this.state.content));
        } catch (error) {
            console.log(error);
        }
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    }
});
