var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');

gulp.task('default', () => {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 9000
        },
        ignore: [
            './node_modules/**'
        ]
    })
    .on('restart', () => {
        console.log('Restarting');
    });
});

gulp.task('test', () => {
    env({
        vars: {
            ENV: 'Test'
        }
    });
    gulp.src('Tests/*.js', { read: false })
        .pipe(gulpMocha({ 
            reporter: 'nyan' 
        }))
});