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

// gallery collection data
var GalleryInfoList			= Backbone.Collection.extend({

	model:				GalleryInfo,
	url:				'/nbc-galleries-api/',

	parse: function( data ) {
		return data.galleries;
	}

});

var GalleryInfoView			= Backbone.View.extend({

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
