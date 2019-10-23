'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');

// const uglify = require('gulp-uglify');
// const cleanCSS = require('gulp-clean-css');
// const rename = require('gulp-rename');


/* Dev
==================== */

/* TypeScript */
gulp.task('dev:ts', function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/ts/index.ts'],
    cache: {},
    packageCache: {}
  })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});


/* Clean 
======================= */
gulp.task('clean', function () {

  return del('./public');
});


/* Dev index 
=========================*/
gulp.task('dev:index', function () {

  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'))
});


/* Browser sync 
============================== */
gulp.task('sync', function () {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });

  browserSync.watch('./public/js/*.js').on('change', browserSync.reload);
  browserSync.watch('./public/*.html').on('change', browserSync.reload);
});


/* Watch
===================== */

/* Watch */
gulp.task('watch', function () {
  gulp.watch('./src/ts/**/*.ts', gulp.series('dev:ts')); // watch ts files
  gulp.watch('./src/*.html', gulp.series('dev:index')); // watch html files
});


/* Build 
======================*/

/* Dev build*/
gulp.task('dev:build', gulp.series(
  'clean',
  gulp.parallel('dev:ts', 'dev:index')
));

/* Dev  build + watch */
gulp.task('dev', gulp.series(
  'dev:build',
  gulp.parallel('watch', 'sync')
));
