
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


$(document).ready(function(){
	console.log("Starting AutoWeb-API");	

	var make = getUrlVars()["make"];
	var model = getUrlVars()["model"];



	var configParams={
		envIdjs		 : document.getElementById("autowebjs").getAttribute("id"),
		envZip		 : document.getElementById("autowebjs").getAttribute("data-zipcode"),
		envState	 : "",
		envCount	 : document.getElementById("autowebjs").getAttribute("data-count"),
		envSource	 : document.getElementById("autowebjs").getAttribute("data-source"),	
		envPublisher : document.getElementById("autowebjs").getAttribute("data-publisher"),
		envResult	 : document.getElementById("autowebjs").getAttribute("data-result"),	
		host		 : '{host}/public',
		keyword 	 : document.getElementById("autowebjs").getAttribute("data-keyword"),
		auth		 : document.getElementById('autowebjs').getAttribute('data-auth')
	};

	var location = document.getElementById("autowebjs").getAttribute("src");
 	var host = location.split('/',3);
   	configParams.host = configParams.host.replace('{host}', host[2]);



	window.collections.ads = new AutoWeb.Collections.Ads();

	window.collections.ads.on('add', function (model){

		var view = new AutoWeb.Views.Ads(model);
		view.render();

		view.$el.appendTo(configParams.envResult);

		 $('div.aw-colmiddle').each(function(i,el){
               $(this).find('div.aw-title').each(function(){
               		$(this).html( function(i,val) { return val.replace('(Make)', make.toString()) } );
                    $(this).html( function(i,val) { return val.replace('(Model)', model.toString()) } );
               });

               $(this).find('div.aw-description').each(function() {
                    $(this).html( function(i,val) { return val.replace('Ø', '<br>')} );
               });
          });

		 	width = $(window).width();

	        if(width<=480){
	          $("div.aw-row").each(function(i,el){
	            image = $(this).find("div.aw-img")
	            btn = $(this).find("div.aw-button")
	            
	            image.remove();
	            image.insertBefore(btn);
	          });
	        }else{
	          $("div.aw-row").each(function(i,el){
	            image = $(this).find("div.aw-img")
	            col = $(this).find("div.aw-colmiddle")
	            
	            image.remove();
	            image.insertBefore(col);
	          });
        	}
	});

	//local test
	var xhr = $.ajax({
		type:'GET',
		url:'/ads/'+configParams.keyword+'/'+configParams.envSource+'/'+configParams.envPublisher+'/'+configParams.envCount + '/' + configParams.auth
	});



/*
	var xhr = $.ajax({
		type:'GET',
		url:'http://'+ host[2] +'/ads/'+configParams.keyword+'/'+configParams.envSource+'/'+configParams.envPublisher+'/'+configParams.envCount + '/' + configParams.auth,
		dataType : 'jsonp',
		async: false,
		crossDomain : true
	})
	*/

	xhr.done(function (data){
		//console.log(data);
		data.forEach(function(item){
			window.collections.ads.add(item);
		});
	}).fail(function (err) {
		//console.log(err)
	});


}); //END OF DOCUMENT.READY FUNCTION



$(window).resize(function(){
    width = $(window).width();

    if(width<=480){
      $("div.aw-row").each(function(i,el){
        image = $(this).find("div.aw-img")
        btn = $(this).find("div.aw-button")
        
        image.remove();
        image.insertBefore(btn);
      });
    }else if (width>480){
      $("div.aw-row").each(function(i,el){
        image = $(this).find("div.aw-img")
        col = $(this).find("div.aw-colmiddle")
        
        image.remove();
        image.insertBefore(col);
      });
    }
});