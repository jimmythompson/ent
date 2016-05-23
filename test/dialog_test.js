var proxyquire = require("proxyquire").noCallThru(),
    assert = require("assert"),
    sinon = require("sinon");

describe('dialogs', function () {
    describe("#openFile", function () {
        var mockShowOpenDialog = sinon.stub().returns([""]),
            mockReadFileSync = sinon.stub().returns("My File!");

        var dialogs = proxyquire("../src/app/dialog", {
            electron: {
                BrowserWindow: {
                    getFocusedWindow: sinon.stub().returns("")
                },
                dialog: {
                    showOpenDialog: mockShowOpenDialog
                }
            },
            fs: { readFileSync: mockReadFileSync }
        });

        it("should open the file from the dialog and return the contents", function () {
            assert.equal(dialogs.openFile(), "My File!");
        });

        it("should return false if no file is returned from the dialog", function () {
            mockShowOpenDialog.returns("");

            assert.equal(dialogs.openFile(), false);
        });

        it("should return the first file if multiple files are selected", function () {
            mockShowOpenDialog.returns(["First File", "Second File"]);

            dialogs.openFile();

            assert(mockReadFileSync.calledWith("First File"));
        });
    });

    describe("#saveFile", function () {
        var mockShowSaveDialog = sinon.stub().returns("my_file.txt"),
            mockWriteFileSync = sinon.stub();

        var dialogs = proxyquire("../src/app/dialog", {
            electron: {
                BrowserWindow: {
                    getFocusedWindow: sinon.stub().returns("")
                },
                dialog: {
                    showSaveDialog: mockShowSaveDialog
                }
            },
            fs: { writeFileSync: mockWriteFileSync }
        });

        it("should save the file given by the dialog and return true", function () {
            assert(dialogs.saveFile("content"));
            mockWriteFileSync.calledWith("my_file.txt", "content");
        });

        it("should return false if no file is returned from the dialog", function () {
            mockShowSaveDialog.returns("");

            assert.ifError(dialogs.saveFile("content"));
        });
    });
});