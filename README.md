# OAN Gulp tasks
Johan Hermansson's gulp tasks; watch, sass, browserify, svg.

For single build: `gulp`<br>
To watch: `gulp watch`<br>
For production build: `gulp --production`

Requires a config object in your `gulpfile.js`. Example:

```
require('oan-gulp-tasks')({
    js: {
        src: "./src/js/app.js",
        dist: "./dist/js",
        id: "app"
    },
    sass: {
        src: [
            "./src/sass/app.scss"
        ],
        srcFolder: "./src/sass",
        dist: "./dist/css",
        id: "app"
    },
    svg: {
        src: "./src/svg/**/*.svg",
        dist: "./dist"
    },
    rev: {
        src: [
			"./dist/css/app.css",
			"./dist/js/app.js"
		],
		dist: "./dist"
    },
    watch: {
        sass: "./src/sass/**/*.scss"
    }
});
```
