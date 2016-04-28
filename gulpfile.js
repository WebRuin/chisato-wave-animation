var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
      port: 6666,
      path: "/"
    }));
});

gulp.task('css', function () {
    var processors = [
        autoprefixer({browsers: ['last 3 version']}),
        mqpacker,
        csswring
    ];
    return gulp.src('./src/css/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist'));
});
