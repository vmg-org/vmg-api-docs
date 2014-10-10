var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var ghPages = require('gulp-gh-pages');
var del = require('del');
var express = require('express');
var rename = require('gulp-rename');
var exec = require('child_process').exec;
var gitLog = require('git-log');
var filePath = {
  jshintBase: {
    src: './*.js'
  },
  jshintApp: {
    src: ['public/my-scripts/**/*.js']
  },
  jshintTest: {
    src: 'test/**/*.js'
  },
  app: {
    src: './public/',
    dst: './dst/',
    dev: './dev/'
  }
};

gulp.task('default', function() {
  gulp.src(filePath.jshintBase.src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(jshintReporter));

  gulp.src(filePath.jshintApp.src)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(jshintReporter));
});

gulp.task('test', function() {
  gulp.src(filePath.jshintTest.src)
    .pipe(jshint('./test/.jshintrc'))
    .pipe(jshint.reporter(jshintReporter));
});

/** Clean destination folder */
gulp.task('clean', function(cb) {
  del([filePath.app.dst], cb);
});

// Copy all static files
gulp.task('copySource', ['clean'], function() {
  return gulp.src(filePath.app.src + '**/*')
    .pipe(gulp.dest(filePath.app.dst));
});

gulp.task('renameConfig', ['clean', 'copySource'], function() {
  return gulp.src(filePath.app.dst + 'my-scripts/cnst-release.js')
    .pipe(rename('my-scripts/cnst.js'))
    .pipe(gulp.dest(filePath.app.dst));
});

gulp.task('connect', function() {
  var app = express();

  app.use(express.static('public'));

  app.listen(39393, function() {
    console.log('http://localhost:39393/');
  });
});

// Auto clean and copy all files
gulp.task('build', ['renameConfig']);

// https://github.com/rowoot/gulp-gh-pages
gulp.task('gh-pages', function() {
  gulp.src(filePath.app.dst + "**/*").pipe(ghPages());
});

gulp.task('gitlog', function(done) {
  var tmpFilePath = 'doc/log-tmp.log';
  var logFilePath = 'doc/log-201409.log';
  var afterDate = new Date(2014, 8, 2); //new Date(Date.now() - (1000 * 60 * 60 * 24));
  var beforeDate = new Date(2014, 9, 1);

  var shellCommand = 'git log ' + gitLog.generateArgs(afterDate, beforeDate, tmpFilePath).join(' ');
  console.log(shellCommand);

  exec(shellCommand, function(err) {
    if (err) {
      return done(err);
    }

    gitLog.createLog(tmpFilePath, logFilePath, done);
  });
});
