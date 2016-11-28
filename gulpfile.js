var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    iconfont = require('gulp-iconfont'),
    sourcemaps = require('gulp-sourcemaps'),
    consolidate = require('gulp-consolidate');

gulp.task('sass', function () {
  return gulp.src('assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream({match: '**/*.css'}))
}); 

gulp.task("build:icons", function() {
    return gulp.src(["./assets/icons/*.svg"]) //pass to svg icons
      .pipe(iconfont({
        fontName: "myicons",
        formats: ["ttf", "eot", "woff", "svg"],
        centerHorizontally: true,
        fixedWidth: true,
        normalize: true
      }))
      .on("glyphs", function (glyphs) {

        gulp.src("./assets/icons/util/*.scss") // Template for css files
            .pipe(consolidate("lodash", {
                glyphs: glyphs,
                fontName: "myicons",
                fontPath: "../fonts/"
            }))
            .pipe(gulp.dest("./assets/scss/icons")); //generated scss files with classes
      })
      .pipe(gulp.dest("dist/fonts")); //icon font destination
});

gulp.task('browser-sync', ['sass'], function(){
  browserSync({
    server: {
      baseDir: "./"
    } 
  });
});

gulp.task('default', ['browser-sync'], function() {
 gulp.watch(['assets/scss/**/*.scss', 'sass/**/*.scss'], ['sass']);
 gulp.watch('./**/*.html').on('change', browserSync.reload);
});
