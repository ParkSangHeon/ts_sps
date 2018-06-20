const gulp = require("gulp");
const through = require('through2');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const clean = require('gulp-clean');

gulp.task('build', () => {
    return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('dist'));
});

gulp.task('static-copy', () => {
    return gulp.src(['src/public/**/*', 'src/views/**/*'], {
        base: 'src'
    })
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return gulp.src(['dist/**/*'], {read: false})
    .pipe(clean({force: true}));
});