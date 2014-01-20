AutoWeb.Collections.Ads = Backbone.Collection.extend({
	model 	: AutoWeb.Models.Ads,
	url		: '/xml/',
	name	: 'ads'
});