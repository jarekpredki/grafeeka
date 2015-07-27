/*******************************************************************************
* @route	NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var fs 						= require( 'fs' );
var router 					= express.Router();

var sandboxFile				= 'sandbox-pages.json';
var resumeFile				= 'resume-pages.json';

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
var getRootPages			= function( file, req, res, next ) {
	// read file and return its json data
	fs.readFile( './public/json/' + file, 'utf8', function( error, data ) {
		if ( error ) {
			throw 'Can\'t find ' + file + ' in /public/json/';
		} else {
			res.json( typeof( data ) != 'undefined' ? JSON.parse( data ) : null );
			/*res.writeHead( 200, { 'content-type': 'application/json' });
			res.write( data );
			res.end();*/
		}
	});
};

//------------------------------------------------------------------------------
var getPageByID				= function( file, req, res, next ) {
	// read file and return its json data
	fs.readFile( './public/json/' + file, 'utf8', function( error, data ) {
		if ( error ) {
			throw 'Can\'t find ' + file + ' in /public/json/';
		} else {
			res.json( typeof( data ) != 'undefined' ? JSON.parse( searchByParamater( data, 'id', req.params.id )) : null );
			/*res.writeHead( 200, { 'content-type': 'application/json' });
			res.write( searchByParamater( data, 'id', req.params.id ));
			res.end();*/
		}
	});
};

//------------------------------------------------------------------------------
var getPageByURL			= function( file, req, res, next ) {
	// read file and return its json data
	fs.readFile( './public/json/' + file, 'utf8', function( error, data ) {
		if ( error ) {
			throw 'Can\'t find ' + file + ' in /public/json/';
		} else {
			res.json( typeof( data ) != 'undefined' ? JSON.parse( searchByParamater( data, 'url', req.params.url )) : null );
			/*res.writeHead( 200, { 'content-type': 'application/json' });
			res.write( searchByParamater( data, 'url', req.params.url ));
			res.end();*/
		}
	});
};

//------------------------------------------------------------------------------
// @route			GET /sandbox
// @description		Returns the whole list of pages as a json string.
//------------------------------------------------------------------------------
router.get( '/sandbox', function( req, res, next ) {
	getRootPages( sandboxFile, req, res, next );
});

//------------------------------------------------------------------------------
// @route			GET /sandbox/id/:id
// @description		Returns the requested page matched by its id parameter.
//------------------------------------------------------------------------------
router.get( '/sandbox/id/:id', function( req, res, next ) {
	getPageByID( sandboxFile, req, res, next );
});

//------------------------------------------------------------------------------
// @route			GET /sandbox/url/:url
// @description		Returns the requested page matched by its url parameter.
//------------------------------------------------------------------------------
router.get( '/sandbox/url/:url', function( req, res, next ) {
	getPageByURL( sandboxFile, req, res, next );
});

//------------------------------------------------------------------------------
// @route			GET /resume/
// @description		Returns the whole list of pages as a json string.
//------------------------------------------------------------------------------
router.get( '/resume', function( req, res, next ) {
	getRootPages( resumeFile, req, res, next );
});

//------------------------------------------------------------------------------
// @route			GET /resume/id/:id
// @description		Returns the requested page matched by its id parameter.
//------------------------------------------------------------------------------
router.get( '/resume/id/:id', function( req, res, next ) {
	getPageByID( resumeFile, req, res, next );
});

//------------------------------------------------------------------------------
// @route			GET /resume/url/:url
// @description		Returns the requested page matched by its url parameter.
//------------------------------------------------------------------------------
router.get( '/resume/url/:url', function( req, res, next ) {
	getPageByURL( resumeFile, req, res, next );
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
