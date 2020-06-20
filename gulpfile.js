const gulp=require('gulp');
const scss=require('gulp-sass');
const rename=require('gulp-rename');
const minfyCss=require('gulp-clean-css');
const connect=require('gulp-connect');
const htmlmin=require('gulp-htmlmin');
const uglify=require('gulp-uglify');
const notify=require('gulp-notify');
const plumber=require('gulp-plumber');
const imagemin=require('gulp-imagemin');
const util=require('gulp-util');

gulp.task("script",function(){
    gulp.src("js/index.js")
    .pipe(uglify())
    .on('error',function(err){
        util.log(util.colors.red('[Error]'),err.toString());
    })
    .pipe("dist/js")
});

gulp.task("htmlminTask",function(){
    return gulp.src("*.html")
    .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')})) 
    .pipe(htmlmin())
    .pipe(gulp.dest("dist/"))
});

gulp.task("imgminTask",function(){
    let options={
        optimizationLevel:5, 
        progressive:false, 
        mutipass:false  
    }
    return gulp.src("images/**/*")
    .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
    .pipe(imagemin(options))
    .pipe(gulp.dest("dist/images"))
});

gulp.task("copycssTask",function(){
    return gulp.src(["css/common.css","css/swiper.min.css","css/iconfont.*"])
    .pipe(minfyCss())   
    .pipe(gulp.dest("dist/css"))
});

gulp.task("jsminTask",function(){
    return gulp.src("js/index.js")
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest("dist/js"))
});

gulp.task("watch",function(){
    gulp.watch("*.html",['htmlminTask']);
    gulp.watch(["css/common.css","css/swiper.min.css","css/iconfont.*"],["copycssTask"]);
    gulp.watch("img/**/*",["imgminTask"]);
    gulp.watch("css/*.scss",["scssTask"]);
    gulp.watch("js/index.js",["jsminTask"]);
});
gulp.task("scssTask",function(){
    return gulp.src("css/*.scss")
    .pipe(scss())   
    .pipe(gulp.dest("dist/css"))
    .pipe(minfyCss())
    .pipe(rename({suffix:'.min'})) 
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())   
});

gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:5050,
        livereload:true
    })
});

gulp.task("default",["watch","server"]);

