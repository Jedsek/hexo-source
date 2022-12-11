//Various plug-ins used
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-html-minifier-terser');
var htmlclean = require('gulp-htmlclean');
var fontmin = require('gulp-fontmin');
// gulp-tester
var terser = require('gulp-terser');
// Compress js
gulp.task('compress', (cb) => {
  gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
    .pipe(terser())
    .pipe(gulp.dest('./public'));
  cb();
})
//Compress css
gulp.task('minify-css', () => {
    return gulp.src(['./public/**/*.css'])
        .pipe(cleanCSS({
            compatibility: 'ie11'
        }))
        .pipe(gulp.dest('./public'));
});
//Compress html
gulp.task('minify-html', () => {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true, //Clear html comments
            collapseWhitespace: true, //Compress html
            collapseBooleanAttributes: true,
            //Omit the value of Boolean attribute, for example: < input checked = "true" / > = > < input / >
            removeEmptyAttributes: true,
            //Delete all spaces as attribute values, for example: < input id = "" / > = > < input / >
            removeScriptTypeAttributes: true,
            //Delete type="text/javascript" of < script >
            removeStyleLinkTypeAttributes: true,
            //Delete type="text/css" for < style > and < link >
            minifyJS: true, //Compressed page JS
            minifyCSS: true, //Compress page CSS
            minifyURLs: true  //Compressed page URL
        }))
        .pipe(gulp.dest('./public'))
});
//Compressed font
function minifyFont(text, cb) {
  gulp
    .src('./public/fonts/*.ttf') //Directory of original font
    .pipe(fontmin({
      text: text
    }))
    .pipe(gulp.dest('./public/fontsdest/')) //Compressed output directory
    .on('end', cb);
}

gulp.task('mini-font', (cb) => {
  var buffers = [];
  gulp
    .src(['./public/**/*.html']) //Please modify the directory where the HTML file is located according to your own situation
    .on('data', function(file) {
      buffers.push(file.contents);
    })
    .on('end', function() {
      var text = Buffer.concat(buffers).toString('utf-8');
      minifyFont(text, cb);
    });
});
// When running the gulp command, perform the following tasks in turn
gulp.task('default', gulp.parallel(
  'compress', 'minify-css', 'minify-html','mini-font'
))