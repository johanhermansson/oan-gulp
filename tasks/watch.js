var gulp    = require('gulp'),
gutil       = require('gulp-util'),
seq         = require('run-sequence');

module.exports = function( conf ) {
	if( ! conf || ! conf.watch ) return conf;

	var config = conf.watch,

	sequenceOnce = [],
	sequenceWatch = [];

	if( conf.svg ) sequenceOnce.push('svg');

	if( conf.sass ) {
		sequenceOnce.push('sass-clean');
		sequenceWatch.push('sass-clean');

		sequenceOnce.push('sass');
		sequenceWatch.push('sass');
	}

	if( conf.js && conf.js.lint ) sequenceOnce.push('lint:js');
	if( conf.js && conf.modernizr ) sequenceOnce.push('modernizr');
	if( conf.js ) sequenceOnce.push('browserify:watch');

	if( conf.rev && ( conf.sass || conf.js ) ) {
		sequenceOnce.push('rev');
		sequenceWatch.push('rev');
	}

    gulp.task('watch', function() {
        seq.apply( this, sequenceOnce );

        gulp.watch( config.sass, function() {
			seq.apply( this, sequenceWatch );
		});

        gutil.log( gutil.colors.bgGreen('Watching for changes...') );
    });

	return conf;
};
