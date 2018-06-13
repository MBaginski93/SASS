var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var handleError = function(err){
    console.log(err.toString());
    this.emit('end');
}

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('sass', function(){
    return gulp.src('src/scss/main.scss')
        .pipe(plumber({errorHandler: handleError}))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        /*.pipe(autoprefixer({
            browsers: ['> 1%']
        })) */
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream({match: '**/*.css'}))
});
gulp.task('watch', function(){
    gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});
gulp.task('default', function(){
    gulp.start(['browser-sync', 'sass', 'watch']);
});
