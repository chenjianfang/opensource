var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var login = require('./router/login');
var upfile = require('./router/upfile');
var init = require('./router/init');
var comment = require('./router/comment');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'../hpp')));
app.use(express.static(path.join(__dirname,'lib')));

app.use('/',login);
app.use('/',upfile);
app.use('/',init);
app.use('/',comment);







app.listen(1100);