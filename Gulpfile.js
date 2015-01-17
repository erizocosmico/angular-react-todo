'use strict';

var gulp = require('gulp'),
    react = require('gulp-react'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    esnext = require('gulp-esnext'),
    vendorPaths = [
        'angular/angular.min.js',
        'react/react.min.js'
    ];

gulp.task('js', function () {
    gulp.src('src/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(esnext())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('react', function () {
    gulp.src('src/**/*.jsx')
        .pipe(react())
        .pipe(concat('views.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('index', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('less', function () {
    gulp.src('src/**/*.less')
        .pipe(less())
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('vendor', function () {
    gulp.src(vendorPaths.map(function (path) {
        return 'vendor/' + path;
    }))
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.less', ['less']);
    gulp.watch('src/**/*.jsx', ['react']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/index.html', ['index']);
});

gulp.task('default', ['js', 'react', 'less', 'index', 'vendor']);