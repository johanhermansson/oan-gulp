var config = require('../../gulpconfig.json').rev,
onError    = require('../events/onError'),
gulp       = require('gulp'),
plumber    = require('gulp-plumber'),
rev        = require('gulp-rev');

gulp.task('rev', function() {
	return gulp.src( config.src, { base: config.dist } )
	.pipe( plumber( { errorHandler: onError } ) )
	.pipe( gulp.dest( config.dist ) )
	.pipe( rev() )
	.pipe( gulp.dest( config.dist ) )
	.pipe( rev.manifest() )
	.pipe( gulp.dest( config.dist ) );
});

module.exports = {};
