var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload');

gulp.task('stylus', function() {
	return gulp.src('assets_dev/styles/main.styl')
		.pipe(stylus({
			set: ['compress']
		}))
		.on('error', console.log)
		.pipe(gulp.dest('./assets/styles/'));
});

gulp.task('watch', function() {
	gulp.watch('assets_dev/styles/**/*.styl', ['stylus'])
});

gulp.task('default', ['stylus', 'watch']);

