/*******************************************************************************
* @demo		Resume and Portfolio Site
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'jarekpredki/jarekpredki-contact', {
		title: 'Contact Information',
		subtitle: 'Phone // E-Mail // Social Networks'
	});
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
