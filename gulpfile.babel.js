import gulp from 'gulp'
import {spawn} from 'child_process'
import hugoBin from 'hugo-bin'
import postcss from 'gulp-postcss'
import cssImport from 'postcss-import'
import cssnext from 'postcss-cssnext'
import purgecss from 'gulp-purgecss'
import cleanCSS from 'gulp-clean-css';
import inlineCss from 'gulp-inline-css'
import sass from 'gulp-sass'
import revall from 'gulp-rev-all'
import del from 'del'

import BrowserSync from 'browser-sync'
import webpack from 'webpack'
import webpackConfig from './webpack.conf'

const browserSync = BrowserSync.create()

// Hugo arguments
const hugoArgsDefault = ['-d', '../public', '-s', 'site', '-v']

// Development tasks
gulp.task('hugo', (cb) => buildSite(cb))

// Compile CSS with PostCSS
gulp.task('css', function buildCss () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([cssImport({from: './src/css/main.css'}), cssnext()]))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
})

//purgecss
gulp.task('purgecss', () => {
    return gulp.src('./public/css/**/*.css')
        .pipe(purgecss({
            content: ['./public/**/*.html']
        }))
        .pipe(gulp.dest('./public/css'))
})

//minifycss
gulp.task('minify-css', () => {
  return gulp.src('./public/css/*.css')
    .pipe(cleanCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
  .pipe(gulp.dest('./public/css'));
});

// Compile Javascript
gulp.task('js', (cb) => {
  const myConfig = Object.assign({}, webpackConfig)

  webpack(myConfig, (err, stats) => {
    browserSync.reload()
    cb()
  })
})

// Move all fonts in a  directory
gulp.task('fonts', () => (
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'))
    .pipe(browserSync.stream())
))

gulp.task('assets', () => (
  gulp.src('./src/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'))
    .pipe(browserSync.stream())
))

// copy all rendered API docs
gulp.task('api-docs', () => (
  gulp.src(['./src/api-docs/**/*'])
    .pipe(gulp.dest('./public/docs/api'))
    .pipe(browserSync.stream())
))

gulp.task('hash', () => {
  return gulp.src('./public/**')
    .pipe(revall.revision({
      dontRenameFile: [/^\/favicon.ico$/g, '.html', 'sitemap.xml', 'robots.txt', '.woff', '.eot', '.ttf'],
      dontUpdateReference: ['.woff', '.eot', '.ttf']
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('inline', function () {
  return gulp.src('./public/index.html')
    .pipe(inlineCss())
    .pipe(gulp.dest('./public/index.html'))
})

gulp.task('serve', (done) => {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  })
  done()
})

gulp.task('reload', (done) => {
  browserSync.reload()
  done()
})

gulp.task('watch', () => {
  gulp.watch('./src/js/**/*.js', gulp.series('js', 'reload'))
  gulp.watch('./src/scss/**/*.scss', gulp.series('css', 'reload'))
  gulp.watch('./src/fonts/**/*', gulp.series('fonts', 'reload'))
  gulp.watch(['./site/content/**/*', './site/layouts/**/*'], gulp.series('hugo', 'reload'))
})

// Development server with browsersync
gulp.task('server', gulp.series(['hugo', 'css', 'js', 'fonts', 'purgecss', 'minify-css','serve', 'watch']))

gulp.task('clean', () => {
  return del(['./public/**/*'])
})

// Build/production tasks
gulp.task('render', gulp.series(['css', 'js', 'fonts', 'hugo', 'purgecss', 'minify-css']))
gulp.task('build', gulp.series(['clean', 'render', 'hash']))

/**
 * Run hugo and build the site
 */
function buildSite (cb, options, environment = 'development') {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault

  process.env.NODE_ENV = environment

  return spawn(hugoBin, args, {stdio: 'inherit'}).on('close', (code) => {
    if (code === 0) {
      browserSync.reload()
      cb()
    } else {
      browserSync.notify('Hugo build failed :(')
      cb('Hugo build failed')
    }
  })
}
