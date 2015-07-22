/*******************************************************************************
* @demo		NBC Photo Galleries
* @author	Jaroslaw Predki
*******************************************************************************/

// page elements
var nbcPhotosElement		= '#nbc-photos';
var nbcFullSizeElement		= '#nbc-fullsize';
// gallery photo list; needs gallery id attached to the end for loading
var nbcGalleryPhotosURL		= '/nbc-photos-api/gallery/';
// galleries url
var nbcGalleriesURL			= '/nbc/';

//------------------------------------------------------------------------------
// MODEL: Photo
// Holds info on a single photo instnce.
var Photo				= Backbone.Model.extend({

	defaults: {
		// id +
		caption:		'',
		credit:			'',
		width:			'',
		height:			'',
		url:			''
	}
});

//------------------------------------------------------------------------------
// COLLECTION: Gallery
// Holds a list of Photo instances and single gallery info.
var Gallery				= Backbone.Collection.extend({

	model:				Photo,
	// photo list url; needs gallery id added at the end before loading
	url:				nbcGalleryPhotosURL,

	// parse the photos list from loaded data
	parse: function( data ) {
		return data.photos;
	}

});

//------------------------------------------------------------------------------
// VIEW: PhotoView
// Display logic for a single photo instance.
var PhotoView				= Backbone.View.extend({

	tagName: 			'div',
	className:			'nbc-photo',

	events: {
		// click to hide photo list and show full size photo
		"click":			"showFullSize"
	},

	render: function() {
		// get the template, compile it and populate with model data
		var template 		= $( '#nbc-photo-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );
		// add rendered html to element
		this.$el.html( html );

		return this;
	},

	showFullSize: function() {
		// create a full size view and render it
		var fullSizePhotoView	= new FullSizePhotoView({ model: this.model });
		// hide photo list and show full size photo only
		$( nbcPhotosElement ).css( 'display', 'none' );
		$( nbcFullSizeElement ).html( fullSizePhotoView.render().el );
		$( nbcFullSizeElement ).css( 'display', 'block' );

		return this;
	}

});

//------------------------------------------------------------------------------
// VIEW: FullSizePhotoView
// Display logic for a single photo instance, in fullsize.
var FullSizePhotoView		= Backbone.View.extend({

	tagName: 			'div',
	className:			'nbc-fullsize',

	events: {
		// click to hide full size photo and show photo list
		"click":			"hideFullSize"
	},

	render: function() {
		// get the template, compile it and populate with model data
		var template 		= $( '#nbc-fullsize-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );
		// add rendered html to element
		this.$el.html( html );

		return this;
	},

	hideFullSize: function() {
		// hide full size photo and show photo list
		$( nbcFullSizeElement ).css( 'display', 'none' );
		$( nbcFullSizeElement ).html( '' );
		$( nbcPhotosElement ).css( 'display', 'block' );

		return this;
	}

});

//------------------------------------------------------------------------------
// VIEW: GalleryView
// Display logic for a single gallery (photo list).
var GalleryView			= Backbone.View.extend({

	tagName: 			'div',
	className: 			'nbc-photos',

	render: function() {
		// run the collection of models, and redner each photo
		this.collection.each( function( photo ) {
			var photoView		= new PhotoView({ model: photo });
			this.$el.append( photoView.render().el );
		}, this );

		return this;
	}

});

//------------------------------------------------------------------------------
$(function() {

	// initialize a gallery
	var demoTitle			= 'NBC Gallery';
	var gallery				= new Gallery();
	// get gallery id from the location path
	var galleryID			= this.location.pathname.replace( nbcGalleriesURL, '' );
	console.log( 'Initializing ' + demoTitle + ' ' + galleryID + '...' );
	// set the gallery url (add the gallery id to the path)
	gallery.url				= nbcGalleryPhotosURL + galleryID;
	// fetch data and render the view
	gallery.fetch({

		success: function( data ) {
			// create a new gallery view (photo list)
			var galleryView 	= new GalleryView({ collection: data });
			// show a single gallery (its photo list)
			$( nbcPhotosElement ).html( galleryView.render().el );
			$( nbcPhotosElement ).css( 'display', 'block' );

			console.log( 'Gallery ' + galleryID + ' Ready!' );
		},

		error: function( jqXHR, textStatus, errorThrown ) {

			console.log( 'Gallery ' + galleryID + ' Error!\n' + textStatus.responseText );
		}
	});

});

/*******************************************************************************
*******************************************************************************/
