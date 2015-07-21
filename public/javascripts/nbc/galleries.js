/*******************************************************************************
* @demo		NBC Photo Galleries
* @author	Jaroslaw Predki
*******************************************************************************/

var nbcGalleriesElement		= '#nbc-galleries';
var nbcPhotosElement		= '#nbc-photos';
var nbcFullSizeElement		= '#nbc-fullsize';

// models
// photo model
var Photo					= Backbone.Model.extend({

	defaults: {
		// id +
		caption:		'',
		credit:			'',
		width:			'',
		height:			'',
		url:			''
	}
});

// gallery info model
var GalleryInfo				= Backbone.Model.extend({

	defaults: {
		// id +
		name:			'',
		description:	'',
		data:			'',
		url:			''
	}
});

// collections
// photo collection data
var GalleryList				= Backbone.Collection.extend({

	model:				Photo,
	url:				'/nbc-photos-api/gallery/',		// needs gallery id added at the end before loading

	parse: function( data ) {
		return data.photos;
	}

});

// gallery collection data
var GalleryInfoList			= Backbone.Collection.extend({

	model:				GalleryInfo,
	url:				'/nbc-galleries-api/',

	parse: function( data ) {
		return data.galleries;
	}

});

// views
// photo model view
var PhotoView				= Backbone.View.extend({

	tagName: 			'div',
	className:			'nbc-photo',

	events: {
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
		console.log( 'show full!' );

		var fullSizeView		= new FullSizeView({ model: this.model });
		// render and add html to element
		$( nbcPhotosElement ).css( 'display', 'none' );
		$( nbcFullSizeElement ).html( fullSizeView.render().el );
		$( nbcFullSizeElement ).css( 'display', 'block' );

		return this;
	}

});

var GalleryInfoView			= Backbone.View.extend({

	tagName: 			'div',
	className:			'nbc-gallery-info',

	events: {
		"click":			"showGallery"
	},

	render: function() {
		// get the template, compile it and populate with model data
		var template 		= $( '#nbc-gallery-info-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );
		// add rendered html to element
		this.$el.html( html );

		return this;
	},

	showGallery: function() {
		console.log( 'show gallery!' );

		var galleryList		= new GalleryList({ url: this.model.attributes.data });
		galleryList.url		= this.model.attributes.data;

		// fetch data on success render the list
		galleryList.fetch({

			success: function( data ) {

				var galleryView 	= new GalleryView({ collection: data });
				$( nbcGalleriesElement ).css( 'display', 'none' );
				$( nbcPhotosElement ).html( galleryView.render().el );
				$( nbcPhotosElement ).css( 'display', 'block' );

				console.log( 'Gallery Ready!' );
			},

			error: function( jqXHR, textStatus, errorThrown ) {

				console.log( 'Gallery Error!\n' + textStatus.responseText );
			}
		});

		return this;
	}

});


// photo model view (preview)
var FullSizeView			= Backbone.View.extend({

	tagName: 			'div',
	className:			'nbc-fullsize',

	events: {
		"click":			"hideFullSize"
	},

	render: function() {
		//if ( !this.model )	{ return this; }
		// get the template, compile it and populate with model data
		var template 		= $( '#nbc-fullsize-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );
		// add rendered html to element
		this.$el.html( html );

		return this;
	},

	hideFullSize: function() {
		// render and add html to element
		$( nbcFullSizeElement ).css( 'display', 'none' );
		$( nbcFullSizeElement ).html( '' );
		$( nbcPhotosElement ).css( 'display', 'block' );

		return this;
	}

});

// photo list view
var GalleryView			= Backbone.View.extend({

	tagName: 			'div',
	className: 			'nbc-photos',

	render: function() {

		this.collection.each( function( photo ) {

			var photoView		= new PhotoView({ model: photo });
			this.$el.append( photoView.render().el );

		}, this );

		return this;
	}

});

var GalleriesView			= Backbone.View.extend({

	tagName: 			'div',
	className: 			'nbc-galleries',

	render: function() {

		this.collection.each( function( gallery ) {

			var galleryInfoView		= new GalleryInfoView({ model: gallery });
			this.$el.append( galleryInfoView.render().el );

		}, this );

		return this;
	}

});

$(function() {

	// initialize a gallery
	var demoTitle			= 'NBC Galleries';
	var galleriesList		= new GalleryInfoList();
	console.log( 'Initializing ' + demoTitle + '...' );

	// fetch data on success render the list
	galleriesList.fetch({

		success: function( data ) {

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
