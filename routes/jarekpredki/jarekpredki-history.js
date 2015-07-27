/*******************************************************************************
* @demo		Resume and Portfolio Site
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'jarekpredki/jarekpredki-history', {
		title: 'Experience',
		subtitle: 'Work History // Personal Projects // Future Plans'
	});
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
