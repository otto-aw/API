$(document).ready(function(){
	//debugger;
	console.log("Starting AutoWeb-API");

	window.collections.ads = new AutoWeb.Collections.Ads();

	window.collections.ads.on('add', function (model){
		console.log('model: ', model);
		var view = new AutoWeb.Views.Ads(model);

		view.render();

		view.$el.appendTo('.listings-space');
	});

	/*var xhr = $.ajax({
		type : 'GET',
		url : 'http://admanager.namidirect.com/query?query_text=fas&subid=_12345_&feed_id=AutoWeb_loans&auth_token=cef60bf150d7a0aa291f607a411e1c029163ee4d&country=gt&region=07&city=guatemala%20city&referrer=http%3A%2F%2Fadconnect.autoweb-xml.com%2Fasp%2FfeedTester.htm&',
		datatype : 'xml'
		//jsonpCallback: "_testcb"
	});*/

	var xhr = window.collections.ads.fetch();

	xhr.done(function (data){
		//debugger;
		data.feed.results.forEach(function(item) {
   			item.sponsored.forEach(function(ad){
         		ad.listing.forEach(function(feed){
         			//console.log(feed.description);
            		window.collections.ads.add(feed);
        		});          
   			});
		});
	});
})