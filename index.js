module.exports = function( config ) {
    require('./tasks/browserify')( config );
    require('./tasks/default')( config );
    require('./tasks/rev')( config );
    require('./tasks/sass')( config );
    require('./tasks/svg')( config );
    require('./tasks/watch')( config );
    require('./tasks/lintjs')( config );
};
