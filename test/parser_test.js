var assert = require("assert");
var parser = require("../src/parser");

describe('parser', function () {
    describe('#parse()', function () {
        it('should return an empty node when nothing is given', function () {
            result = parser.parse("");
            assert.deepEqual(result,
                { "name": "", "children": [] });
        });

        it('should store the first line as the target', function () {
            result = parser.parse("The target");
            assert.deepEqual(result,
                { name: "The target", children: [] });
        });

        it('should store multiple titles', function () {
            result = parser.parse(["The target",
                                   "= My title",
                                   "= My other title"]);
            assert.deepEqual(result,
                { name: "The target", children: [
                    { name: "My title", children: [] },
                    { name: "My other title", children: [] }
                ] });
        });

        it('should convert strings to an array of lines', function () {
            result = parser.parse("The target\n= My title\n= My other title");
            assert.deepEqual(result,
                { name: "The target", children: [
                    { name: "My title", children: [] },
                    { name: "My other title", children: [] }
                ] });
        });

        it('should store children with their parent', function () {
            result = parser.parse(["The target",
                                   "= My parent",
                                   "== My child"]);
            assert.deepEqual(result,
                { name: "The target", children: [
                    { name: "My parent", children: [
                        { name: "My child", children: [] }
                    ]}
                ]});
        });
    });
});