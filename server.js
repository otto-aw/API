var express = require('express'),
	swig	= require('swig'),
	_		= require('underscore'),
	fs 		= require('fs'),
	http 	= require('http');
var aw		= express(),
    server	= http.createServer(aw);

var env = 'dev';

swig.setDefaults({
	cache : false
});

aw.configure(function (){
	aw.engine('html', swig.renderFile);
	aw.set('view engine' , 'html');
	aw.set('views', './app/views');
	aw.use(express.static('./public'));
	aw.set('view cache', false);
	aw.use(express.logger());
	aw.use(express.cookieParser());
	aw.use(express.urlencoded());
	aw.use(express.json());
	aw.use(express.session({secret : 'SECRET' }));
	aw.use(express.session({secret : 'SECRET' }));
})

var homeController	 = require('./app/controllers/home');
var parserController = require('./app/controllers/parser');

homeController(aw);
parserController(aw);

var port = process.env.PORT || 3000;

server.listen(port, function(){
	console.log('Listening on ' + port);
});

console.log('AutoWeb API is running');
