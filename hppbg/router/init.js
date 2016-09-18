"use strict";
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const hppData = require("../data/db");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//----------Initialization state---------

app.post('/init',function(req,res){
	const login = hppData.db.model('login',hppData.hpp); //注册模块
	const username = req.body.username;

	login.find({"username":username},function(err,docs){
		console.log(docs);
		if(err){
			res.json({"status":"0001","err":err.message});
			return;
		}

		const temp = {
			"status":"0000",
			"username": docs[0].username,
			"logoImg": docs[0].logoImg
		};
		res.json(temp);
	});

});

module.exports = app;

