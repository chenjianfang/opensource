var webpack = require('webpack');
var path = require("path");
module.exports = {
	entry:{
		main:'./src/js/main.js',
		login:'./src/js/login.js'/*登录模块*/
	},
	output:{
		path:'dist/js',
		filename:'[name].js'
	},
	module:{
		loaders:[
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel?presets[]=es2015"}
		]
	}
};