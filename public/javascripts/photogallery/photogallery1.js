/*******************************************************************************
* @demo		Photo Gallery: 1
* @author	Jaroslaw Predki
*******************************************************************************/

// models
// photp model data
var Photo					= Backbone.Model.extend({

	defaults: {
		// id +
		name:			'',
		description:	'',
		url:			''
	}
});

// collections
// photo collection data
var PhotoList				= Backbone.Collection.extend({

	model:				Photo,
	url:				'/photos-api',

	parse: function( data ) {
		return data.photos;
	}

});

// views
// photo model view
var PhotoView				= Backbone.View.extend({

	tagName: 			'div',
	className:			'pg1-photo',

	events: {
		"click":			"showFullSize"
	},

	render: function() {
		// get the template, compile it and populate with model data
		var template 		= $( '#photo-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );
		// add rendered html to element
		this.$el.html( html );

		return this;
	},

	showFullSize: function() {
		console.log( 'show full!' );

		var fullSizeView		= new FullSizeView({ model: this.model });
		// render and add html to element
		$( '#pg1-fullsize' ).html( fullSizeView.render().el );
		$( '#pg1-fullsize' ).css( 'display', 'block' );
		$( '#pg1-photos' ).css( 'opacity', '0' );

		return this;
	}

});

// photo model view (preview)
var FullSizeView			= Backbone.View.extend({

	tagName: 			'div',
	className:			'pg1-photo-fullsize',

	events: {
		"click":			"hideFullSize"
	},

	render: function() {
		if ( !this.model )	{ return this; }
		// get the template, compile it and populate with model data
		var template 		= $( '#photo-fullsize-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );
		// add rendered html to element
		this.$el.html( html );

		return this;
	},

	hideFullSize: function() {
		// render and add html to element
		$( '#pg1-fullsize' ).html( '' );
		$( '#pg1-photos' ).css( 'opacity', '1' );
		$( '#pg1-fullsize' ).css( 'display', 'none' );

		return this;
	}

});

// photo list view
var PhotoListView			= Backbone.View.extend({

	tagName: 			'div',
	className: 			'pg1-photos',

	render: function() {

		this.collection.each( function( photo ) {

			var photoView		= new PhotoView({ model: photo });
			this.$el.append( photoView.render().el );

		}, this );

		return this;
	}

});


$(function() {

	// initialize a photo list
	var demoTitle			= 'Photo Gallery: Vertical Style';
	var photoList			= new PhotoList();
	var photosElement		= '#pg1-photos';

	console.log( 'Initializing ' + demoTitle + '...' );

	// fetch data on success render the list
	photoList.fetch({

		success: function( data ) {

			var photoListView 	= new PhotoListView({ collection: data });
			$( photosElement ).html( photoListView.render().el );

			console.log( demoTitle + ' Ready!' );
		},

		error: function( jqXHR, textStatus, errorThrown ) {

			console.log( demoTitle + ' Error!\n' + textStatus.responseText );
		}
	});
});

/*******************************************************************************
*******************************************************************************/
