var gulp  = require('gulp'),
seq       = require('run-sequence');

gulp.task('default', function() {
	seq( 'svg', 'sass', 'browserify', 'rev');
});

module.exports = {};