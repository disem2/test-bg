'use strict';

var gulp = require('gulp');
var order = require("gulp-order");
var plugins = require('gulp-load-plugins')();
var bowerFiles = require('gulp-main-bower-files');
var rigger = require('gulp-rigger');
var sass   = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');

var paths = {
    scripts: 'src/app/**/*.js',
    styles: ['src/app/**/*.scss'],
    index: ['src/index.html'],
    partials: ['./src/app/**/*.html', '!src/app/index.html'],
    dist: 'build'
};
var pipes = {};

pipes.vendorScripts = function () {
    return gulp.src('bower.json')
        .pipe(plugins.order(['angular.js']))
        .pipe(bowerFiles())
        .pipe(gulp.dest(paths.dist + '/libs'));
};
pipes.appScripts = function () {
    return gulp.src(paths.scripts)
        .pipe(ngAnnotate())
        .pipe(plugins.concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
};
pipes.index = function () {
    var orderedVendor = pipes.vendorScripts();
    var appScripts = pipes.appScripts();
    var styles = pipes.sass();

    return gulp.src(paths.index)
        .pipe(gulp.dest(paths.dist))
        .pipe(plugins.inject(orderedVendor, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(appScripts, {relative: true}))
        .pipe(plugins.inject(styles, {relative: true, name: 'styles'}))
        .pipe(gulp.dest(paths.dist));
};
pipes.partials = function () {
    return gulp.src(paths.partials)
        .pipe(rigger())
        .pipe(gulp.dest(paths.dist));
};
pipes.clean = function () {
    return gulp.src(paths.dist, {read: false})
        .pipe(clean());
};
pipes.sass = function () {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(paths.dist));
};

gulp.task('scripts', pipes.appScripts);
gulp.task('build-index', pipes.index);
gulp.task('partials', pipes.partials);
gulp.task('clean', pipes.clean);
gulp.task('sass', pipes.sass);

gulp.task('run', function (cb) {
    runSequence('clean', 'partials', 'sass', 'build-index', 'watch', cb);    
});
gulp.task('watch', function () {
    browserSync({
        port: 3000,
        server: {
            baseDir: paths.dist
        }
    });

    gulp.watch(paths.index, function () {
        return pipes.index()
            .pipe(browserSync.reload({stream: true}));
    });
    gulp.watch(paths.scripts, function () {
        return pipes.appScripts()
            .pipe(browserSync.reload({stream: true}));
    });
    gulp.watch(paths.partials, function () {
        return pipes.partials()
            .pipe(browserSync.reload({stream: true}));
    });
    gulp.watch(paths.styles, function () {
        return pipes.sass()
            .pipe(browserSync.reload({stream: true}));
    });
});