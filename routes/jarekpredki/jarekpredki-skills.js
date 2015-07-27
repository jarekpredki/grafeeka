/*******************************************************************************
* @demo		Resume and Portfolio Site
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'jarekpredki/jarekpredki-skills', {
		title: 'Programming Skills',
		subtitle: 'Languages // Methodologies // Applications // Research'
	});
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
