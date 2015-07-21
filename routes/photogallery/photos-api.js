/*******************************************************************************
* @demo		REST API: GET /photos-api
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var fs 						= require( 'fs' );

var router 					= express.Router();

var photosFile				= 'photos.json';

//------------------------------------------------------------------------------
// @function		searchByParamater
// @description		Helper function to search through a json object (inside it's 'nav'
//					list and returns the returns the requested matching item.
//------------------------------------------------------------------------------
var searchByParamater		= function( data, param, value ) {
	// parse the data json into an object and get it's count of 'pages'
	var page, i, json = JSON.parse( data ), count = json.photos.length;
	// loop through the pages and find the requested one
	for ( i = 0; i < count; i++ ) {
		page					= json.photos[i];

		if ( page[ param ] === value ) {
			break;
		}
	}
	// stringify it into a json string
    return JSON.stringify( page );
};

//------------------------------------------------------------------------------
var getPhotoByID			= function( file, req, res, next ) {

	// this method of getting the json data list is a demo only solution.
	// normally this data would come from a database.
	fs.readFile( './public/json/' + file, 'utf8', function( error, data ) {

		if ( error ) 		{ throw 'Can\'t find ' + file + ' in /public/json/'; }

		res.writeHead( 200, { 'content-type': 'application/json' });
		res.write( searchByParamater( data, 'id', req.params.id ));
		res.end();
	});
};

//------------------------------------------------------------------------------
// @route			GET /
// @description		Returns a list of photos.
//------------------------------------------------------------------------------
router.get( '/', function( req, res, next ) {

	// this method of getting the json data list is a demo only solution.
	// normally this data would come from a database.
	fs.readFile( './public/json/photos.json', 'utf8', function( error, data ) {

		if ( error ) 		{ throw 'Can\'t to find photos.json in /public/json/'; }

		res.writeHead( 200, { 'content-type': 'application/json' });
		res.write( data );
		res.end();

	});
});

//------------------------------------------------------------------------------
// @route			GET /id/:id
// @description		Returns the requested page matched by its id parameter.
//------------------------------------------------------------------------------
router.get( '/id/:id', function( req, res, next ) {
	getPhotoByID( photosFile, req, res, next );
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
