var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var hppData = require("../data/db");


var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//-----------------登录注册注销----------
var login = hppData.db.model('login',hppData.hpp); //注册模块
app.post('/login',function(req,res){
	const username = req.body.username;
	const password = req.body.password;
	console.log(username);
	console.log(password);

	
	login.find({'username':username},function(err,docs){
		console.log(docs);
		if(docs.length === 0){
			//保存数据到数据库
			const loginData = new login({
				"username":username,
				"password":password,
				"logoImg":"",
				"user":{},
				"discuss":[]
			});
			loginData.save();
			res.json({"status":"0000","msg":"登录成功","error":"0000","auth":1});
		}else{
			res.json({"status":"0000","msg":"此用户名已经被注册","error":"0001","auth":1})
		}
	});
});
//注销用户
app.post('/clearUser',function(req,res){
	const username = req.body.username;
	console.log(username);
	login.find({"username":username},function(err,docs){
		if(docs.length !== 0){
			//清楚数据库用户数据
			login.remove({"username":username},function(err){
				if(err){
					return res.json({err:err,status:"0001"});
				}else{
					return res.json({msg:'delete success',status:"0000"})
				}
			});
		}else{
			return res.json({"msg":"没找到你的用户名",status:"0002"})
		}
	});
});

module.exports = app;