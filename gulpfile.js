var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
browserSync.init({
	server: './'
});
browserSync.stream();

gulp.task('default', ['styles'], function() {
	gulp.watch('sass/main.scss',['styles']);
	gulp.watch('/index.html').on('change', browserSync.reload);
});

gulp.task('styles', function() {
	gulp.src('sass/main.scss')
			.pipe(sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
			.pipe(gulp.dest('css'))
			.pipe(browserSync.stream());
});
