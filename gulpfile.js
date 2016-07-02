var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    nib = require('nib');

gulp.task('stylus-dev', function(){
	gulp.src('web/stylus/app.styl')
	.pipe(stylus({use : nib()}))
	.pipe(gulp.dest('web/'));
});

gulp.task('w-stylus', function(){
	gulp.watch(['!web/stylus/app.styl','web/stylus/*.styl'], ['stylus-dev']);
});
