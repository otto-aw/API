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

			
			scripts.forEach(function(scriptItem) {
    			//loadScritFiles(scriptItem, "js");
    			AppAw.loadScriptFiles(scriptItem,"js");
    		//$.getScript(scriptItem);
    		});
    		
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
		
		}, //END INIT FUNCTION

		loadScriptFiles : function(filename,ext){
			if (ext=="js"){ 
				var scriptFile=document.createElement('script')
				scriptFile.setAttribute("type","text/javascript")
				scriptFile.setAttribute("src", filename)
				//scriptFile.setAttribute("async", false)
		  		//scriptFile.setAttribute("defer", "defer")
			 }
			
			else if (ext=="css"){ 
				var scriptFile=document.createElement("link")
				scriptFile.setAttribute("rel", "stylesheet")
				scriptFile.setAttribute("type", "text/css")
				scriptFile.setAttribute("href", filename)
			}
			
			if (typeof scriptFile!="undefined"){

				
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
	                    scriptFile.onload();
	                    //console.log("state3: " + scriptFile.readyState);

	                };


            	};
            	

           	
				

				
            	document.getElementsByTagName("head")[0].appendChild(scriptFile);
	//			scriptFile.onload=scriptFile;
			};

		//},



	} //END LOADSCRIPTS FUNCTION

	
}();
AppAw.init();