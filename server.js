var express	= require('express'),
	swig 	= require('swig'),
	_ 		= require('underscore'),
	fs      = require('fs'),
	xml2js 	= require('xml2js'),
	http	= require('http');

var app 	 = express(),
	baseData = fs.readFileSync('./aw-data.json').toString(),
	server   = http.createServer(app)

var data = JSON.parse(baseData);

swig.setDefaults({
	cache:false
});

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './app/views');

app.configure(function(){
	app.use(express.static('./public'));
	app.set('view cache', false);
	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.urlencoded());
	app.use(express.json());
	app.use(express.session({ secret: 'SECRET' }));
    app.use(express.session({ secret: 'SECRET' }));
});

app.get('/ads/', function (req,res){
	
	var xml;
	var baseDatas = http.request({
		host : "49583.21366.autoweb-xml.com",
		//http://
		path : "/feed?&sid=49583&auth=2Al5&subid=&q=q5&ip=127.0.0.1&ua=Chrome&ref=awebads.lan&count=4&state=&city="
		//path : "/query?query_text=q5&subid=_12345_&feed_id=AutoWeb_newcarleases&auth_token=cef60bf150d7a0aa291f607a411e1c029163ee4d&country=gt&region=07&city=guatemala%20city&referrer=http%3A%2F%2Fadconnect.autoweb-xml.com%2Fasp%2FfeedTester.htm%3Ffeed%3D22012%26t_expandReportControls%3D1%26ip%3D%26referer%3D%26keyword%3Dciviv%26source%3D%26subid%3D&user_agent=Mozilla%2F5.0%20%28Windows%20NT%206.1%3B%20WOW64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F31.0.1650.63%20Safari%2F537.36&query_ip=186.151.60.128&max_results=10"
	}, function (response){
		response.setEncoding('utf8');
		response.on('data', function (chunk){

			var parser = xml2js.parseString;
						
			parser(xml2, function (err, result){
				console.log(result);
				if(!err){
					data = result;
					res.send(data);
				}
				else
				{

					console.log(err);
				}
			})
			
		});
	}).end()

});

app.get('/xml/', function (req,res){
	
var request = require('request');
//var xmlNodes = require('xml-nodes');

request('http://admanager.namidirect.com/query?query_text=q5&subid=_12345_&feed_id=AutoWeb_newcarleases&auth_token=cef60bf150d7a0aa291f607a411e1c029163ee4d&country=gt&region=07&city=guatemala%20city&referrer=http%3A%2F%2Fadconnect.autoweb-xml.com%2Fasp%2FfeedTester.htm%3Ffeed%3D22012%26t_expandReportControls%3D1%26ip%3D%26referer%3D%26keyword%3Dciviv%26source%3D%26subid%3D&user_agent=Mozilla%2F5.0%20%28Windows%20NT%206.1%3B%20WOW64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F31.0.1650.63%20Safari%2F537.36&query_ip=186.151.60.128&max_results=2', function (error, response, body) {
  if (!error && response.statusCode == 200) {

    var parser = xml2js.parseString;
 			
	parser(body, function (err, result){
		if(!err){
			data = result;
			res.send(data);
		}
		else
		{
			console.log(err);
		}
	})

  }
})


});

var home = function (req,res){
	res.header('Access-Control-Allow-Origin', "*")
	res.render('FAS', {
		ads : data//,
		//env : env
	});
};

app.get('/', home);

