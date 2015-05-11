path = require("path");

module.exports = function (grunt) {
    grunt.registerTask("build", [
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
        less: {
            development: {
                options: {
                    paths: ["src/less"]
                },
                files: {
                    "build/style.css": "src/less/main.less"
                }
            }
        },
        copy: {
            src: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/**.js'],
                    dest: 'build/'
                }]
            },
            views: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/views/**.html'],
                    dest: 'build/views'
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
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-package-modules');
};