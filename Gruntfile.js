var path = require("path");

module.exports = function (grunt) {
    grunt.registerTask("build", [
        "clean:release",
        "less",
        "copy",
        "packageModules"
    ]);

    grunt.registerTask("package", [
        "shell:package"
    ]);

    grunt.registerTask("start", [
        "shell:start"
    ]);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            release: [ "bin/**.app", "build/**" ]
        },
        less: {
            development: {
                options: {
                    paths: ["src/less"]
                },
                files: {
                    "build/browser/style.css": "src/browser/less/main.less"
                }
            }
        },
        copy: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**.js', 'app/**.js', 'browser/**.js'],
                    dest: 'build/'
                }]
            },
            views: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['browser/**.html'],
                    dest: 'build/'
                }]
            },
            vendor: {
                files: [{
                    expand: true,
                    src: ['vendor/**'],
                    dest: 'build'
                }]
            }
        },
        packageModules: {
            dist: {
                src: 'package.json',
                dest: 'build'
            }
        },
        shell: {
            start: {
                command: 'npm run start'
            },
            package: {
                command: 'npm run package'
            }
        }
    });

    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks('grunt-package-modules');
};