app.get('/test', function (req,res){
	var parser = xml2js.parseString;
	var testMsg=testMessage();
	var xml = "<root> hello XML2JS </root>";
	var listings = "<feed><results><count>3</count><query><![CDATA[ fas ]]></query><sponsored><count>3</count><listing><title><![CDATA[ Special Lease Deals this Month ]]></title><description><![CDATA[Get Current Monthly Lease Deals from Local Dealers. ¬¬ Find Amazing Lease Specials and get the Lowest Price!]]></description><displayurl><![CDATA[ autosite.com ]]>" +
				   "</displayurl><url><![CDATA[http://admanager.autoweb-xml.com/click?data=eyJxdCI6IjEzODk2MjgyMzEuMjE4MzIiLCJrdyI6ImZhcyIsImR1IjoiaHR0cDovL2RlYWxlcnMu%0AYXV0b3NpdGUuY29tL2Zhcy1sZWFzZSIsImNuIjoiZ3QiLCJzYiI6Il8xMjM0NV8iLCJjeSI6Imd1%0AYXRlbWFsYSBjaXR5IiwicmYiOiJodHRwOi8vYWRjb25uZWN0LmF1dG93ZWIteG1sLmNvbS9hc3Av%0AZmVlZFRlc3Rlci5odG0iLCJtdCI6ImV4YWN0IiwiZmkiOiJVMkZzZEdWa1gxX3AtN1l0OEVMZEF5%0Ab3pNOUszMTFleWJBYThBemY2VTd3IiwicmciOiIwNyIsImNpIjoiSWUxNjlYU1lhWDNtQjRCZGZ0%0ARyIsImNjIjoiVTJGc2RHVmtYMV94MjhKUGRqdHJLSmMwS09KUnM0YlgiLCJ2aSI6IkU2eUFpaXdN%0AaTVwNUpyM2lvVUIiLCJyayI6IjEiLCJhaSI6IkJlSVVZdGhQM05GMXJwdzhGem0iLCJiaSI6ImJn%0ASTNQRWpwajJzVFNDcXVoM0QifQ%3D%3D%0A&crc=cb33]]>" +
				   "</url><cpc>0.03</cpc><rank>1</rank><ad_id>BeIUYthP3NF1rpw8Fzm</ad_id></listing><listing><title><![CDATA[ 2013 New Car Lease Deals ]]></title><description>" +
				   "<![CDATA[Find Incredible New Car Lease Specials Today. ¬¬ Get a 24 or 36 Month Lease at the Cheapest Payment!]]></description><displayurl><![CDATA[ car.com ]]></displayurl><url>"+ 
				   "<![CDATA[http://admanager.autoweb-xml.com/click?data=eyJxdCI6IjEzODk2MjgyMzEuMjE4MzIiLCJrdyI6ImZhcyIsImR1IjoiaHR0cDovL2RlYWxlcnMu%0AY2FyLmNvbS9mYXMtbGVhc2UiLCJjbiI6Imd0Iiwic2IiOiJfMTIzNDVfIiwiY3kiOiJndWF0ZW1h%0AbGEgY2l0eSIsInJmIjoiaHR0cDovL2FkY29ubmVjdC5hdXRvd2ViLXhtbC5jb20vYXNwL2ZlZWRU%0AZXN0ZXIuaHRtIiwibXQiOiJleGFjdCIsImZpIjoiVTJGc2RHVmtYMV9wLTdZdDhFTGRBeW96TTlL%0AMzExZXliQWE4QXpmNlU3dyIsInJnIjoiMDciLCJjaSI6IkllMTY5WFNZYVgzbUI0QmRmdEciLCJj%0AYyI6IlUyRnNkR1ZrWDEteGNiNy13SXdWVHlRVHpQdVBvTFZVIiwidmkiOiJFNnlBaWl3TWk1cDVK%0AcjNpb1VCIiwicmsiOiIyIiwiYWkiOiJQQVViY3pueldxdVRRcHJwd0tGIiwiYmkiOiJFZDROS1BI%0AQksydUc1M2lhUVljIn0%3D%0A&crc=11c]]>" +
				   "</url><cpc>0.02</cpc><rank>2</rank><ad_id>PAUbcznzWquTQprpwKF</ad_id></listing><listing><title><![CDATA[ Limited Lease Deals This Month ]]></title><description>" +
				   "<![CDATA[Get Amazing New Car lease Specials From Area Dealers.¬¬ Find Limited Lease Specials While They Last and Save!]]></description>" +
				   "<displayurl><![CDATA[ autobytel.com ]]></displayurl><url><![CDATA[http://admanager.autoweb-xml.com/click?data=eyJxdCI6IjEzODk2MjgyMzEuMjE4MzIiLCJrdyI6ImZhcyIsImR1IjoiaHR0cDovL25ldy5hdXRv%0AYnl0ZWwuY29tL2Zhcy1sZWFzZSIsImNuIjoiZ3QiLCJzYiI6Il8xMjM0NV8iLCJjeSI6Imd1YXRl%0AbWFsYSBjaXR5IiwicmYiOiJodHRwOi8vYWRjb25uZWN0LmF1dG93ZWIteG1sLmNvbS9hc3AvZmVl%0AZFRlc3Rlci5odG0iLCJtdCI6ImV4YWN0IiwiZmkiOiJVMkZzZEdWa1gxX3AtN1l0OEVMZEF5b3pN%0AOUszMTFleWJBYThBemY2VTd3IiwicmciOiIwNyIsImNpIjoiSWUxNjlYU1lhWDNtQjRCZGZ0RyIs%0AImNjIjoiVTJGc2RHVmtYMV9lM2c1ZkFTUWZsdjZSTGUwWXpJVUciLCJ2aSI6IkU2eUFpaXdNaTVw%0ANUpyM2lvVUIiLCJyayI6IjMiLCJhaSI6Imx6dHRHZzlRbFozcnJiNnhkbm4iLCJiaSI6IkdzUkYy%0AOHdvOE5TU3dUcndCNloifQ%3D%3D%0A&crc=520]]>" +
				   "</url><cpc>0.01</cpc><rank>3</rank><ad_id>lzttGg9QlZ3rrb6xdnn</ad_id></listing></sponsored></results></feed>"
    console.log(testMsg);
    //res.render(testMsg);
/*
	parser(listings, function (err, result){
		if(!err){
			
			res.send(result);
		}
	});*/
	//res.render('index');
})

server.listen(3001);