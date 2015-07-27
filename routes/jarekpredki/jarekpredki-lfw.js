/*******************************************************************************
* @demo		Resume and Portfolio Site
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'jarekpredki/jarekpredki-lfw', {
		title: 'Looking for Work',
		subtitle: 'Senior // Game or Web // Development Engineer'
	});
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
