/*******************************************************************************
* @demo		Resume and Portfolio Site
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'jarekpredki/jarekpredki-education', {
		title: 'Education',
		subtitle: 'University // Research // Projects // Other Studies'
	});
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
