const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

gulp.task('test', () =>
    gulp.src('tests/*.spec.js')
        .pipe(jasmine({ reporter: new SpecReporter }))
);