
var gulp = require('gulp');
var babel = require('gulp-babel');
var rimraf = require('gulp-rimraf');
var peg = require('gulp-peg');


/**
 * Build library
 */
gulp.task('build', ['pegjs'], function() {
  return gulp.src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});


gulp.task('pegjs', function() {
  return gulp.src(['src/*.pegjs'])
    .pipe(peg())
    .pipe(gulp.dest('lib'));
});


gulp.task('clean', function() {
  gulp.src(['lib/*'], { read: false })
    .pipe(rimraf());
});


gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
