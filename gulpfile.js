var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    browserSync = require('browser-sync')
    reload = browserSync.reload
    mainBowerFiles = require('main-bower-files');

gulp.task('styles', function () {
    return gulp.src('src/styles/main.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({browsers: ['last 2 version']}))
        .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write('./maps'))
        .pipe(gulp.dest('examples/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('serve', ['styles', 'bowerCopy'], function() {
    browserSync({
        server: "./examples"
    });

    gulp.watch("src/styles/*.scss", ['styles']);
    gulp.watch("examples/*.html").on('change', reload);
    gulp.watch("bower.json", ['bowerCopy']);
});

gulp.task('bowerCopy', function () {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('examples/bower_components'));
});

gulp.task('default', function() {
    gulp.start('serve');
});
