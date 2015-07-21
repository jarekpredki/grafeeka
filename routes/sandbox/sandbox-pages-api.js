/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var fs 						= require( 'fs' );

// get express router
var router 					= express.Router();

//------------------------------------------------------------------------------
// @function		searchByParamater
// @description		Helper function to search through a json object (inside it's 'nav'
//					list and returns the returns the requested matching item.
//------------------------------------------------------------------------------
var searchByParamater		= function( data, param, value ) {
	// parse the data json into an object and get it's count of 'pages'
	var page, i, json = JSON.parse( data ), count = json.nav.length;
	// loop through the pages and find the requested one
	for ( i = 0; i < count; i++ ) {
		page					= json.nav[i];

		if ( page[ param ] === value ) {
			break;
		}
	}
	// stringify it into a json string
    return JSON.stringify( page );
};

//------------------------------------------------------------------------------
// @route			GET /
// @description		Returns the whole list of pages as a json string.
//------------------------------------------------------------------------------
router.get( '/', function( req, res, next ) {

	// this method of getting the json data list is a demo only solution.
	// normally this data would come from a database.
	fs.readFile( './public/json/sandbox-pages.json', 'utf8', function( error, data ) {

		if ( error ) 		{ throw 'Can\'t find sandbox-pages.json in /public/json/'; }

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

	// this method of getting the json data list is a demo only solution.
	// normally this data would come from a database.
	fs.readFile( './public/json/sandbox-pages.json', 'utf8', function( error, data ) {

		if ( error ) 		{ throw 'Can\'t find sandbox-pages.json in /public/json/'; }

		res.writeHead( 200, { 'content-type': 'application/json' });
		res.write( searchByParamater( data, 'id', req.params.id ));
		res.end();
	});
});

//------------------------------------------------------------------------------
// @route			GET /url/:url
// @description		Returns the requested page matched by its url parameter.
//------------------------------------------------------------------------------
router.get( '/url/:url', function( req, res, next ) {

	// this method of getting the json data list is a demo only solution.
	// normally this data would come from a database.
	fs.readFile( './public/json/sandbox-pages.json', 'utf8', function( error, data ) {

		if ( error ) 		{ throw 'Can\'t find sandbox-pages.json in /public/json/'; }

		res.writeHead( 200, { 'content-type': 'application/json' });
		res.write( searchByParamater( data, 'url', req.params.url ));
		res.end();
	});
});

module.exports 				= router;


/*******************************************************************************
*******************************************************************************/
