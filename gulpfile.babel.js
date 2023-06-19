import gulp from "gulp";
import gpug from "gulp-pug";
import ws from "gulp-webserver";
import minCSS from "gulp-csso";
// var csso = require('gulp-csso');
import bro from "gulp-bro";
import babelify from "babelify";
import sourcemaps from 'gulp-sourcemaps';
// const sourcemaps = require('gulp-sourcemaps');

// 230619
// import ghPages from "gulp-gh-pages";
var ghPages = require("gulp-gh-pages");
// var clean = require("gulp-clean");

// import ts from "gulp-typescript";
// const tsProject = ts.createProject("tsconfig.json");

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

// 230307추가 : js merge
const concat = require("gulp-concat");

const routes = {
  pug: {
    watch:
      "src/**/*.pug",
    src: [
      "src/*.pug",
      "src/**/*.pug",
    ],
    dest: "build/",
  },
  img: {
    src: "src/img/*",
    dest: "build/img",
  },
  scss: {
    watch:
      "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css",
  },
  js: {
    watch:
      "src/js/**/*.js",
    src: [
      "src/*.js",
      "src/**/*.js",
      "src/**/**/*.js",
    ],
    dest: "build/",
  },
  // typescript: {
  //   watch:
  //     "src/ts/**/*.ts",
  //   src: [
  //     "src/ts/index.ts",
  //     "src/*.ts",
  //     "src/**/*.ts",
  //     "src/**/**/*.ts",
  //   ],
  //   dest: "build/js",
  // },
};

const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

// 230619 clean error 
const clean = () => del(["build/", ".publish"]);

const styles = () => 
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.init({largeFile: true}))

    .pipe(minCSS({
      restructure: false,
      sourceMap: true,
      debug: true
    }))
    .pipe(gulp.dest(routes.scss.dest))

const webserver = () =>
   gulp
    .src("build")
    .pipe(ws({
      port : "7000",
      livereload: true,
      open: true,
    }));

const js = () => 
  gulp
    .src(routes.js.src)
    .pipe(bro({
      transform: [
        babelify.configure({ presets: ["@babel/preset-env"] }),
        [ 'uglifyify', { global: true } ]
      ]
    }))
    .pipe(gulp.dest(routes.js.dest));


//230307추가 : 자바스크립트 파일을 병합
gulp.task('concat', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js')) // main.js로 파일이름을 짓고 병합
    .pipe(gulp.dest('build')); // dist 폴더에 병합한 파일 생성 
});

  // const typescript = () =>
  //   tsProject
  //     .src()
  //     .pipe(tsProject())
  //     .js.pipe(gulp.dest(routes.typescript.dest))
  

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  // gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
};

// 230307추가 : js mergegulp를 실행하면 default 로 concat task를 실행
gulp.task('default', gulp.series('concat'));

// 230619
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

//오류 생략
// const img = () => 
//   gulp.src(routes.img.src)
//   .pipe(image())
//   .pipe(gulp.dest(routes.img.dest));

// 230619 gulp taks 생성
const gh = () => gulp.src("build/**/*").pipe(ghPages())
const prepare = gulp.series([clean]);
const assets = gulp.series([pug, styles, js]); //typescript 생략
const live = gulp.parallel([webserver, watch]); //parallel 두가지 task를 병행할 수 있음

export const build = gulp.series([assets]); //prepare 들어갈 자리
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh]);

// 230619 [deploy 추가, typescript관련 주석처리]
