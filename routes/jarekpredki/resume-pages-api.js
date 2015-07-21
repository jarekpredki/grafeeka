/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var fs 						= require( 'fs' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	// this method of getting the json data list is a demo only solution.
	// normally this data would come from a database.
	fs.readFile( './public/json/resume-pages.json', 'utf8', function( error, data ) {

		if ( error ) 		{ throw 'Can\'t to find resume-pages.json in /public/json/'; }

		res.writeHead( 200, { 'content-type': 'application/json' });
		res.write( data );
		res.end();

	});
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
