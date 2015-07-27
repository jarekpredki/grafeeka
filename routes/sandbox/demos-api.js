/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var fs 						= require( 'fs' );
var router 					= express.Router();

var sandboxFile				= 'sandbox-demos.json';

router.get( '/', function( req, res, next ) {

	// this method of getting the json data list is a demo only solution.
	// normally this data would come from a database.
	fs.readFile( './public/json/' + sandboxFile, 'utf8', function( error, data ) {
		if ( error ) {
			throw 'Can\'t to find ' + sandboxFile + ' in /public/json/';
		} else {
			res.json( typeof( data ) != 'undefined' ? JSON.parse( data ) : null );
		}
	});
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
