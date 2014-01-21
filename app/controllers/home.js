
var homeController = function(aw){
	console.log ('Home Controller is Load');
	var data;
	
	aw.get('/', function (req,res){
		res.header('Access-Control-Allow-Origin', "*");
		res.render('FAS', {
			ads : data
		});		
	});

}

module.exports = homeController;