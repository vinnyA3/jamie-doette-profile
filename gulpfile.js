const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');

browserSync.init({
	server: './dist'
});
browserSync.stream();

gulp.task('default', ['copy-html','styles','browserify','scripts', 'watch'], () => {
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
	gulp.watch('src/sass/**/*.scss',['styles']);
	gulp.watch('/index.html', ['copy-html']);
	gulp.watch('./dist/index.html').on('change', browserSync.reload);
});

gulp.task('copy-html', function(){
	gulp.src('./index.html')
			.pipe(gulp.dest('./dist'));
});

gulp.task('styles', () => {
	gulp.src('src/sass/**/*.scss')
			.pipe(sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
			.pipe(gulp.dest('dist/css'))
			.pipe(browserSync.stream());
});

gulp.task('scripts', ["browserify"], () => {
	return gulp.src(['src/js/bundle.js'])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

gulp.task('browserify', () => {
	return browserify('src/js/main.js')
		.transform(["babelify", {presets: ["es2015"]}])
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('src/js'));
});

gulp.task('watch', () => {
	gulp.watch("src/js/main.js", ["browserify", "scripts"]);
});
