var xml2js 	= require('xml2js'),
	http	= require('http'),
	request = require('request');

var parserController = function (aw){

	console.log('Parse Controller load');

	aw.get('/ads', function (req,res){
		//request('http://admanager.namidirect.com/query?query_text=q5&subid=_12345_&feed_id=AutoWeb_newcarleases&auth_token=cef60bf150d7a0aa291f607a411e1c029163ee4d&country=gt&region=07&city=guatemala%20city&referrer=http%3A%2F%2Fadconnect.autoweb-xml.com%2Fasp%2FfeedTester.htm%3Ffeed%3D22012%26t_expandReportControls%3D1%26ip%3D%26referer%3D%26keyword%3Dciviv%26source%3D%26subid%3D&user_agent=Mozilla%2F5.0%20%28Windows%20NT%206.1%3B%20WOW64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F31.0.1650.63%20Safari%2F537.36&query_ip=186.151.60.128&max_results=5', function (error, response, body) {
		request('http://49583.21366.autoweb-xml.com/feed?&sid=49583&auth=2Al5&subid=&q=q5&ip=127.0.0.1&ua=Mozilla/5.0%20(Windows%20NT%206.1;%20WOW64;%20rv:26.0)%20Gecko/20100101%20Firefox/26.0&ref=awebads.lan&count=4&state=&city=', function (error, response, body) {
		  if (!error && response.statusCode == 200) {

		    var parser = xml2js.parseString;
		 			
			parser(body,{explicitRoot : false}, function (err, result){
				if(!err){
					data = result;
					dataP=data.results[0];
   					dataS=dataP.sponsored[0];
				   	res.send(dataS.listing);
					
					//res.send(data);
				}
				else
				{
					console.log(err);
				}
			})

		  }
		})
	});


};

module.exports = parserController;