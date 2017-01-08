var onError = require('../events/onError'),
gulp        = require('gulp'),
jshint      = require('gulp-jshint'),
stylish     = require('jshint-stylish');

module.exports = function( conf ) {
    if( ! conf || ! conf.js || ! conf.js.lint ) return conf;

    var config = conf.js;

    gulp.task('lint:js', function() {
        return gulp
        .src( config.lint )
        .pipe( jshint() )
        .pipe( jshint.reporter( stylish ) )
        .on('error', onError );
    });

    return conf;
};
