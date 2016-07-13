'use strict';

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
		gulpBrowser = require('gulp-browser'),
		livereload = require('gulp-livereload'),
    nib = require('nib');

let transforms = [
	{
		transform: "babelify"
	}
]

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

gulp.task('react-dev', function(){
	gulp.src('web/react/reactFiles/main.js')
	.pipe(gulpBrowser.browserify(transforms))
	.pipe(gulp.dest('web/react/js/'))
	.pipe(livereload({start: true}));
});

gulp.task('w-react', function(){
	livereload.listen();
	gulp.watch(['!web/react/js/*.js','web/react/reactFiles/**/*.js'], ['react-dev']);
});
