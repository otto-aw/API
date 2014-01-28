
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var aw = document.getElementById("autowebjs");
var carMake = getUrlVars()["make"];
var carModel = getUrlVars()["model"];

var configParams={
	envIdjs		 : aw.getAttribute("id"),
	envZipCode	 : getUrlVars()["zipCode"] != "" ? getUrlVars()["zipCode"] : aw.getAttribute("data-zipcode"),
	envState	 : "",
	envCount	 : getUrlVars()["count"] != "" ? getUrlVars()["count"] : aw.getAttribute("data-count"),
	envSource	 : getUrlVars()["source"] != "" ? getUrlVars()["source"] : aw.getAttribute("data-source"),	
	envPublisher : getUrlVars()["publisher"] != "" ? getUrlVars()["publisher"] : aw.getAttribute("data-publisher"),
	envResult	 : aw.getAttribute("data-result"),	
	host		 : '{host}/public',
	auth		 : aw.getAttribute('data-auth'),
	keyword		 : getUrlVars()["keyword"] != "" ? getUrlVars()["keyword"] : aw.getAttribute("data-keyword") 
};

$(document).ready(function(){
	console.log("Starting AutoWeb-API");	
	
	/*if(getUrlVars()["publisher"] == undefined){
		alert("keyword not exists");
		return false;
	}*/


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
		   		$(this).html(function(i,val) { return val.replace('(Make)', carMake) } );
		   		$(this).html(function(i,val) { return val.replace('(Model)', carModel) } );
		   		$(this).html(function(i,val) { return val.replace('%20', ' ') } );
		   });

           $(this).find('div.aw-description').each(function() {
                $(this).html( function(i,val) { return val.replace(String.fromCharCode(216), '<br>') } );
                $(this).html(function(i,val) { return val.replace('(Make)', carMake) } );
                $(this).html(function(i,val) { return val.replace('(Model)', carModel) } );
                $(this).html(function(i,val) { return val.replace('%20', ' ') } );
           });

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

	//local test
	/*var xhr = $.ajax({
		type:'GET',
		url:'/ads/'+configParams.keyword+'/'+configParams.envSource+'/'+configParams.envPublisher+'/'+configParams.envCount + '/' + configParams.auth
<<<<<<< HEAD
	})*/

	var xhr = $.ajax ({
		type: 'GET',
		//url : 'http://ads.awadserver.com/widgetv2/index.php?publisher=' +configParams.envPublisher+'&count='+configParams.envCount+'&statecode=&zipcode=&keyword='+ configParams.keyword,
		url : 'http://localhost:8080/awebads/widget/src/widgetv2/index.php?publisher=' +configParams.envPublisher+'&count='+configParams.envCount+'&statecode=&zipcode=&keyword='+ configParams.keyword,
		dataType : 'jsonp',
	});

	xhr.done(function (data){
		data.listings.forEach(function(item){
			window.collections.ads.add(item);
		});
	});


/*
	var xhr = $.ajax({
		type:'GET',
		url:'http://'+ host[2] +'/ads/'+configParams.keyword+'/'+configParams.envSource+'/'+configParams.envPublisher+'/'+configParams.envCount + '/' + configParams.auth,
		dataType : 'jsonp',
		async: false,
		crossDomain : true
	})
<<<<<<< HEAD
=======
	*/

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