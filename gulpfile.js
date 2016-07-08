const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');

browserSync.init({
	server: './'
});
browserSync.stream();

gulp.task('default', ['styles','browserify','scripts', 'watch'], () => {
	gulp.watch('sass/**/*.scss',['styles']);
	gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('styles', () => {
	gulp.src('sass/**/*.scss')
			.pipe(sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
			.pipe(gulp.dest('css'))
			.pipe(browserSync.stream());
});

gulp.task('scripts', ["browserify"], () => {
	return gulp.src(['js/bundle.js'])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'))
});

gulp.task('browserify', () => {
	return browserify('js/main.js')
		.transform(["babelify", {presets: ["es2015"]}])
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('watch', () => {
	gulp.watch("js/main.js", ["browserify", "scripts"]);
});
