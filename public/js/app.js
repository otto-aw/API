
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

	console.log(make + " & " + model);


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

 	

   	//Insert the javascript elements into the client web page dinamically

	function loadScritFiles(filename, ext){
		if (ext=="js"){ 
		  var scriptFile=document.createElement('script');
		  scriptFile.setAttribute("type","text/javascript");
		  scriptFile.setAttribute("src", filename);
		  scriptFile.setAttribute("async", false);
		  scriptFile.setAttribute("defer", "defer");
		 }
		else if (ext=="css"){ 
		  var scriptFile=document.createElement("link")
		  scriptFile.setAttribute("rel", "stylesheet")
		  scriptFile.setAttribute("type", "text/css")
		  scriptFile.setAttribute("href", filename)
		 }
		if (typeof scriptFile!="undefined"){
			document.getElementsByTagName("head")[0].appendChild(scriptFile);
			scriptFile.onload=scriptFile;
		}
		}


		var scripts=[
				"/js/vendors/underscore.js",
    			"/js/vendors/backbone.js",
    			"/js/vendors/swig.js",
				"/js/init.js",
				"/js/app/models.js",
				"/js/app/collections.js",
    			"/js/app/views.js"
    			];


		scripts.forEach(function(scriptItem) {
    		loadScritFiles(scriptItem, "js");
    		//$.getScript(scriptItem);
    	});
   	
		//console.log("scripts loaded");


	
	
	//
/*

   	var scripts=[ "/js/vendors/underscore.js",
    			  "/js/vendors/backbone.js",
    			  "/js/vendors/swig.js",
    			  "/js/init.js",
    			  "/js/app/models.js",
    			  "/js/app/collections.js",
    			  "/js/app/views.js"
    			]

	
//console.log();scripts.length
	for (var i=0;i<7;i++)
	{ 
		//document.write(cars[i] + "<br>");
		var oHead = document.getElementsByTagName('HEAD').item(0);
		var oScript= document.createElement("script");
		oScript.src=scripts[i];
		oHead.appendChild(oScript);
	}
*/
    /*
    scripts.forEach(function(scriptItem) {
    	//console.log(scriptItem);
    	//oScript.type = "text/javascript";
    	
		
		oScript= document.createElement("script");
		oScript.src=scriptItem;
		//console.log(oScript);
		//oHead.appendChild(oScript);
		//document.head.appendChild(oScript);
    	});
	*/


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
	})


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

});


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