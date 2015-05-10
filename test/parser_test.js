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
                                   "= Me",
                                   "= My sibling"]);
            assert.deepEqual(result,
                { name: "The target", children: [
                    { name: "Me", children: [] },
                    { name: "My sibling", children: [] }
                ] });
        });

        it('should convert strings to an array of lines', function () {
            result = parser.parse("The target\n= Me\n= My sibling");
            assert.deepEqual(result,
                { name: "The target", children: [
                    { name: "Me", children: [] },
                    { name: "My sibling", children: [] }
                ] });
        });

        it('should store children with their parent', function () {
            result = parser.parse(["The target",
                                   "= Me",
                                   "== My child"]);
            assert.deepEqual(result,
                { name: "The target", children: [
                    { name: "Me", children: [
                        { name: "My child", children: [] }
                    ]}
                ]});
        });

        it('should deal with double back-jumping', function () {
           result = parser.parse(["The target",
                                  "= Me",
                                  "== My child",
                                  "=== My grandchild",
                                  "= My sibling"]);
            assert.deepEqual(result,
                { name: "The target", children: [
                    { name: "Me", children: [
                        { name: "My child", children: [
                            { name: "My grandchild", children: [] }
                        ] }
                    ]},
                    { name: "My sibling", children: [] }
                ]});
        });

        it('should deal with triple back-jumping', function () {
           result = parser.parse(["The target",
                                  "= Me",
                                  "== My child",
                                  "=== My grandchild",
                                  "==== My great grandchild",
                                  "= My sibling"]);
            assert.deepEqual(result,
                { name: "The target", children: [
                    { name: "Me", children: [
                        { name: "My child", children: [
                            { name: "My grandchild", children: [
                                { name: "My great grandchild", children: [] }
                            ] }
                        ] }
                    ]},
                    { name: "My sibling", children: [] }
                ]});
        });
    });
});