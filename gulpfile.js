var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	watch = require('gulp-watch'),
	livereload = require('gulp-livereload');

gulp.task('stylus', function() {
	gulp.src('assets_dev/styles/main.styl')
		.pipe(stylus({
			set: ['compress']
		}))
	.on('error', console.log)
	.pipe(gulp.dest('./assets/styles/'));
})

gulp.task('default', function() {
	
});

gulp.task('watch', function() {
	// var server = livereload();
	gulp.run('stylus');

	watch({glob: 'assets_dev/styles/**/*.styl'}, function() {
		gulp.run('stylus');
	});
});
