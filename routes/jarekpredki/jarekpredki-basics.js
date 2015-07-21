/*******************************************************************************
* @demo		Resume and Portfolio Site
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'jarekpredki/jarekpredki-basics', {
		title: 'The Basics',
		subtitle: 'Who? What? Where?'
	});

});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
