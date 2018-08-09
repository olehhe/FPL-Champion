var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');
var ts = require('gulp-typescript');

// pull in the project Typescript config
var tsProject = ts.createProject('tsc.config.json');
gulp.task('typescripts', () =>
{
    var tsResult = tsProject.src()
        .pipe(tsProject());
        return tsResult.js.pipe(
            gulp.dest(function(file) {
                return file.base; 
            })
        );
});

const ignoreTsGeneratedJsFiles = [
    'Controllers/**.js',
    'Interfaces/**.js',
    'Models/teamModel.js',
    'Routes/teamRoutes.js'
];

gulp.task('default',['typescripts'], () => {
    nodemon({
        script: 'app.js',
        ext: 'js ts',
        verbose: true,
        env: {
            PORT: 9000
        },
        ignore: [
            './node_modules/**',
            ignoreTsGeneratedJsFiles
        ]
    })
    .on('restart',['typescripts'], () => {
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