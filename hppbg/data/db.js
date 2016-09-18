var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

//连接数据库
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/hpp");
var db = mongoose.connection;

db.on('error',console.error.bind(console,'连接错误'));

var hpp = new mongoose.Schema({
	username:String,
	password:String,
	logoImg:String,
	user:{},
	discuss:[
		{
			content:String,
			time:String,
			name:String
		}
	]
});

module.exports = {
	hpp,
	db
};

