var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
    gulp.src('resources/react-app-src/main.js')
      .pipe(browserify({transform: 'reactify'}))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('public/react-app-dist'));
});

gulp.task('default',['browserify']);

gulp.task('watch', function() {
    gulp.watch('resources/react-app-src/**/*.*', ['default']);
});