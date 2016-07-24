'use strict';

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
		livereload = require('gulp-livereload'),
    nib = require('nib'),
		browserify = require('browserify'),
		babelify = require('babelify'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer');

gulp.task('stylus-dev', function(){
	gulp.src('web/layout/stylus/app.styl')
	.pipe(stylus({use : nib()}))
	.pipe(gulp.dest('web/layout'))
	.pipe(gulp.dest('web/react'))
	.pipe(livereload({start: true}));
});

gulp.task('w-stylus', function(){
	livereload.listen();
	gulp.watch(['!web/layout/stylus/app.styl','web/layout/stylus/*.styl'], ['stylus-dev']);
});

gulp.task('w-react', function(){
	livereload.listen();
	gulp.watch(['!web/react/js/*.js','web/react/reactFiles/**/*.js'], ['react-dev']);
});

gulp.task('react-dev', function(){
	return browserify('./web/react/reactFiles/main.js')
		.transform("babelify", {presets: ["react"]})
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./web/react/js/'))
		.pipe(livereload({start: true}));
});

gulp.task('react-dev-multibrowser', function(){
	return browserify('./web/react/reactFiles/main.js')
		.transform("babelify", {presets: ["es2015","react"]})
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./web/react/js/'));
});
