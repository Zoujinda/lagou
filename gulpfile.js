const gulp = require('gulp');
const scss = require('gulp-sass');
const rename = require('gulp-rename');
const minfyCss = require('gulp-clean-css');
const connect = require('gulp-connect');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
// const concat = require('gulp-concat');

gulp.task("htmlminTask", function () {
  return gulp.src("*.html")
    .pipe(plumber({
      errorHandler: notify.onError('Error:<%=error.message%>')
    }))
    .pipe(htmlmin())
    .pipe(gulp.dest("dist/"))
});

gulp.task("jsonTask", function () {
  return gulp.src("json/*.json")
    .pipe(plumber({
      errorHandler: notify.onError('Error:<%=error.message%>')
    }))
    .pipe(gulp.dest("dist/json"))
});

gulp.task("imgminTask", function () {
  let options = {
    optimizationLevel: 5,
    progressive: false,
    mutipass: false
  }
  return gulp.src("images/**/*")
    .pipe(plumber({
      errorHandler: notify.onError('Error:<%=error.message%>')
    }))
    .pipe(imagemin(options))
    .pipe(gulp.dest("dist/images"))
});

gulp.task("copycssTask1", function () {
  return gulp.src(["css/swiper.min.css", "css/iconfont.*"])
    .pipe(minfyCss())
    .pipe(gulp.dest("dist/css"))
});

gulp.task("copycssTask2", function () {
  return gulp.src(["css/common.css"])
    .pipe(minfyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest("dist/css"))
});

gulp.task("jsminTask", function () {
  return gulp.src(["js/index.js", "js/jquery-3.4.0.js"])
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
});

gulp.task("copyjsTask", function () {
  return gulp.src(["js/swiper.min.js"])
    .pipe(gulp.dest("dist/js"))
});

gulp.task("watch", function () {
  gulp.watch("*.html", ['htmlminTask']);
  gulp.watch(["css/common.css"], ["copycssTask2"]);
  gulp.watch(["css/swiper.min.css", "css/iconfont.*"], ["copycssTask1"]);
  gulp.watch("img/**/*", ["imgminTask"]);
  gulp.watch("css/*.scss", ["scssTask"]);
  gulp.watch("js/*.js", ["jsminTask"]);
  gulp.watch("json/*.json", ['jsonTask']);
});
gulp.task("scssTask", function () {
  return gulp.src("css/*.scss")
    .pipe(scss())
    .pipe(minfyCss())
    .pipe(rev())
    .pipe(gulp.dest("dist/css"))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev'))
    .pipe(connect.reload())
});
// gulp.task("concat", function () {
//   return gulp.src("css/*.css")
//     .pipe(minfyCss())
//     .pipe(rev())
//     .pipe(gulp.dest("dist/css"))
//     .pipe(rev.manifest())
//     .pipe(gulp.dest('dist/rev'))
// });

gulp.task('rev', function () {
  return gulp.src(['dist/rev/*.json', 'dist/*.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task("server", function () {
  connect.server({
    root: "dist",
    port: 5050,
    livereload: true
  })
});

gulp.task("default", ["watch", "server"]);