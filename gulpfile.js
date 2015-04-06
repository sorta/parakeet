var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync')
    reload = browserSync.reload;

gulp.task('styles', function () {
    return gulp.src('src/styles/main.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({errLogToConsole: true}))
        .pipe(plugins.autoprefixer({browsers: ['last 2 version']}))
        .pipe(plugins.sourcemaps.write('./maps'))
        //.pipe(plugins.minifyCss())
        .pipe(gulp.dest('examples/styles'))
        //.pipe(plugins.minifyCss())
        // add rename pipe here
        //.pipe(gulp.dest('examples/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('htmlReload', function () {
    return gulp.src('examples/*.html')
        .pipe(reload({stream: true}));
});

gulp.task('serve', ['styles'], function() {
    browserSync({
        server: "./examples"
    });

    gulp.watch("./src/styles/*.scss", ['styles']);
    gulp.watch("examples/*.html", ['htmlReload']);
});

gulp.task('default', function() {
    gulp.start('serve');
});
