/*******************************************************************************
* @demo		REST API: 	GET 	/nbc-photos-api
*								/nbc-photos-api/info/{id}
*								/nbc-photos-api/gallery/{id}
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var fs 						= require( 'fs' );
var request 				= require( 'request' );
var router 					= express.Router();

var photosFile				= 'nbc-galleries.json';
var galleriesFile			= 'nbc-galleries.json';

//------------------------------------------------------------------------------
// @function		searchByParamater
// @description		Helper function to search through a json object (inside it's 'nav'
//					list and returns the returns the requested matching item.
//------------------------------------------------------------------------------
var searchByParamater		= function( data, param, value ) {
	// parse the data json into an object and get it's count of 'pages'
	var page, i, json = JSON.parse( data ), galleries = json.galleries, count = galleries.length;
	// loop through the pages and find the requested one
	for ( i = 0; i < count; i++ ) {
		page					= galleries[i];

		if ( page[ param ] === value ) {
			break;
		}
	}
	// stringify it into a json string
    return JSON.stringify( page );
};

//------------------------------------------------------------------------------
var getPhotoByID			= function( file, req, res, next ) {
	fs.readFile( './public/json/' + file, 'utf8', function( error, data ) {

		if ( error ) 		{ throw 'Can\'t find ' + file + ' in /public/json/'; }

		res.writeHead( 200, { 'content-type': 'application/json', 'Cache-Control': 'max-age=86400', 'Expires': new Date(Date.now() + 86400000 ).toUTCString() });
		res.write( searchByParamater( data, 'id', req.params.id ));
		res.end();
	});
};

//------------------------------------------------------------------------------
// @function		loadGalleryData
// @description		Loads gallery data from remote url regarding one gallery.
//------------------------------------------------------------------------------
var loadGalleryData			= function( gallery, req, res ) {
	request( gallery.url, function( error, response, body ) {
		if ( error ) 		{ throw 'Can\'t load ' + gallery.url; }
		var data 	= body.substr( 3, body.length - 4 );
		var json 	= JSON.parse( data ).results[0].gallery;
		data		= JSON.stringify( json );
		//console.log( data || '' );
		res.writeHead( 200, { 'content-type': 'application/json', 'Cache-Control': 'max-age=86400', 'Expires': new Date(Date.now() + 86400000 ).toUTCString() });
		res.write( data );
		res.end();
	});
};

//------------------------------------------------------------------------------
// @route			GET /
// @description		Returns a list of photos.
//------------------------------------------------------------------------------
router.get( '/', function( req, res, next ) {
	fs.readFile( './public/json/' + photosFile, 'utf8', function( error, data ) {
		if ( error ) 		{ throw 'Can\'t to find ' + photosFile + ' in /public/json/'; }

		res.writeHead( 200, { 'content-type': 'application/json', 'Cache-Control': 'max-age=86400', 'Expires': new Date(Date.now() + 86400000 ).toUTCString() });
		res.write( data );
		res.end();
	});
});

//------------------------------------------------------------------------------
// @route			GET /info/:id
// @description		Returns the requested page matched by its id parameter.
//------------------------------------------------------------------------------
router.get( '/info/:id', function( req, res, next ) {
	getPhotoByID( photosFile, req, res, next );
});

//------------------------------------------------------------------------------
// @route			GET /gallery/:id
// @description		Returns gallery json document, from remote url.
//------------------------------------------------------------------------------
router.get( '/gallery/:id', function( req, res, next ) {
	fs.readFile( './public/json/' + galleriesFile, 'utf8', function( error, data ) {
		if ( error ) 		{ throw 'Can\'t find ' + galleriesFile + ' in /public/json/'; }

		var gallery			= JSON.parse( searchByParamater( data, 'id', req.params.id ));

		if ( !gallery )		{ throw 'Can\'t find ' + galleriesFile + ' in /public/json/'; }

		loadGalleryData( gallery, req, res );
	});
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
