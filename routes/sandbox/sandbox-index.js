/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );

var router 					= express.Router();

router.get( '/googled2581cbce1cf96e0.html', function( req, res, next ) {

	res.render( 'sandbox/sandbox-ga', { title: 'Google Verification' });

});

router.get( '/', function( req, res, next ) {

	res.render( 'sandbox/sandbox-index', {
		title: 'NodeJS Sandbox',
		subtitle: 'by Jaroslaw Predki'
	});

});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
