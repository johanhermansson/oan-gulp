var gulp = require('gulp'),
fs = require('fs'),
critical = require('critical');

module.exports = function( conf ) {
    if( ! conf || ! conf.critical ) return conf;

    var config = conf.critical;

    if( config.urls && typeof config.urls === 'string' ) {
        config.urls = [config.urls];
    }

    if( ! fs.existsSync( config.dist ) ) fs.mkdirSync( config.dist, '0755' );

    gulp.task('critical', function() {
        if( config.urls.length ) {
            for( var i = 0; i < config.urls.length; i++ ) {
                var url = config.urlFilter ? config.urlFilter( config.urls[ i ], i ) : config.urls[ i ],
                filename = config.filenameFilter ? config.filenameFilter( config.urls[ i ], i ) : config.urls[ i ].replace(/https?:\/\/[^\/]+/i, '').replace(/\//g, '__');

                critical.generate({
                    src: url,
                    css: config.src,
                    dest: config.dist + '/' + filename + '.css',
                    minify: true,
                    dimensions: config.dimensions ? config.dimensions : null
                });
            }
        }
    });

    return conf;
};
