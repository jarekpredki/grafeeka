/*******************************************************************************
* @demo		Resume and Portfolio Site
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

//------------------------------------------------------------------------------
// @route			GET /
//------------------------------------------------------------------------------
router.get( '/', function( req, res, next ) {
	// render the page
	res.render( 'jarekpredki/jarekpredki-gallery', {
		title: 'Project Gallery',
		subtitle: 'Past Projects // Memorable Clients'
	});
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
