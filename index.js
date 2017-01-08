module.exports = function( config ) {
    config = require('./tasks/svg')( config );
    config = require('./tasks/sass')( config );
    config = require('./tasks/lintjs')( config );
    config = require('./tasks/modernizr')( config );
    config = require('./tasks/browserify')( config );
    config = require('./tasks/rev')( config );
    config = require('./tasks/default')( config );
    config = require('./tasks/watch')( config );

    return config;
};
