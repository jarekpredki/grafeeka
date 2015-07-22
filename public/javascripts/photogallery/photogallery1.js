/*******************************************************************************
* @demo		Photo Gallery: 1
* @author	Jaroslaw Predki
*******************************************************************************/

//------------------------------------------------------------------------------
// MODEL: Photo
var Photo					= Backbone.Model.extend({

	defaults: {
		// id +
		name:			'',
		description:	'',
		url:			''
	}
});

//------------------------------------------------------------------------------
// COLLECTION: Photos
var Photos					= Backbone.Collection.extend({

	model:				Photo,
	url:				'/photos-api',

	parse: function( data ) {
		return data.photos;
	}

});

//------------------------------------------------------------------------------
// VIEW: PhotoView
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
		var fullSizePhotoView	= new FullSizePhotoView({ model: this.model });
		// render and add html to element
		$( '#pg1-fullsize' ).html( fullSizePhotoView.render().el );
		$( '#pg1-fullsize' ).css( 'display', 'block' );
		$( '#pg1-photos' ).css( 'opacity', '0' );

		return this;
	}

});

//------------------------------------------------------------------------------
// VIEW: FullSizePhotoView
var FullSizePhotoView		= Backbone.View.extend({

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

//------------------------------------------------------------------------------
// VIEW: PhotosView
var PhotosView				= Backbone.View.extend({

	tagName: 			'div',
	className: 			'pg1-photos',

	render: function() {
		// render each photo in the collection list
		this.collection.each( function( photo ) {
			var photoView		= new PhotoView({ model: photo });
			this.$el.append( photoView.render().el );

		}, this );

		return this;
	}

});

//------------------------------------------------------------------------------
$(function() {

	// initialize a photo list
	var demoTitle			= 'Photo Gallery: Vertical Style';
	var photos				= new Photos();
	var photosElement		= '#pg1-photos';

	console.log( 'Initializing ' + demoTitle + '...' );
	// fetch data and render the photo list
	photos.fetch({

		success: function( data ) {
			var photosView 		= new PhotosView({ collection: data });
			$( photosElement ).html( photosView.render().el );

			console.log( demoTitle + ' Ready!' );
		},

		error: function( jqXHR, textStatus, errorThrown ) {

			console.log( demoTitle + ' Error!\n' + textStatus.responseText );
		}
	});
});

/*******************************************************************************
*******************************************************************************/
