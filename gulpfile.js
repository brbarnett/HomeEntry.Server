var gulp = require('gulp');
var ftp = require('vinyl-ftp');

var config = require('./gulpfile-config.js');

var ftpConn = ftp.create(config.ftp);

gulp.task('deploy', [], function () {
    return gulp.src([
        './server.js',
        './package.json',
        './web.config'
    ], {base: '.', buffer: false})
        .pipe(ftpConn.dest('/entry.1128wnewport.com'));
});