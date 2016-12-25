module.exports = function( config ) {
	var config = config.js,
	onError    = require('../events/onError'),
	gulp       = require('gulp'),
	gulpIf     = require('gulp-if'),
	del        = require('del'),
	sourcemaps = require('gulp-sourcemaps'),
	rename     = require('gulp-rename'),
	argv       = require('yargs').argv,
	browserify = require('browserify'),
	babelify   = require('babelify'),
	watchify   = require('watchify'),
	uglifyify  = require('uglifyify'),
	hbsfy      = require('hbsfy'),
	source     = require('vinyl-source-stream'),
	seq        = require('run-sequence'),
	notify     = require('gulp-notify');

	var inProduction = !! argv.production,
	bundler;

	var build = function( watch ) {
		bundler = browserify({
			cache        : {},
			packageCache : {},
			entries      : config.src,
			debug        : ! inProduction
		});

		bundler.transform( hbsfy );

		bundler.transform( babelify, { presets: [
			require('babel-preset-es2015'),
			require('babel-preset-es2015-ie'),
			require('babel-preset-stage-0')
		] } );

		if( watch ) {
			bundler.plugin( watchify );
		}

		bundler.transform( uglifyify, { global : true } );

		bundler.on('update', function() {
			seq('browserify:del', 'browserify:bundle');
		});

		return seq('browserify:del', 'browserify:bundle');
	};

	gulp.task('browserify:bundle', function () {
		return bundler
		.transform( babelify )
		.bundle()
		.on( 'error', onError )
		.pipe( source( 'bundle.js' ) )
		.pipe( rename( config.id + '.js' ) )
		.pipe( gulp.dest( config.dist ) )
		.pipe( gulpIf( ! inProduction, notify({ message: 'Browserified!', onLast: true }) ) );
	});

	gulp.task('browserify', function () {
		return build( false );
	});

	gulp.task('browserify:watch', function () {
		return build( true );
	});

	gulp.task('browserify:del', function() {
		return del.sync( config.dist + '/*.js' );
	});
};
