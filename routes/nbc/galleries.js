/*******************************************************************************
* @demo			NBC Galleries Page
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/:id', function( req, res, next ) {

	res.render( 'nbc/gallery', { title: 'NBC Gallery ' + req.params.id, id: req.params.id });

});

router.get( '/', function( req, res, next ) {

	res.render( 'nbc/galleries', { title: 'NBC Galleries' });

});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
