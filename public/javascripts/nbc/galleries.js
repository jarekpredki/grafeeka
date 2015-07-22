/*******************************************************************************
* @demo		NBC Photo Galleries
* @author	Jaroslaw Predki
*******************************************************************************/

// page elements
var nbcGalleriesElement		= '#nbc-galleries';
// gallery list url
var nbcGalleryListURL		= '/nbc-galleries-api/';

//------------------------------------------------------------------------------
// MODEL: Gallery
// Holds info on a single gallery (local info)
var Gallery					= Backbone.Model.extend({

	defaults: {
		// id +
		name:			'',
		description:	'',
		data:			'',
		url:			''
	}
});

//------------------------------------------------------------------------------
// COLLECTION: Galleries
// Holds a list of gallery instances, and gallery list info.
var Galleries				= Backbone.Collection.extend({

	model:				Gallery,
	// gallery list url
	url:				nbcGalleryListURL,
	// parse the galleries list
	parse: function( data ) {
		return data.galleries;
	}

});

//------------------------------------------------------------------------------
// VIEW: GalleryView
// Render logic for a single gallery instance.
var GalleryView				= Backbone.View.extend({

	tagName: 			'div',
	className:			'nbc-gallery-info',

	render: function() {
		// get the template, compile it and populate with model data
		var template 		= $( '#nbc-gallery-info-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );
		// add rendered html to element
		this.$el.html( html );

		return this;
	}

});

//------------------------------------------------------------------------------
// VIEW: GalleriesView
// Render logic for a a list of galleries.
var GalleriesView			= Backbone.View.extend({

	tagName: 			'div',
	className: 			'nbc-galleries',

	render: function() {
		// run the collection of models and render each gallery view
		this.collection.each( function( gallery ) {
			var galleryView		= new GalleryView({ model: gallery });
			this.$el.append( galleryView.render().el );

		}, this );

		return this;
	}

});

//------------------------------------------------------------------------------
$(function() {

	// initialize a gallery list
	var demoTitle			= 'NBC Galleries';
	var galleries			= new Galleries();
	console.log( 'Initializing ' + demoTitle + '...' );
	// fetch data and render view
	galleries.fetch({

		success: function( data ) {
			// create a new gallery list view, and render it
			var galleriesView 	= new GalleriesView({ collection: data });
			$( nbcGalleriesElement ).html( galleriesView.render().el );

			console.log( demoTitle + ' Ready!' );
		},

		error: function( jqXHR, textStatus, errorThrown ) {

			console.log( demoTitle + ' Error!\n' + textStatus.responseText );
		}
	});
});

/*******************************************************************************
*******************************************************************************/
