var gulp = require('gulp');
var inject = require('gulp-inject');
var mainbowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var order = require('gulp-order');


gulp.task('buildIndex', function () {
    return gulp.src('./app/index.html')
    .pipe(inject(gulp.src(mainbowerFiles(), {read: false}), {name: 'bower', base: 'app/bower_components'}))
    .pipe(gulp.dest('./app'))
    .pipe(inject(gulp.src(mainbowerFiles('**/*.css'), {read: false}), {name: 'bower', base: 'app/bower_components'}))
    .pipe(inject(gulp.src(['./dist/**/*.css', './app/**/*.css', '!./app/bower_components/**/*.css'], {read: false})))
    .pipe(gulp.dest('./app'))
    .pipe(inject(gulp.src(['./app/**/*.js', '!./app/bower_components/**/*.js'], {read: false}, {name: 'custom'})))
    .pipe(gulp.dest('./app'));
});

gulp.task('script', function () {
  var vendors = mainbowerFiles();

  return gulp.src(vendors)
     .pipe(filter('**/*.js'))
     .pipe(order(['**/**/*.js']))
     .pipe(concat('vendors.js'))
     .pipe(gulp.dest('app/main/scripts/'));
})
