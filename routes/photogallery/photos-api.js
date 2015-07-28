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
// @function		getPhotoByID
// @description		Returns the json document for a single photo.
//------------------------------------------------------------------------------
var getPhotoByID			= function( file, req, res, next ) {
	fs.readFile( './public/json/' + file, 'utf8', function( error, data ) {
		if ( error ) {
			throw 'Can not find /public/json/' + file;
		} else {
			res.json( JSON.parse( searchByParamater( data, 'id', req.params.id )));
		}
	});
};

//------------------------------------------------------------------------------
// @route			GET /
// @description		Returns a list of photos.
//------------------------------------------------------------------------------
router.get( '/', function( req, res, next ) {
	fs.readFile( './public/json/' + photosFile, 'utf8', function( error, data ) {
		if ( error ) {
			throw 'Can not find /public/json/' + photosFile;
		} else {
			res.json( JSON.parse( data ));
		}
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
