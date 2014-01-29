var AppAw = function (){
	//environment variables configuration

	var config = {
		envIdjs 	: 'autowebjs',
		envZip		: 'data-zipcode',
		envState	: 'data-statecode',
		envCount	: 'data-count',
		envSource	: 'data-source',
		envPublisher : 'data-publisher',
		envResult	: 'data-result',
		host		: '{host}/public/js'
	};

	var scripts=[
		"https://code.jquery.com/jquery.js",
		"../../public/js/vendors/underscore.js",
		"../../public/js/vendors/backbone.js",
		"../../public/js/vendors/swig.js",
		"../../public/js/init.js",
		"../../public/js/app/models.js",
		"../../public/js/app/collections.js",
		"../../public/js/app/views.js",
		"../../public/js/app.js"
	];

	var cssFilesExt=[
		"http://fonts.googleapis.com/css?family=Roboto:400,900,700",
		"http://fonts.googleapis.com/css?family=Sintony:400,700"
	];	

	var cssFiles=[
		"../../public/css/bootstrap.min.css",
		"../../public/css/custom.css",
		"../../public/css/ads_style.css"
	];	

	


	return {
		init : function(){
			//console.log("init function");
			//pageScriptLst=document.getElementsByTagName("script");	
			var pageCssLst=document.getElementsByTagName("link");

			//CSS files to load async
			cssFiles.forEach(function(cssItem){
				AppAw.loadScriptFiles(cssItem, function() {});
			});

			//CSS External files  to load async
			cssFilesExt.forEach(function(cssItem){
				AppAw.loadScriptFiles(cssItem, function() {});
			});

			//IE js scripts to load async
			var getIE=AppAw.getInternetExplorerVersion();
			if ((getIE>0)&&(getIE<9)){
				AppAw.loadScriptFiles("https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js", function() {});
				AppAw.loadScriptFiles("https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js", function() {});
			};

			//app js dependencies to load Sync

			AppAw.loadScriptFiles(scripts[0], function() {                    
                    AppAw.loadScriptFiles(scripts[1], function(){
                        AppAw.loadScriptFiles(scripts[2], function(){
                        	AppAw.loadScriptFiles(scripts[3], function(){
	                        	AppAw.loadScriptFiles(scripts[4], function(){
		                        	AppAw.loadScriptFiles(scripts[5], function(){
			                        	AppAw.loadScriptFiles(scripts[6], function(){
				                        	AppAw.loadScriptFiles(scripts[7], function(){
				                        		AppAw.loadScriptFiles(scripts[8], function(){
					                    		});	
					                    	});
				                    	});
			                    	});
		                    	});
	                    	});
                    	});
                    });
			});

		
		},//END INIT FUNCTION

		loadScriptFiles : function(fileName,onload){
			var itemGetExt=fileName.split(".");
			var itemExt=itemGetExt[itemGetExt.length-1];

			

			if (itemExt=="js"){ 
				//console.log(fileName);
				//var pageScriptLst=document.getElementsByTagName("script");
				//var libraryExist=AppAw.dependencyStatus(fileName);

				

				var scriptFile=document.createElement('script');
				scriptFile.setAttribute("type","text/javascript");
				scriptFile.setAttribute("src", fileName);

				

				if (typeof scriptFile!="undefined"){
						scriptFile.onload = scriptFile.onreadystatechange = function() {
			                if (scriptFile.readyState) {
			                    if (scriptFile.readyState === 'complete' || scriptFile.readyState === 'loaded') {
			                        scriptFile.onreadystatechange = null;
			                        onload();
			                    }
			                }
			                else {
			                    onload();
			                };
		            	};	 

						document.getElementsByTagName("head")[0].appendChild(scriptFile);         	
				};
				


				


			 }
			else{ 
				var scriptFile=document.createElement("link")
				scriptFile.setAttribute("rel", "stylesheet")
				scriptFile.setAttribute("type", "text/css")
				scriptFile.setAttribute("href", fileName)

				if (typeof scriptFile!="undefined"){
	            	document.getElementsByTagName("head")[0].appendChild(scriptFile);
				};
			}
			
			

		},//END LOADSCRIPTS FUNCTION


		dependencyStatus : function(fileName){
			var fileNameSplit=fileName.split("/");
			var itemToSearch=fileNameSplit[(fileNameSplit.length-1)];
			itemToSearch=itemToSearch.replace(".js","");

			var dependencyList=document.getElementsByTagName("script");
			
			var dependencyResult=0;
			console.log("longitud de la lista "+dependencyList.length);
			for(var i=0; i<dependencyList.length; i++){
				console.log("lista: "+dependencyList[i].src+" item a buscar "+itemToSearch+" items# "+i);	
				dependencyResult=dependencyList[i].src.indexOf(itemToSearch);						
				if (dependencyResult>0){
					console.log("js Encontrado "+dependencyResult);
					//return dependencyResult;				
					break;
				};				
			};
			console.log(dependencyResult+" envio")
			return dependencyResult;
		},//END DEPENDENCYSTATUS FUNCTION

		getInternetExplorerVersion: function(){
		  var rv = -1;
		  if (navigator.appName == 'Microsoft Internet Explorer'){
			    var ua = navigator.userAgent;
			    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			    if (re.exec(ua) != null)
			      rv = parseFloat( RegExp.$1 );
			  }
			  else if (navigator.appName == 'Netscape')
			  {
			    var ua = navigator.userAgent;
			    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
			    if (re.exec(ua) != null)
			      rv = parseFloat( RegExp.$1 );
			  }
		  
		  return rv;
		} //END GETINTERNETEXPLORERVERSION FUNCTION

	}; //END RETURN
		
}();//END APPAW FUNCTION
AppAw.init();