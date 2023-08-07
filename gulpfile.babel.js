import gulp from "gulp";
import gpug from "gulp-pug";
import ws from "gulp-webserver";
import minCSS from "gulp-csso";
import bro from "gulp-bro";  //js 파일을 하나로 컴파일
import sourcemaps from 'gulp-sourcemaps';
import ghPages from "gulp-gh-pages";
// import babelify from "babelify"; //컴파일하면서 babel;
// import ts from "gulp-typescript";
// import image from "gulp-image";

const uglify = require("gulp-uglify");
const clean = require("gulp-clean");
const concat = require("gulp-concat"); // 230307추가 : js merge
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
// const tsProject = ts.createProject("tsconfig.json");
// const sourcemaps = require('gulp-sourcemaps');

const routes = {
  pug: {
    watch: "src/**/*.pug",
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
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css",
  },
  js: {
    watch: "src/js/**/*.js",
    src: [
      "src/*.js",
      "src/**/*.js",
      "src/**/**/*.js",
    ],
    dest: "build/",
  },
  // typescript: {
  //   watch: "src/ts/**/*.ts",
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
// const clean = () => del(["build/", ".publish"]);

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
      port : "5000",
      livereload: true,
      open: true,
    }));

const js = () => 
  gulp
    .src(routes.js.src)
    .pipe(bro({
      transform: [
        // babelify.configure({ presets: ["@babel/preset-env"] }),
        [ 'uglifyify', { global: true } ]
      ]
    }))
    .pipe(gulp.dest(routes.js.dest));

const img = () => 
  gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest))

// 자바스크립트 파일을 병합
gulp.task('concat', function() {
  return gulp
    .src([
      "src/js/*.js",
      "src/js/**/*.js",
      "src/js/**/**/*.js",
    ])
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest("build/js")
    );
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

// 230619 ghpages deploy
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', gulp.series('concat'));

const gh = () => gulp.src("build/**/*").pipe(ghPages())
const prepare = gulp.series([clean]); //img 생략
const assets = gulp.series([pug, styles, js]); //typescript 생략
const live = gulp.parallel([webserver, watch]); //parallel 두가지 task를 병행할 수 있음

export const build = gulp.series([assets]); //prepare 들어갈 자리
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh]);

exports.default = gulp.series('concat', [dev] );