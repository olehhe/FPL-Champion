var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
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
    'server/api/fplGameweeks/gameweekController.js',
    'server/api/fplPlayers/playerController.js',
    'server/api/fplTeams/teamController.js',
    'server/api/users/userController.js'
];

gulp.task('default',['typescripts'], () => {
    nodemon({
        script: 'index.js',
        ext: 'js ts',
        verbose: true,
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
    var env = require('gulp-env');
    var supertest = require('supertest');

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