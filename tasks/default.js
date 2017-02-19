var gulp  = require('gulp'),
seq       = require('run-sequence');

module.exports = function( conf ) {

	var sequence = [];

	if( conf.svg ) sequence.push('svg');
	if( conf.sass ) sequence.push('sass-clean');
	if( conf.sass ) sequence.push('sass');
	if( conf.js && conf.js.lint ) sequence.push('lint:js');
	if( conf.js && conf.modernizr ) sequence.push('modernizr');
	if( conf.js ) sequence.push('browserify');
	if( conf.rev && ( conf.js || conf.sass ) ) sequence.push('rev');

	gulp.task('default', function() {
		seq.apply( this, sequence );
	});

	return conf;
};
