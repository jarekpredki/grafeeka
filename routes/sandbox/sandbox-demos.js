/*******************************************************************************
* @route	NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'sandbox/sandbox-demos', {
		title: 'Demos',
		subtitle: 'Apps, Prototypes, Subsites, API\'s'
	});

});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
