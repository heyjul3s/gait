(function(){
    'use strict';

    var gulp          = require('gulp'),
        plumber       = require('gulp-plumber'),
        sourcemaps    = require('gulp-sourcemaps'),
        pug           = require('gulp-pug'),
        stylus        = require('gulp-stylus'),
        nib           = require('nib'),
        jeet          = require('jeet'),
        rupture       = require('rupture'),
        typographic   = require('typographic'),
        autoprefixer  = require('gulp-autoprefixer');


    var paths = {
        src : {
            pug: 'index.pug',
            stylus: 'styl/**/*.styl'
        },
        dest : {
            html: './',
            css: './dist/'
        }
    };


    gulp.task('pug', function(){
        return gulp.src( paths.src.pug )
            .pipe( plumber() )
            .pipe( pug({
                pretty: true
            }))
            .pipe( gulp.dest( paths.dest.html ) );
    });


    gulp.task('autoprefixer', function(){
        return gulp.src( paths.src.stylus )
            .pipe( plumber() )
            .pipe( autoprefixer([
                'last 2 versions',
                '> 1%',
                'ie 10'
            ]))
            .pipe( gulp.dest(paths.dest.css) );
    });


    gulp.task('stylus', function(){
        return gulp.src( paths.src.stylus )
            .pipe( plumber() )
            .pipe( stylus({

            paths: [
                'node_modules',
                paths.src.stylus
            ],

            use: [
                nib(),
                rupture(),
                jeet()
            ],

            'include css': true

        }))
        .pipe( autoprefixer() )
        .pipe( gulp.dest( paths.dest.css ) );
    });


    gulp.task('watch', function() {
        gulp.watch( paths.src.pug, [
            'pug',
        ]);

        gulp.watch( paths.src.stylus, [
            'stylus',
        ]);
    });


    gulp.task('default', [
        'watch'
    ]);
}());
