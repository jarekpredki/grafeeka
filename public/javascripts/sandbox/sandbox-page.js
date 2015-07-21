/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

// models
//------------------------------------------------------------------------------
var Page					= Backbone.Model.extend({

	defaults: {
		// id +
		title:			'',
		subtitle:		'',
		url:			'',
		route:			''
	}

});

// collections
//------------------------------------------------------------------------------
var PageList				= Backbone.Collection.extend({

	model:				Page,
	url:				'/pages-api/sandbox',

	parse: function( data ) {
		return data.nav;
	}

});

// views
//------------------------------------------------------------------------------
var PageView				= Backbone.View.extend({

	tagName: 			'li',
	className:			'page',

	render: function() {
		var template 		= $( '#nav-item-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );

		this.$el.html( html );

		return this;
	}

});

//------------------------------------------------------------------------------
var PageListView			= Backbone.View.extend({

	tagName: 			'ul',
	className: 			'pages',

	render: function() {

		this.collection.each( function( page ) {

			var pageView		= new PageView({ model: page });
			this.$el.append( pageView.render().el );

		}, this );

		return this;
	}

});

/*******************************************************************************
*******************************************************************************/
