var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
		livereload = require('gulp-livereload'),
    nib = require('nib');

gulp.task('stylus-dev', function(){
	gulp.src('web/stylus/app.styl')
	.pipe(stylus({use : nib()}))
	.pipe(gulp.dest('web/'))
	.pipe(livereload({start: true}));
});

gulp.task('w-stylus', function(){
	livereload.listen();
	gulp.watch(['!web/stylus/app.styl','web/stylus/*.styl'], ['stylus-dev']);
});
