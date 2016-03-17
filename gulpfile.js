
var gulp = require('gulp');
var babel = require('gulp-babel');
var rimraf = require('gulp-rimraf');


/**
 * Build library
 */
gulp.task('build', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(babel({
      presets: ['es2015', 'stage-0']
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('clean', function() {
  gulp.src(['lib/*'], { read: false })
    .pipe(rimraf());
});


gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
