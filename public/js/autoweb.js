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

	return {
		init : function(){
			var location = document.getElementById(config.envIdjs).getAttribute ("src");
			var host = location.split('/',3);
			config.host = config.host.replace('{host}', host[2]);
			console.log(config.host);
		}



	}

	
}();
AppAw.init();