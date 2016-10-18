var gulp = require('gulp');
var sass = require('gulp-sass');

var srcFile = 'src/scss/app.scss';
var destDir = 'src/';
gulp.task('scss', function () {
  return gulp.src(srcFile)
        .pipe(sass())
        .pipe(gulp.dest(destDir));
});

gulp.task('watch', function () {
  gulp.watch((srcFile), ['scss']);
});
