# OAN Gulp tasks
Johan Hermansson's gulp tasks; watch, sass, browserify, svg, modernizr, lint:js.

For single build: `gulp`<br>
To watch: `gulp watch`<br>
For production build: `gulp --production`

Requires a config object in your `gulpfile.js`. Example:

```
require('oan-gulp-tasks')({
    js: {
        src: './src/js/app.js',
        dist: './dist/js',
        id: 'app',
        lint: './src/js/**/*.js'
    },
    sass: {
        src: [
            './src/sass/app.scss'
        ],
        srcFolder: './src/sass',
        dist: './dist/css'
    },
    svg: {
        src: './src/svg/**/*.svg',
        dist: './dist'
    },
    rev: {
        src: [
            './dist/css/app.css',
            './dist/js/app.js'
        ],
        dist: './dist'
    },
    watch: {
        sass: './src/sass/**/*.scss'
    },
    modernizr: {
        src: './src/js/**/*.js',
        includeTests: []
    },
    critical: {
        dimensions: [
            { width: 375, height: 667 },
            { width: 1024, height: 768 }
        ],
        src: './dist/css/app.css',
        dist: './dist/css/critical',
        urls: [
            'http://example.com/'
        ],
        urlFilter: function( url, i ) {
            // Optional. Use to change url
            return url;
        },                  
        filenameFilter: function( url, i ) {
            // Optional. Use to change filename
            return url;
        }
    }
});
```
