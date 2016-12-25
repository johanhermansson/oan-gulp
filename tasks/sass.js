module.exports = function( config ) {
	var config = config.sass,
    onError      = require('../events/onError'),
    gulp         = require('gulp'),
    gulpIf       = require('gulp-if'),
    notify       = require('gulp-notify'),
    argv         = require('yargs').argv,
    rename       = require('gulp-rename'),
    plumber      = require('gulp-plumber'),

    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano      = require('cssnano'),
    mqpacker     = require('css-mqpacker'),
    sourcemaps   = require('gulp-sourcemaps');

    var inProduction = !! argv.production;

    gulp.task('sass', function() {
        return gulp.src( config.src )
        .pipe( plumber({ errorHandler: onError }) )
        // sourcemaps + sass + error handling
        .pipe( gulpIf( ! inProduction, sourcemaps.init()) )
        .pipe( sass() )
        .on('error', onError )
        // postcss
        .pipe( postcss([
            autoprefixer({ browsers: 'last 2 versions, ie 9, ie 10' }),
            mqpacker,
            cssnano()
        ]) )
        // we don't serve the source files
        // so include scss content inside the sourcemaps
        .pipe( gulpIf( ! inProduction, sourcemaps.write('.', {
            sourceRoot: config.srcFolder
        }) ) )
        .pipe( rename( config.id + '.css' ) )
        // write sourcemaps to a specific directory
        // give it a file and save
        .pipe( gulp.dest( config.dist ) )
        .pipe( gulpIf( ! inProduction, notify({ message: 'Sassy!', onLast: true }) ) );
    });
};
