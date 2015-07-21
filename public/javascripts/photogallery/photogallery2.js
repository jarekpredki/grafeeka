/*******************************************************************************
* @demo		Photo Gallery: 2
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
// photo model view (thumbnail)
var PhotoView				= Backbone.View.extend({

	tagName: 			'div',
	className:			'pg2-photo',

	events: {
		"click":			"updatePreview"
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

	updatePreview: function() {
		var previewView		= new PhotoPreviewView({ model: this.model });
		// render and add html to element
		$( '#pg2-preview' ).html( previewView.render().el );

		return this;
	}

});

// photo model view (preview)
var PhotoPreviewView		= Backbone.View.extend({

	tagName: 			'div',
	className:			'pg2-photo-preview',

	render: function() {
		if ( !this.model )	{ return this; }
		// get the template, compile it and populate with model data
		var template 		= $( '#photo-preview-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );
		// add rendered html to element
		this.$el.html( html );

		return this;
	}

});

// photo list view
var PhotoListView			= Backbone.View.extend({

	tagName: 			'div',
	className: 			'pg2-photos',

	render: function() {
		// render each photo in the collection
		this.collection.each( function( photo ) {
			// create a new photo view and render
			var photoView		= new PhotoView({ model: photo });
			this.$el.append( photoView.render().el );

		}, this );

		return this;
	}
});

$(function() {

	// initialize a photo list
	var demoTitle			= 'Photo Gallery: Thumbnails and Preview Pane';
	var photoList			= new PhotoList();
	var photosElement		= '#pg2-photos';
	var previewElement		= '#pg2-preview';

	console.log( 'Initializing ' + demoTitle + '...' );


	// fetch data on success render the list
	photoList.fetch({

		success: function( data ) {
			// create a new photo list view and render it
			var photoListView 	= new PhotoListView({ collection: data });
			// render and add html to element
			$( photosElement ).html( photoListView.render().el );
			// if collection has photos, render the first one in the preview pane
			if ( data.length ) {
				// use the 1st photo in the collection (indexed:0)
				var previewView		= new PhotoPreviewView({ model: data.at(0) });
				// and draw it
				$( previewElement ).html( previewView.render().el );
			}
			console.log( demoTitle + ' Ready!' );
		},

		error: function( jqXHR, textStatus, errorThrown ) {
			// error case
			console.log( demoTitle + ' Error!\n' + textStatus.responseText );
		}
	});
});

/*******************************************************************************
*******************************************************************************/
