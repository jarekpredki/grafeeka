/*******************************************************************************
* @demo			Photo Gallery 2
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'photogallery/photogallery2', { title: 'Photo Gallery - Thumbnails and Preview Pane' });

});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
