/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'sandbox/sandbox-info', {
		title: 'Information',
		subtitle: 'Frameworks, Libraries, SDK\'s & API\'s'
	});

});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
