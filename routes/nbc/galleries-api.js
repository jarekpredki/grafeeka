/*******************************************************************************
* @demo		REST API: 	GET 	/nbc-galleries-api
*								/nbc-galleries-api/info/{id}
*								/nbc-galleries-api/data/{id}
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var fs 						= require( 'fs' );
var request 				= require( 'request' );
var router 					= express.Router();

var galleriesFile			= 'nbc-galleries.json';

//------------------------------------------------------------------------------
// @function		searchByParamater
// @description		Helper function to search through a json object (inside it's 'nav'
//					list and returns the requested matching item.
//------------------------------------------------------------------------------
var searchByParamater		= function( data, param, value ) {
	// parse the data json into an object and get it's count of 'galleries
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
// @function		getGalleryByID
// @description		Returns a json document regarding one gallery.
//------------------------------------------------------------------------------
var getGalleryByID			= function( file, req, res, next ) {
	fs.readFile( './public/json/' + file, 'utf8', function( error, data ) {
		if ( error ) 		{ throw 'Can\'t find ' + file + ' in /public/json/'; }

		res.writeHead( 200, { 'content-type': 'application/json', 'Cache-Control': 'max-age=86400', 'Expires': new Date(Date.now() + 86400000 ).toUTCString() });	// 24 hours
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
		var json 	= JSON.parse( data ).results[0];
		data		= JSON.stringify( json );
		//console.log( data || '' );
		res.writeHead( 200, { 'content-type': 'application/json', 'Cache-Control': 'max-age=86400', 'Expires': new Date(Date.now() + 86400000 ).toUTCString() });
		res.write( data );
		res.end();
	});
};

//------------------------------------------------------------------------------
// @route			GET /
// @description		Returns a list of galleries. From local info list.
//------------------------------------------------------------------------------
router.get( '/', function( req, res, next ) {
	fs.readFile( './public/json/' + galleriesFile, 'utf8', function( error, data ) {
		if ( error ) 		{ throw 'Can\'t to find ' + galleriesFile + ' in /public/json/'; }

		res.writeHead( 200, { 'content-type': 'application/json', 'Cache-Control': 'max-age=86400', 'Expires': new Date(Date.now() + 86400000 ).toUTCString() });
		res.write( data );
		res.end();

	});
});

//------------------------------------------------------------------------------
// @route			GET /info/:id
// @description		Returns gallery local info, including its id, name, url.
//------------------------------------------------------------------------------
router.get( '/info/:id', function( req, res, next ) {
	getGalleryByID( galleriesFile, req, res, next );
});

//------------------------------------------------------------------------------
// @route			GET /data/:id
// @description		Returns gallery json document, from remote url.
//------------------------------------------------------------------------------
router.get( '/data/:id', function( req, res, next ) {
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