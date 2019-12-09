'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const pump = require('pump');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


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

/* Dev index */
gulp.task('dev:index', function() {

  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./public'))
});


/* Prod
======================= */

/* Typescript compilation for prod */
gulp.task('prod:ts', function() {
  return browserify({
      basedir: '.',
      debug: false,
      entries: ['src/ts/index.ts'],
      cache: {},
      packageCache: {}
    })
    .plugin(tsify, {
      target: 'es5'
    })
    .bundle()
    .pipe(source('cookie-monster.js'))
    .pipe(gulp.dest('./dist'));
});

/* Minify JS */
gulp.task('prod:min', function(cb) {
  pump([
      gulp.src('./dist/*.js'),
      uglify(),
      rename({
        suffix: '.min',
      }),
      gulp.dest('./dist')
    ],
    cb
  );
});

/* JS build */
gulp.task('prod:js', gulp.series(
  'prod:ts',
  'prod:min'
));


/* Clean */
gulp.task('prod:clean', function() {

  return del('./dist');
});



/* Clean 
======================= */
gulp.task('clean', function () {

  return del('./public');
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

/* Prod */
gulp.task('build', gulp.series(
  'prod:clean',
  'prod:js'
));
