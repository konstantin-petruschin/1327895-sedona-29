import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh'

// Styles
const styles = (done) => {
  gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
  done()
}

//HTML

const html = (done) => {
  gulp.src('source/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('build'));
  done()
}

//Scripts

const scripts = (done) => {
gulp.src('source/js/*.js')
  .pipe()
  .pipe(terser())
  .pipe(gulp.dest('build/js'));
done()
}

// Images

const opimizeImages = (done) => {
  gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'));
done()
}

const copyImages = (done) => {
  gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'));
done()
}

// Webp

const createWebp = (done) => {
  gulp.src('source/img/**/*{jpg,png}')
  .pipe(squoosh ({
    webp: {}
  }))
  .pipe(gulp.dest('build/img'));
done()
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}

// Build

export const build = gulp.series(

  copy,
  opimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svgTask,
    sprite,
    createWebp
  ),
);


// Default
export default gulp.series(

  copy,
  copyImages,
  gulp.parallel(
  styles,
  html,
  scripts,
  svg,
  sprite,
  createWebp
  ),
  gulp.series (
  server,
  watcher
  )
);
