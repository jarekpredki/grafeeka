/*******************************************************************************
* @demo			Photo Gallery 1
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'photogallery/photogallery1', {
		title: 'Photo Gallery - Vertical Columns'
	});
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
