/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

// models
// demo model data
var Demo					= Backbone.Model.extend({

	defaults: {
		// id +
		name:			'',
		description:	'',
		url:			''
	}

});

// collections
// demo collection data
var DemoList				= Backbone.Collection.extend({

	model:				Demo,
	url:				'/demos-api',

	parse: function( data ) {
		return data.demos;
	}

});

// views
// demo model view
var DemoView				= Backbone.View.extend({

	tagName: 			'li',
	className:			'demo',

	render: function() {

		var template 		= $( '#demo-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );

		this.$el.html( html );

		return this;
	}

});

// demo list view
var DemoListView			= Backbone.View.extend({

	tagName: 			'ul',
	className: 			'demos',

	render: function() {

		this.collection.each( function( demo ) {

			var demoView		= new DemoView({ model: demo });
			this.$el.append( demoView.render().el );

		}, this );

		return this;
	}

});

/*******************************************************************************
*******************************************************************************/
