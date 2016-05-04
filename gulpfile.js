var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    nodemon = require('gulp-nodemon');


gulp.task('nodemon', function() {
    nodemon({
        script: './server.js',
        exec: 'node',
        env: {
            'NODE_ENV': 'development'
        },
        ignore: [
            'node_modules/',
        ],
    })
});

gulp.task('js-main', function() {
    return gulp.src(['public/QueueApp.js', 'public/add-customer/**.js', 'public/customer/**.js'])
        .pipe(uglify({mangle: false}))
        .pipe(concat('core.js'))
        .pipe(gulp.dest('public/'));
});

gulp.task('default', [
    'js-main',
    'nodemon'
]);

//gulp.watch('public/js-customer/**.js', ['js-customer']);
gulp.watch(['public/add-customer/**.js', 'public/customer/**.js', 'public/QueueApp.js'], ['js-main']);
