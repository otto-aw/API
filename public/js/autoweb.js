//Setting each element of the APP
/*window.AutoWeb = {};

AutoWeb.Views = {};
AutoWeb.Collections = {};
AutoWeb.Models = {};

window.app = {};
window.views = {};
window.collections = {};

//BackBone configuration
AutoWeb.Models.Ads = Backbone.Model.extend({
	url : '/ads'
});

AutoWeb.Collections.Ads = Backbone.Collection.extend({
	model : AutoWeb.Models.Ads,
	url : '/ads',
	name : 'ads'
});

AutoWeb.Views.Ads = Backbone.View.extend({
	initialize : function (model){
		var template = ('<div class="aw-row row-styl">'+
							'<a id="{{ add_id }}" class="aw-link" target="_blank" href="{{ url }}">'+
								'<div class="aw-img">'+
									'<span><img alt="{{ title }}" src="{{ custom_image_url_1 }}"></span>'+
								'</div>'+
								'<div class="aw-colmiddle">'+
									'<div class="aw-title"> {{ title }} </div>'+
									'<div class="aw-description">{{ description }}</div>'+
								'</div>'+
								'<div class="aw-button">'+
									'<div class="aw-button-image">'+
										'<div class="aw-button-banner"></div>'+
									'</div>'+
								'</div>'+
							'</a>'+
						'</div>');
		var self = this;
		this.model = model

		this.model.on('change', function() {
			self.render();
		})		

		this.template = swig.compile( template );
	},

	render : function (data){
		var data = this.model.toJSON();
		var html = this.template(data);

		this.$el.html( html );

		return this;
	}
});*/

//App

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
		//"/js/vendors/lazyload.js",
		"/js/vendors/underscore.js",
		"/js/vendors/backbone.js",
		"/js/vendors/swig.js",
		"/js/init.js",
		"/js/app/models.js",
		"/js/app/collections.js",
		"/js/app/views.js",
		"/js/app.js"
	];

	return {
		init : function(){
			var location = document.getElementById(config.envIdjs).getAttribute ("src");
			var host = location.split('/',3);
			config.host = config.host.replace('{host}', host[2]);

			var src;
			var script;
			var pendingScripts = [];
			var firstScript = document.scripts[0];

			// Watch scripts load in IE
			function stateChange() {
			  // Execute as many scripts in order as we can
			  var pendingScript;
			  while (pendingScripts[0] && pendingScripts[0].readyState == 'loaded') {
			    pendingScript = pendingScripts.shift();
			    // avoid future loading events from this script (eg, if src changes)
			    pendingScript.onreadystatechange = null;
			    // can't just appendChild, old IE bug if element isn't closed
			    firstScript.parentNode.insertBefore(pendingScript, firstScript);
			  }
			}

			// loop through our script urls
			while (src = scripts.shift()) {
			  if ('async' in firstScript) { // modern browsers
			    script = document.createElement('script');
			    script.async = false;
			    script.src = src;
			    document.head.appendChild(script);
			  }
			  else if (firstScript.readyState) { // IE<10
			    // create a script and add it to our todo pile
			    script = document.createElement('script');
			    pendingScripts.push(script);
			    // listen for state changes
			    script.onreadystatechange = stateChange;
			    // must set src AFTER adding onreadystatechange listener
			    // else we’ll miss the loaded event for cached scripts
			    script.src = src;
			  }
			  else { // fall back to defer
			    document.write('<script src="' + src + '" defer></'+'script>');
			  }
			};


			/*
			scripts.forEach(function(scriptItem) {
    			//loadScritFiles(scriptItem, "js");
    			AppAw.loadScriptFiles(scriptItem,"js");
    		//$.getScript(scriptItem);
    		});
    		*/
    		/*
    		AppAw.loadScriptFiles("/js/vendors/lazyload.js",function(){
    			$(document).ready(function() {
                    LazyLoad.js("/js/app/app.js", function () {
					  console.log('all files have been loaded');
					});
                });
    		});

*/

    		


			//console.log(config.host);
			//console.log("Autoweb.js");
		}
/*
		loadScriptFiles : function(filename,ext){
			if (ext=="js"){ 
				var scriptFile=document.createElement('script')
				scriptFile.setAttribute("type","text/javascript")
				scriptFile.setAttribute("src", filename)
				scriptFile.setAttribute("async", false)
		  		scriptFile.setAttribute("defer", "defer")
			 }
			
			else if (ext=="css"){ 
				var scriptFile=document.createElement("link")
				scriptFile.setAttribute("rel", "stylesheet")
				scriptFile.setAttribute("type", "text/css")
				scriptFile.setAttribute("href", filename)
			}
			
			if (typeof scriptFile!="undefined"){

				/*
				scriptFile.onload = scriptFile.onreadystatechange = function() {
	                if (scriptFile.readyState) {
	                	console.log("state1: " + scriptFile.readyState);
	                    if (scriptFile.readyState === 'complete' || scriptFile.readyState === 'loaded') {
	                        scriptFile.onreadystatechange = null;
	                        scriptFile.onload();
	                        //console.log("state2: " + scriptFile.readyState);
	                    }
	                }
	                else {
	                    //scriptFile.onload();
	                    //console.log("state3: " + scriptFile.readyState);
	                }
            	};
            	*/

            	/*
            	var flag=false;
            	var progress=false;
            	while (!flag){
            		if (progress===false){
            			progress=true;
            			scriptFile.onload = function(){
            				flag=true; console.log("cargado");
            			};
            		};
            		
            	};
            	*/
            	//document.write(scriptFile);
    /*        	
				document.getElementsByTagName("head")[0].appendChild(scriptFile);
*/
				

				//scriptFile.onload=scriptFile;
			//}

		//},



	//}

	
}();
AppAw.init();