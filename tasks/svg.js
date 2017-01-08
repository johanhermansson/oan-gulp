var onError = require('../events/onError'),
gulp        = require('gulp'),
gulpIf      = require('gulp-if'),
notify      = require('gulp-notify'),
plumber     = require('gulp-plumber'),
argv        = require('yargs').argv,
svgSprite   = require('gulp-svg-sprite');

module.exports = function( conf ) {
	if( ! conf || ! conf.svg ) return conf;

	var config = conf.svg,
	inProduction = !! argv.production;

	gulp.task('svg', function() {
	    return gulp.src( config.src )
	    .pipe( plumber({ errorHandler: onError }) )
	  	.pipe( svgSprite({
	  		dest: 'svg',
	  		id: 'svg',
	  		svg: {
	  			namespaceClassnames: false
	  		},
	  		mode: {
	  			defs: {
	  				dest: '',
	  				inline: true,
	  				example: ! inProduction
	  			},
				stack: {
					dest: 'svg',
					sprite: 'sprite.stack.svg',
					dimension: {
						maxWidth: 100,
						maxHeight: 100
					},
					render: {
						css: true
					}
				}
	  		}
	  	}))
	    .on( 'error', onError )
	  	.pipe( gulp.dest( config.dist ) )
	    .pipe( gulpIf( ! inProduction, notify({ message: 'SVG!', onLast: true }) ) );
	});

	return conf;
};
