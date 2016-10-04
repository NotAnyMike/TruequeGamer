'use strict';

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
		livereload = require('gulp-livereload'),
    nib = require('nib'),
		browserify = require('browserify'),
		babelify = require('babelify'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
		webpackStream = require('webpack-stream'),
		envify = require('envify/custom'),
		cleanCSS = require('gulp-clean-css'),
		rename = require('gulp-rename'),
		imagemin = require('gulp-imagemin');

gulp.task('stylus-dev', function(){
	gulp.src('web/layout/stylus/app.styl')
	.pipe(stylus({'include css': true, use : nib()}))
	.pipe(gulp.dest('web/layout'))
	.pipe(gulp.dest('web/react'));
});

gulp.task('stylus-dev-w', function(){
	gulp.src('web/layout/stylus/app.styl')
	.pipe(stylus({'include css': true, use : nib()}))
	.pipe(gulp.dest('web/layout'))
	.pipe(gulp.dest('web/react'))
	.pipe(livereload({start: true}));
});

gulp.task('w-stylus', function(){
	livereload.listen();
	gulp.watch(['!web/layout/stylus/app.styl','web/layout/stylus/*.styl'], ['stylus-dev-w']);
});

gulp.task('w-react', function(){
	livereload.listen();
	gulp.watch(['!web/react/js/*.js','web/react/reactFiles/**/*.js'], ['react-dev']);
});

gulp.task('w-react-django', function(){
	livereload.listen();
	gulp.watch(['!web/react/js/*.js','web/react/reactFiles/**/*.js'], ['react-prod-django']);
});

gulp.task('react-dev', function(){
	return browserify('./web/react/reactFiles/main.js')
		.transform("babelify", {presets: ["react"]})
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./web/react/js/'))
		.pipe(livereload({start: true}));
});

gulp.task('react-dev-es6', function(){
	return browserify('./web/react/reactFiles/main.js')
		.transform(envify({NODE_ENV: 'development'}))
		.transform("babelify", {presets: ["es2015","react"]})
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./web/react/js/'));
});

gulp.task('react-prod-django', ['apply-prod-environment'], function(){
	return browserify('./web/react/reactFiles/main.js')
		.transform(envify({NODE_ENV: 'production'}))
		.transform("babelify", {presets: ["react"]})
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./web/django/truequegamer/games/static/games/js/'))
});

gulp.task('react-prod-es6', ['apply-prod-environment'], function(){
	return browserify('./web/react/reactFiles/main.js')
		.transform(envify({NODE_ENV: 'production'}))
		.transform("babelify", {presets: ["es2015","react"]})
		.bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest('./web/django/truequegamer/games/static/games/js/'))
		.pipe(gulp.dest('./web/react/js/'));
});

var buildDist = function(opts){
	var webpackOpts = {
		debug: opts.debug,
		externals: {
			react: 'React',
			'react-dom': 'ReactDOM',
		},
		output: {
			filename: opts.output,
		},
		plugins: [
			new webpackStream.webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(
					opts.debug ? 'development' : 'production'
				)},
			}),
			new webpackStream.webpack.optimize.DedupePlugin(),
		],
	};
	if(!opts.debug){
		webpackOpts.plugins.push(
			new webpackStream.webpack.optimize.UglifyJsPlugin({
				compress: {
					hoist_vars: true,
					screw_ie8: true,
					warnings: false,
				},
			})
		);
	}
	return webpackStream(webpackOpts);
};

gulp.task('react-prod', ['react-prod-es6'], function(){
	var opts = {
		debug: false,
		output: 'main.min.js'
	}
	return gulp.src('./web/react/js/main.js')
		.pipe(buildDist(opts))
		.pipe(gulp.dest('web/react/js'))
		.pipe(gulp.dest('web/django/truequegamer/games/static/games/js/'))
		.pipe(gulp.dest('web/public/js'));
});

gulp.task('apply-prod-environment', function() {
	return process.env.NODE_ENV = 'production';
});

gulp.task('css-prod', ['stylus-dev'], function(){
	return gulp.src('web/react/app.css')
		.pipe(cleanCSS({advanced: false}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('web/react'))
		.pipe(gulp.dest('web/django/truequegamer/games/static/games'))
		.pipe(gulp.dest('web/public'));
});

gulp.task('img', function(){
	return gulp.src('web/react/img/**')
		.pipe(imagemin())
		.pipe(gulp.dest('web/public/img'));
});
