var gulp = require("gulp");
var webpack = require("webpack");
var sass = require('gulp-sass');
var webpackConfig = require("./webpack.config.js")
gulp.task('webpack',function(callback){
	var myConfig = Object.create(webpackConfig);
	webpack(
		myConfig
	,function(err,stats){
		callback();
	});
});

gulp.task('sass',function(){
	gulp.src('src/scss/*.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('dist/css'));
});


gulp.task('auto',function(){
	gulp.watch('src/js/*.js',['webpack']);
	
});

gulp.task('scss-watch',function(){
	gulp.watch('src/scss/*.scss',['sass']);
})

gulp.task('default',['webpack','auto','scss-watch','sass']);