var xml2js 	= require('xml2js'),
	http	= require('http'),
	url	 	= require('url'),
	request = require('request');

var parserController = function (aw){

	console.log('Parse Controller load');

	aw.get('/ads/:keyword/:sid/:pid/:count', function (req,res){
		var part = url.parse(req.url,true);
		var query = part.query;

		res.setHeader('Content-Type', 'application/json');
		request('http://'+req.params.sid+'.'+req.params.pid+'.autoweb-xml.com/feed?&sid='+req.params.sid+'&auth=2Al5&subid=&q='+req.params.keyword+'&ip=127.0.0.1&ua=Mozilla/5.0%20(Windows%20NT%206.1;%20WOW64;%20rv:26.0)%20Gecko/20100101%20Firefox/26.0&ref=awebads.lan&count='+req.params.count+'&state=&city=', function (error, response, body) {
		  if (!error && response.statusCode == 200) {

		    var parser = xml2js.parseString;
		    var data = '';

			parser(body,{explicitRoot : false}, function (err, result){
				if(!err){
					data = result;
					dataP=data.results[0];
   					dataS=dataP.sponsored[0];
   					var ret = query.callback + '(' + JSON.stringify(dataS.listing) + ')';
				   	return res.send(ret);
				}
				else
				{
					console.log(err);
				}
			})

		  }
		})//en del request
	});


};

module.exports = parserController;