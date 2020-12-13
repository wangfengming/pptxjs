const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')
const merge = require('merge2')  // Requires separate installation

function buildTs () {
  const tsResult = tsProject
    .src()
    .pipe(tsProject())
  return merge([
    tsResult.dts.pipe(gulp.dest('dist')),
    tsResult.js.pipe(gulp.dest('dist'))
  ])
}

exports.build = buildTs
