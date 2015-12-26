var clean = require("gulp-clean"),
    gnf = require("gulp-npm-files"),
    gulp = require("gulp"),
    less = require("gulp-less"),
    rename = require("gulp-rename")
    shell = require("gulp-shell");

var buildDirectory = "build";

gulp.task("clean", [
    "clean-app",
    "clean-build"
]);

gulp.task("clean-app", function () {
    return gulp
        .src("bin/Ent*", { read: false })
        .pipe(clean());
});

gulp.task("clean-build", function () {
    return gulp
        .src(buildDirectory, { read: false })
        .pipe(clean());
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
        .src(["src/app/**.js", "src/browser/**.*", "src/*.js"], { base: "./src" })
        .pipe(gulp.dest(buildDirectory));
});

gulp.task("copy-vendor", [ "clean" ], function () {
    return gulp
        .src("vendor/**", { base: "./" })
        .pipe(gulp.dest(buildDirectory));
})

gulp.task("copy-node-modules", [ "clean" ], function () {
    return gulp
        .src(gnf(), { base: "./" })
        .pipe(gulp.dest(buildDirectory));
});

gulp.task("package", [ "build" ], function () {
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
    "copy-vendor",
    "copy-node-modules",
    "copy-package-json"
]);