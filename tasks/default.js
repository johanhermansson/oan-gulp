var gulp  = require('gulp'),
seq       = require('run-sequence');

module.exports = function( config ) {
	gulp.task('default', function() {
		seq( 'svg', 'sass', 'lint:js', 'browserify', 'rev');
	});
};
