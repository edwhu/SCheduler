// include gulp and plugins
var gulp = require('gulp');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./public/scripts/bundle.js'])
    .pipe(concat('bundle.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./public/scripts/'));
});



gulp.task('browserify', function() {
  browserify({
      entries: ['./public/scripts/form.js'],
      transform: ['reactify'],
      debug: true
    })
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./public/scripts'));
});

gulp.task('build', ['browserify','scripts']);
