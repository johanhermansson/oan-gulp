var gulp  = require('gulp'),
modernizr = require('gulp-modernizr');

module.exports = function( conf ) {
    if( ! conf || ! conf.modernizr || ! conf.js ) return conf;

    var config = conf.modernizr;

    config.excludeTests = config.excludeTests || [];
    config.includeTests = config.includeTests || [];

    gulp.task('modernizr', function() {
        return gulp.src( config.src )
        .pipe( modernizr({
            excludeTests: config.excludeTests,
            includeTests: config.includeTests
        }) )
        .pipe( gulp.dest( conf.js.dist ) );
    });

    return conf;
};
