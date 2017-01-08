var gulp    = require('gulp'),
gutil       = require('gulp-util'),
seq         = require('run-sequence');

module.exports = function( config ) {
	config = config.watch;

    gulp.task('watch', function() {
        seq('svg', 'sass', 'lint:js', 'browserify:watch', 'rev');

        gulp.watch( config.sass, ['sass', 'rev'] );

        gutil.log( gutil.colors.bgGreen('Watching for changes...') );
    });
};
