const {src, dest, series, parallel, watch} = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')

function server () {
    browserSync.init({
        server: {
            baseDir: './app'
        },
        port: 8081
    })


    watch('./app/**/*.html').on('change', browserSync.reload)
    watch('./app/sass/**/*.scss').on('change', styles)
}

function styles () {
    return src('./app/sass/**/*.scss')
        .pipe(sass())
        .pipe(dest('./app/css'))
        .pipe(browserSync.stream())
}

exports.default = series(server, parallel(styles))