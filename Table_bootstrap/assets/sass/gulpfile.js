const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");
const cssnano = require("gulp-cssnano");
// hangi scss dosyası, hangi css dosyasına dönüştürülecek
function buildStyles() {
  return src("scss/**/*.scss")
    .pipe(sass())
    .pipe(purgecss({ content: ["*.html"] }))
    .pipe(cssnano())
    .pipe(dest("css"));
}

function watchTask() {
  // index.scss dosyasında bir değişiklik olduğunda, buildStyles fonksiyonunu çalıştır
  watch(["scss/**/*.scss", "*.html"], buildStyles);
}

// default olarak çalıştırılacak fonksiyonlar
exports.default = series(buildStyles, watchTask);
