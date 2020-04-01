const gulp = require('gulp')
const del = require('del')
const tap = require('gulp-tap')
const path = require('path')
const fs = require('fs')
const shell = require('gulp-shell')

// CONSTANTS
const componentName = 'starter-kit'
const destDir = `../../static/components/${componentName}`
const templateFiles = [
  // related path of django template you want to inject react's built files
  '../../templates/sample-django-template.html',
  '../../templates/another-template.html'
]
const regJS = {
  jsEssential: /(<script src="{% static ')(.*)(' %}" async><\/script><!-- jsEssential -->)/g,
  jsVendor: /(<script src="{% static ')(.*)(' %}" async><\/script><!-- jsVendor -->)/g,
  jsMain: /(<script src="{% static ')(.*)(' %}" async><\/script><!-- jsMain -->)/g
}
const regCSS = {
  cssVendor: /(<link rel="stylesheet" href="{% static ')(.*)(' %}"><!-- cssVendor -->)/g,
  cssMain: /(<link rel="stylesheet" href="{% static ')(.*)(' %}"><!-- cssMain -->)/g
}
const regCSSPreload = {
  cssVendor: /(<link rel="preload" as="style" type="text\/css" href="{% static ')(.*?)(' %}" onload="this\.onload=null;this\.rel='stylesheet'"\/><!-- cssVendor -->)/g,
  cssMain: /(<link rel="preload" as="style" type="text\/css" href="{% static ')(.*?)(' %}" onload="this\.onload=null;this\.rel='stylesheet'"\/><!-- cssMain -->)/g
}

// TASKS
gulp.task('inject-builds', gulp.series(
  function clean_ (callback) {
    del.sync([destDir], { force: true })
    callback()
  },
  function copy_ () {
    return gulp
      .src('build/static/**/*')
      .pipe(gulp.dest(destDir))
  },
  function injectCss () {
    return gulp.src(
      [
        destDir + '/**/*.css'
      ])
      .pipe(tap(function (file) {
        for (const t_ of templateFiles) {
          const fn = path.basename(file.path)
          const data = fs.readFileSync(t_, 'utf8')
          let result = ''
          if (fn.match(/^[\d]+\.(\w+)\.chunk.*/)) {
            result = data.replace(
              regCSS.cssVendor,
              `$1components/${componentName}/css/${fn}$3`
            )
          } else if (fn.match(/^main\.(\w+)\.chunk.*/)) {
            result = data.replace(
              regCSS.cssMain,
              `$1components/${componentName}/css/${fn}$3`
            )
          }
          if (result !== '') {
            fs.writeFileSync(t_, result, 'utf8')
            console.log(`- Inject [CSS] ${fn} => ${t_}`)
          }
        }
        return true
      }))
      .pipe(gulp.dest(destDir))
  },
  function injectCssPreload () {
    return gulp.src(
      [
        destDir + '/**/*.css'
      ])
      .pipe(tap(function (file) {
        for (const t_ of templateFiles) {
          const fn = path.basename(file.path)
          const data = fs.readFileSync(t_, 'utf8')
          let result = ''
          if (fn.match(/^[\d]+\.(\w+)\.chunk.*/)) {
            result = data.replace(
              regCSSPreload.cssVendor,
              `$1components/${componentName}/css/${fn}$3`
            )
          } else if (fn.match(/^main\.(\w+)\.chunk.*/)) {
            result = data.replace(
              regCSSPreload.cssMain,
              `$1components/${componentName}/css/${fn}$3`
            )
          }
          if (result !== '') {
            fs.writeFileSync(t_, result, 'utf8')
            console.log(`- Inject [CSS] ${fn} => ${t_}`)
          }
        }
        return true
      }))
      .pipe(gulp.dest(destDir))
  },
  function injectJs () {
    return gulp.src(
      [
        destDir + '/**/*.js'
      ])
      .pipe(tap(function (file) {
        for (const t_ of templateFiles) {
          const fn = path.basename(file.path)
          const data = fs.readFileSync(t_, 'utf8')
          let result = ''
          if (fn.match(/^\w+-\w+\.js/)) {
            result = data.replace(
              regJS.jsEssential,
              `$1components/${componentName}/js/${fn}$3`
            )
          } else if (fn.match(/^[\d]+\.(\w+)\.chunk.*/)) {
            result = data.replace(
              regJS.jsVendor,
              `$1components/${componentName}/js/${fn}$3`
            )
          } else if (fn.match(/^main\.(\w+)\.chunk.*/)) {
            result = data.replace(
              regJS.jsMain,
              `$1components/${componentName}/js/${fn}$3`
            )
          }
          if (result !== '') {
            fs.writeFileSync(t_, result, 'utf8')
            console.log(`- Inject [JS] ${fn} => ${t_}`)
          }
        }
        return true
      }))
      .pipe(gulp.dest(destDir))
  }
))

gulp.task('build', gulp.series(
  shell.task('npm run build'),
  'inject-builds'
))
