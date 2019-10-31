const gulp = require('gulp');
const { series } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))

})

gulp.task('scripts', function () {
    return gulp.src('./src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js/'))
});

gulp.task('watch', function() {
    gulp.watch('./src/js/*.js', gulp.series('scripts'));
    gulp.watch('./src/sass/*.scss', gulp.series('sass'));
});
