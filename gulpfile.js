var clean = require("gulp-clean"),
    gulpNpmFiles = require("gulp-npm-files"),
    gulp = require("gulp"),
    gulpWebpack = require("webpack-stream"),
    less = require("gulp-less"),
    mocha = require("gulp-mocha"),
    rename = require("gulp-rename"),
    shell = require("gulp-shell"),
    webpack = require("webpack");

var buildDirectory = "build";

gulp.task("clean", [
    "clean-app",
    "clean-build"
]);

gulp.task("test", [
    "run-unit-tests"
]);

gulp.task("clean-app", function () {
    return gulp
        .src("bin/Ent*", { read: false })
        .pipe(clean({ force: true }));
});

gulp.task("clean-build", function () {
    return gulp
        .src(buildDirectory, { read: false })
        .pipe(clean({ force: true }));
});

gulp.task("build-style", [ "clean" ], function () {
    return gulp
        .src("src/resources/style/main.less")
        .pipe(less())
        .pipe(rename("browser/style.css"))
        .pipe(gulp.dest(buildDirectory));
});

gulp.task("copy-package-json", [ "clean" ], function () {
    return gulp
        .src("package.json")
        .pipe(gulp.dest(buildDirectory))
});

gulp.task("copy-source", [ "clean" ], function () {
    return gulp
        .src(["src/app/**.js", "src/browser/**.html", "src/*.js"], { base: "./src" })
        .pipe(gulp.dest(buildDirectory));
});

gulp.task("build-source", [ "clean" ], function () {
    return gulp
        .src("src/browser/main.jsx")
        .pipe(gulpWebpack({
            output: {
                filename: "bundle.js"
            },
            resolve: {
                extensions: [ '', '.js', '.jsx' ]
            },
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['react', 'es2015']
                    }
                }]
            },
            plugins: [
                new webpack.ProvidePlugin([
                    'd3',
                    'react'
                ])
            ],
            target: "atom"
        }))
        .pipe(gulp.dest("build/browser/"));
});

gulp.task("copy-vendor", [ "clean" ], function () {
    return gulp
        .src("vendor/**", { base: "./" })
        .pipe(gulp.dest(buildDirectory));
});

gulp.task("copy-node-modules", [ "clean" ], function () {
    return gulp
        .src(gulpNpmFiles(), { base: "./" })
        .pipe(gulp.dest(buildDirectory));
});

gulp.task("run-unit-tests", function () {
    return gulp
        .src("test/**.js", { read: false })
        .pipe(mocha())
});

gulp.task("package", [ "build", "test" ], function () {
    return gulp
        .src(".", { read: false })
        .pipe(shell("npm run package"));
});

gulp.task("dev", [ "build" ], function () {
    return gulp
        .src(".", { read: false })
        .pipe(shell("npm run start"));
});

gulp.task("build", [
    "clean",
    "build-style",
    "copy-source",
    "build-source",
    "copy-vendor",
    "copy-node-modules",
    "copy-package-json"
]);