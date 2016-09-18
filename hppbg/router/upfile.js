"use strict";
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multiparty = require('multiparty');
var fs = require('fs');
var util = require('util');
var hppData = require("../data/db");


var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/upfile',function(req,res){
	
	var form = new multiparty.Form();
	form.uploadDir = "./temp";
	form.parse(req,function(err,fields,files){
		const username = fields.username[0];
		console.log(fields);
		if(err){
			res.writeHead(400,{'content-type':'text/plain'});
			res.end('invalid request:'+err.message);
			return;
		}
		// res.end('received files:' + util.inspect(files));
		const login = hppData.db.model('login',hppData.hpp); //注册模块

		let fileName = files.file[0].originalFilename;

		/*只上传图片*/
		var tempArr = fileName.split(".");

		const imgName = "logo_"+username+"."+tempArr[tempArr.length-1]; //图片的名字
		const logoImg = "/images/"+imgName;
		console.log(imgName);
		console.log(logoImg);

		fs.rename(files.file[0].path,"./lib/images/"+imgName,function(err){
			if(err){
				console.log(err.message);
			}else{
				login.update({"username":username},{$set:{"logoImg":logoImg}},function(err){
					if(err){
						console.log(err.message);
					}
				});
				res.json({"status":"0000","imgPath":logoImg});

			}
		});
		// res.end(util.inspect({fields:fields,files:files}));
	});
















	// const imgData = req.body.imgData;
	// var base64Data = imgData.replace(/^data:image\w+;base64,/,"");
	// var dataBuffer = new Buffer(base64Data,'base64');
	// var ii = 1;
	// fs.writeFile(""+ii+".png",dataBuffer,function(err){
	// 	if(err){
	// 		res.json({"err":0});
	// 	}else{
	// 		res.json({"success":1})
	// 	}
	// });
});

module.exports = app;
