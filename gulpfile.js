var elixir = require('laravel-elixir');
var codecept = require('gulp-codeception');
var gulp = require('gulp');
var watch = require('gulp-watch');
var _ = require('underscore');
var config = require('laravel-elixir').config;
var minimist = require('minimist');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */
elixir(function (mix) {
    mix.less('app.less').coffee();
});

elixir(function (mix) {
    mix.phpUnit();
});

elixir(function (mix) {
    mix.scripts();
});

elixir(function (mix) {
    mix.styles();
});

/*
 |----------------------------------------------------------------
 | Automated Testing
 |----------------------------------------------------------------
 |
 | This task will setup a watcher to run your automated tests on
 | every file change you make. You will get notified of the
 | result of the test suite each time tests are executed.
 |
 */

gulp.task('codecept:unit', function () {
    var options = {testSuite: 'unit', debug: true, flags: '--report --colors'};
    gulp.src('./tests/unit/*.php').pipe(codecept('./vendor/bin/codecept', options));
});
gulp.task('codecept:functional', function () {
    var options = {testSuite: 'functional', debug: true, flags: '--report --colors'};
    gulp.src('./tests/functional/*.php').pipe(codecept('./vendor/bin/codecept', options));
});
gulp.task('codecept:acceptance', function () {
    var options = {testSuite: 'acceptance', debug: true, flags: '--report --colors'};
    gulp.src('./tests/acceptance/*.php').pipe(codecept('./vendor/bin/codecept', options));
});

gulp.task('cc:unit', function () {
    gulp.watch('./tests/unit/*.php', ['codecept:unit']);
});

gulp.task('cc:functional', function () {
    gulp.watch('./tests/functional/*.php', ['codecept:functional']);
});

gulp.task('cc:acceptance', function () {
    gulp.watch('./tests/acceptance/*.php', ['codecept:acceptance']);
});

