var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var validator = require('gulp-html');



gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('serve',['sass'], function() {
    browserSync({
        server: "src"
    });
    
    gulp.watch('src/*.html', ['reload']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    
});

gulp.task('sass',function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 version']
         }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(validator())
        .pipe(gulp.dest('src/html'));
});


gulp.task('default', ['serve']);


//https://www.npmjs.com/package/gulp-html gulp html




    