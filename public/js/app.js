$(document).ready(function(){
	console.log("Starting AutoWeb-API");

	var configParams={
		envIdjs		 : document.getElementById("autowebjs").getAttribute("id"),
		envZip		 : document.getElementById("autowebjs").getAttribute("data-zipcode"),
		envState	 : "",
		envCount	 : document.getElementById("autowebjs").getAttribute("data-count"),
		envSource	 : document.getElementById("autowebjs").getAttribute("data-source"),	
		envPublisher : document.getElementById("autowebjs").getAttribute("data-publisher"),
		envResult	 : document.getElementById("autowebjs").getAttribute("data-result"),	
		host		 : '{host}/public/js',
		keyword: document.getElementById("autowebjs").getAttribute("data-keyword")
	};

	var location = document.getElementById("autowebjs").getAttribute("src");
 	var host = location.split('/',3);
   	configParams.host = configParams.host.replace('{host}', host[2]);
 	//console.log(configParams.host);

	window.collections.ads = new AutoWeb.Collections.Ads();

	window.collections.ads.on('add', function (model){
		console.log(model);
		var view = new AutoWeb.Views.Ads(model);
		view.render();

		view.$el.appendTo(configParams.envResult);

		 $('div.aw-colmiddle').each(function(i,el){
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

	/*function get(url){
		return new Promise(function (resolve,reject){
			var req = new XMLHttpRequest();
			req.open('GET', url);

			req.onload = function(){
				if(req.status == 200){
					resolve(req.response);
				}else{
					reject(Error(req.statusText));
				}
			};

			req.onerror = function(){
				reject(Error("Network Error"));
			};

			req.send();
		});
	}

	var url_aw = 'http://192.168.0.111:3000/ads/'+configParams.keyword+'/'+configParams.envSource+'/'+configParams.envPublisher+'/'+configParams.envCount;
	get(url_aw).then(function(response){
		console.log("Success", response);
	}, function(error){
		cosole.error('Failed', error);
	})*/

	var xhr = $.ajax({
		type:'GET',
		url:'http://192.168.0.111:3000/ads/'+configParams.keyword+'/'+configParams.envSource+'/'+configParams.envPublisher+'/'+configParams.envCount,
		dataType : 'jsonp',
		async: false,
		crossDomain : true
	})

	xhr.done(function (data){
		console.log("hola mundo");
		console.log(data);
		data.forEach(function(item){
			window.collections.ads.add(item);
		});
	}).fail(function (err) {
		//console.log('failed');
	});

	console.log(xhr);
	console.log("http://192.168.0.111:3000/ads/"+configParams.keyword+"/"+configParams.envSource+"/"+configParams.envPublisher+"/"+configParams.envCount);
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