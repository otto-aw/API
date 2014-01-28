AutoWeb.Views.Ads = Backbone.View.extend({
	initialize : function (model){
		var template = ('<div class="aw-row row-styl">'+
							'<a id="{{ add_id }}" class="aw-link" target="_blank" href="{{ url }}">'+
								'<div class="aw-img">'+
									'<span><img alt="{{ title }}" src="{{ img }}"></span>'+
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

});