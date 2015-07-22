/*******************************************************************************
* @demo		NBC Photo Galleries
* @author	Jaroslaw Predki
*******************************************************************************/

var nbcGalleriesElement		= '#nbc-galleries';
var nbcPhotosElement		= '#nbc-photos';
var nbcFullSizeElement		= '#nbc-fullsize';

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

// photo collection data
var GalleryList				= Backbone.Collection.extend({

	model:				Photo,
	url:				'/nbc-photos-api/gallery/',		// needs gallery id added at the end before loading

	parse: function( data ) {
		return data.photos;
	}

});

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

$(function() {

	// initialize a gallery
	var demoTitle			= 'NBC Gallery';
	var galleryID			= this.location.pathname.replace( '/nbc/', '' );
	var galleryList			= new GalleryList();
	galleryList.url			= '/nbc-photos-api/gallery/' + galleryID;
	console.log( 'Initializing ' + demoTitle + ' ' + galleryID + '...' );

	// fetch data on success render the list
	galleryList.fetch({

		success: function( data ) {

			var galleryView 	= new GalleryView({ collection: data });
			$( nbcGalleriesElement ).css( 'display', 'none' );
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
