var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var hppData = require("../data/db");


var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//-------注册数据库 login 表-------
var login = hppData.db.model('login',hppData.hpp);

app.post('/initComment',function(req,res){
	const name = req.body.username;

	login.find({"discuss.name":name},'discuss username logoImg',function(err,docs){
		if(err){
			res.json({"status":"0001","msg":"查询错误"})
			return;
		}else{
			res.json({"status":"0000","result":docs[0]});
		}
	});

});


app.post('/updataComment',function(req,res){
	const username = req.body.username;
	const name = req.body.name;
	const content = req.body.content;

	login.update({'username':username},{'$addToSet':{"discuss":{
		"content":content,
		"time":new Date().getTime(),
		"name":name
	}}},function(err){
		if(err){
			console.log(err.message);
		}
		//返回一些用户信息
		login.find({'username':username},'logoImg',function(err,docs){
			res.json({"status":"0000","result":docs[0]});
		});
		
	});

});
module.exports = app;