'use strict';

var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    csso = require('gulp-csso');
    
var bc = 'bower_components/';


gulp.task('html', function() {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('prod/'))
});

gulp.task('sass', function () {
  gulp.src('app/sass/**/*')
      .pipe(sass())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('prod/css/'));
});

gulp.task('img', function() {
  gulp.src('img/**/*')
    .pipe(gulp.dest('prod/img/'));
});
gulp.task('app', function() {
    gulp.src('app/**/*.js')
        .pipe(concat('build.js'))
        .pipe(gulp.dest('prod'))
});
gulp.task('watch', function() {
  gulp.watch('builds/development/app/**/*.js', ['app']);
  gulp.watch('builds/development/sass/**/*.scss', ['sass']);
  gulp.watch('builds/development/**/*.html', ['html']);
  gulp.watch('builds/development/img/**/*', ['img']);
});

gulp.task('libs', function() {
  gulp.src(bc+'jquery/dist/jquery.js')
      .pipe(gulp.dest('prod/libs/jquery/'));

  gulp.src(bc+'font-awesome/css/*.*')
      .pipe(gulp.dest('prod/libs/font-awesome/css'));

  gulp.src(bc+'font-awesome/fonts/*')
        .pipe(gulp.dest('prod/libs/font-awesome/fonts'));

  gulp.src(bc+'bootstrap/dist/**/*.*')
      .pipe(gulp.dest('prod/libs/bootstrap/'));

  gulp.src(bc+'bxslider-4/dist/**/*.*')
      .pipe(gulp.dest('prod/libs/bxslider/'));

    gulp.src(bc+'masonry/dist/*.*')
       .pipe(gulp.dest('prod/libs/masonry/'));

    gulp.src(bc+'imagesloaded/*.js')
        .pipe(gulp.dest('prod/libs/imagesloaded/'));
//
//  gulp.src(bc+'bootstrap-material-design/dist/**/*.*')
//      .pipe(gulp.dest('./../laravel/public/fitness/libs/bootstrap-material-design/'));

  gulp.src([bc+'angular/angular.js',
            bc+'angular-animate/angular-animate.js',
            bc+'angular-cookies/angular-cookies.js',
            bc+'angular-bootstrap/ui-bootstrap-tpls.min.js',
//            bc+'angular-i18n/angular-locale_ru-ru.js',
            bc+'angular-loader/angular-loader.js',
//            bc+'angular-resource/angular-resource.js',
            bc+'angular-route/angular-route.js',
            bc+'angular-sanitize/angular-sanitize.js',
//            bc+'angular-touch/angular-touch.js',
//            bc+'firebase/firebase.js',
//            bc+'angularfire/dist/angularfire.js',
          ])
      .pipe(concat('angular.concat.js'))
      .pipe(gulp.dest('prod/libs/angular/'));
});

gulp.task('webserver', function() {
  gulp.src('../laravel/public/fitness/')
      .pipe(webserver({
        livereload: true,
        open: true
      }));
});

gulp.task('default', [
    //'libs',
    'html',
    'img',
//  'js',
    'app',
    'sass'
//  'webserver',
]);
