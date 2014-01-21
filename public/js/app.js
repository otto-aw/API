$(document).ready(function(){
	console.log("Starting AutoWeb-API");

	window.collections.ads = new AutoWeb.Collections.Ads();

	window.collections.ads.on('add', function (model){
		console.log('model: ', model);
		var view = new AutoWeb.Views.Ads(model);
		view.render();

		view.$el.appendTo('.listings-space');
	});

	var xhr = window.collections.ads.fetch();

	xhr.done(function (data){
		console.log(data);
	});
})