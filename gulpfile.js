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
    mix.scripts()
        .scripts(['../../public/bower_components/underscore/underscore-min.js',
            '../../public/bower_components/underscore.string/dist/underscore.string.min.js',
            '../../public/bower_components/jquery/dist/jquery.min.js',
            '../../public/bower_components/backbone/backbone.js',
            '../../public/bower_components/backbone.marionette/lib/backbone.marionette.min.js',
            '../../public/bower_components/handlebars/handlebars.min.js',
            '../../public/bower_components/marionette.state/dist/marionette.state.js',
            '../../public/bower_components/bootstrap/dist/js/bootstrap.min.js',
            '../../public/bower_components/BttrLazyLoading/dist/jquery.bttrlazyloading.min.js',
            '../../public/js/frontend/primages.js',
            '../../public/bower_components/tooltipster/js/jquery.tooltipster.min.js',
            '../../public/bower_components/jquery-easing/jquery.easing.min.js',
            '../../public/bower_components/jquery-touchswipe/jquery.touchSwipe.min.js',
            '../../public/bower_components/liquidslider/js/jquery.liquid-slider.min.js',
            '../../public/bower_components/spritespin/release/spritespin.js',
            '../../public/bower_components/autoNumeric/autoNumeric.js',
            '../../public/bower_components/fancybox/source/jquery.fancybox.js',
            '../../public/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
            '../../public/bower_components/lazyloadxt/dist/jquery.lazyloadxt.js',
            '../../public/bower_components/jquery.panzoom/dist/jquery.panzoom.min.js',
            '../../public/bower_components/ionrangeslider/js/ion.rangeSlider.min.js',
            '../../public/bower_components/bootstrap-toggle/js/bootstrap-toggle.min.js',
            '../../public/js/frontend/jquery.fadeloader.js',
            '../../public/js/jquery.flexisel.js',
            '../../public/js/jquery.resize.js',
            '../../public/bower_components/jquery-bridget/jquery.bridget.js',
            '../../public/bower_components/jquery-mousewheel/jquery.mousewheel.js',
            '../../public/bower_components/jquery-magnificent/src/js/mag.js',
            '../../public/bower_components/jquery-magnificent/src/js/mag-control.js',
            '../../public/bower_components/jquery-magnificent/src/js/mag-jquery.js',
            ], 'public/js/production/plugins.min.js')
        .scripts(['../../public/js/frontend/entities/project.entity.js',
        '../../public/js/frontend/entities/bunglow.variant.js',
        '../../public/js/frontend/entities/settings.entity.js',
        '../../public/js/frontend/entities/unit.entity.js',
        '../../public/js/frontend/entities/unitType.entity.js',
        '../../public/js/frontend/entities/building.entity.js',
        '../../public/js/frontend/entities/apartment.variant.entity.js',
        '../../public/js/frontend/entities/floor.layout.entity.js',
        '../../public/js/frontend/entities/plot.variant.entity.js',
        '../../public/js/frontend/common/common.js',
        '../../public/js/frontend/project/project.controller.js',
        '../../public/js/frontend/project-master-view/project.master.controller.js',
        '../../public/js/frontend/project-master-view/project.master.filter.controller.js',
        '../../public/js/frontend/unit-view/unit.controller.js',
        '../../public/js/frontend/project-list-view/project.list.controller.js',
        '../../public/js/frontend/project-list-view/building.list.controller.js',
        '../../public/js/frontend/project-list-view/villa.list.controller.js',
        '../../public/js/frontend/building-step3/apartments.list.controller.js',
        '../../public/js/frontend/building-step3/apartments.master.controller.js',
        '../../public/js/frontend/building-step3/apartment.filter.controller.js',
        '../../public/js/frontend/master-list-bunglows/master.list.bunglows.controller.js',
        '../../public/js/frontend/master-list-buildings/master.list.buildings.controller.js',
        '../../public/js/frontend/master-list-plots/master.list.plots.controller.js',
        '../../public/js/frontend/project-list-view/plot.list.controller.js',
        '../../public/js/frontend/router.js',
        '../../public/js/frontend/application.js',
            ], 'public/js/production/application.min.js')
        .scripts(['../../public/bower_components/underscore/underscore-min.js',
        '../../public/bower_components/underscore.string/dist/underscore.string.min.js',
        '../../public/bower_components/jquery/dist/jquery.min.js',
        '../../public/bower_components/backbone/backbone.js',
        '../../public/bower_components/backbone.marionette/lib/backbone.marionette.min.js',
        '../../public/bower_components/handlebars/handlebars.min.js',
        '../../public/bower_components/bootstrap/dist/js/bootstrap.min.js',
        '../../public/bower_components/svg.js/dist/svg.min.js',
        '../../public/bower_components/jquery.panzoom/dist/jquery.panzoom.min.js',
        '../../public/bower_components/bootstrap/dist/js/bootstrap.min.js',
        '../../public/bower_components/marionette.state/dist/marionette.state.js',
        '../../public/bower_components/tooltipster/js/jquery.tooltipster.min.js',
        
        '../../public/js/svg.parser.min.js',
        '../../public/js/svg.import.min.js',
        '../../public/js/svg.export.min.js',
        '../../public/js/svg.draggable.min.js',
        '../../public/js/svg.absorb.min.js',
        '../../public/js/jquery.canvasAreaDraw.min.js',
        '../../public/js/frontend/app.js',
            ], 'public/js/production/authoringtool.plugins.min.js')
        .scripts(['../../public/bower_components/underscore/underscore-min.js',
        '../../public/bower_components/underscore.string/dist/underscore.string.min.js',
        '../../public/bower_components/jquery/dist/jquery.min.js',
        '../../public/bower_components/backbone/backbone.js',
        '../../public/bower_components/backbone.marionette/lib/backbone.marionette.min.js',
        '../../public/bower_components/handlebars/handlebars.min.js',
        '../../public/bower_components/bootstrap/dist/js/bootstrap.min.js',
        '../../public/bower_components/svg.js/dist/svg.min.js',
        '../../public/bower_components/jquery.panzoom/dist/jquery.panzoom.min.js',
        '../../public/bower_components/bootstrap/dist/js/bootstrap.min.js',
        '../../public/bower_components/marionette.state/dist/marionette.state.js',
        '../../public/bower_components/tooltipster/js/jquery.tooltipster.min.js',
        
        '../../public/js/svg.parser.min.js',
        '../../public/js/svg.import.min.js',
        '../../public/js/svg.export.min.js',
        '../../public/js/svg.draggable.min.js',
        '../../public/js/svg.absorb.min.js',
        '../../public/js/jquery.canvasAreaDraw.min.js',
        '../../public/js/frontend/app.js',
            ], 'public/js/production/authoringtool.plugins.min.js')
        .scripts(['../../public/js/authoring-tool/common.js',
        '../../public/js/frontend/entities/project.entity.js',
        '../../public/js/frontend/entities/bunglow.variant.js',
        '../../public/js/frontend/entities/settings.entity.js',
        '../../public/js/frontend/entities/unit.entity.js',
        '../../public/js/frontend/entities/unitType.entity.js',
        '../../public/js/frontend/entities/building.entity.js',
        '../../public/js/frontend/entities/apartment.variant.entity.js',
        '../../public/js/frontend/entities/floor.layout.entity.js',
        '../../public/js/frontend/entities/plot.variant.entity.js',
        '../../public/js/authoring-tool/entities/polygon.entity.js',
        '../../public/js/authoring-tool/entities/marker.entity.js',
        '../../public/js/authoring-tool/entities/villa.entity.js',
        '../../public/js/authoring-tool/entities/plot.entity.js',
        '../../public/js/authoring-tool/entities/amenity.entity.js',
        '../../public/js/authoring-tool/entities/apartment.entity.js',     
        '../../public/js/authoring-tool/entities/building.entity.js',
        '../../public/js/authoring-tool/entities/project.entity.js',
        '../../public/js/authoring-tool/svg.authoring.controller.js',
        '../../public/js/authoring-tool/application.js',
            ], 'public/js/production/authoringtool.application.min.js')
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

gulp.task('codecept:integration', function () {
    var options = {testSuite: 'integration', debug: true, flags: '--report --colors'};
    gulp.src('./tests/integration/*.php').pipe(codecept('./vendor/bin/codecept', options));
});

gulp.task('cc:unit', function () {
    gulp.watch('./tests/unit/*.php', ['codecept:unit']);
});

gulp.task('cc:functional', function () {
    gulp.watch('./tests/functional/*.php', ['codecept:functional']);
});

gulp.task('cc:integration', function () {
    gulp.watch('./tests/integration/*.php', ['codecept:integration']);
});

gulp.task('cc:acceptance', function () {
    gulp.watch('./tests/acceptance/*.php', ['codecept:acceptance']);
});

