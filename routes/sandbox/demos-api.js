/*******************************************************************************
* @route	NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var fs 						= require( 'fs' );
var router 					= express.Router();
// data files
var sandboxFile				= 'sandbox-demos.json';

//------------------------------------------------------------------------------
// @route			GET /
//------------------------------------------------------------------------------
router.get( '/', function( req, res, next ) {
	// read sandboxFile and return its json data
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
