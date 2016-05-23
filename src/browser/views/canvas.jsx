var React = require("react"),
    ReactDOM = require("react-dom"),
    TreeStore = require("../stores/tree_store"),
    CanvasActions = require("../actions/canvas_actions"),
    renderTree = require("../tree_renderer"),
    parser = require("../../app/parser");

var getStateFromStore = function () {
    return {
        tree: TreeStore.getTree()
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
        // setTimeout stops the dispatch inside a dispatch error
        setTimeout(this._updateCanvas);
    },

    componentDidMount: function () {
        this._updateCanvas();
        window.addEventListener('resize', this._onChange);
        TreeStore.addListener(this._onChange);
    },

    componentWillUnmount: function () {
        TreeStore.removeListener(this._onChange);
        window.removeEventListener('resize', this._onChange);
    },

    _getHtml: function () {
        return ReactDOM.findDOMNode(this).innerHTML;
    },

    _drawTree: function () {
        try {
            var $content = ReactDOM.findDOMNode(this);
            console.log("Tree: ", this.state.tree);
            renderTree($content, parser.parse(this.state.tree), this._onInteraction);
        } catch (error) {
            console.log(error);
        }
    },

    _onInteraction: function () {
        CanvasActions.updateCanvas(this._getHtml());
    },

    _updateCanvas: function () {
        this._drawTree();
        CanvasActions.updateCanvas(this._getHtml());
    },

    _onChange: function () {
        this.setState(getStateFromStore());
    }
});
