/*******************************************************************************
* @demo			NBC Galleries Page
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

//------------------------------------------------------------------------------
// @route			GET /:id
// @info			Returns gallery info, as requested by gallery id.
//------------------------------------------------------------------------------
router.get( '/:id', function( req, res, next ) {

	res.render( 'nbc/gallery', { title: 'NBC Gallery ' + req.params.id, id: req.params.id });

});

//------------------------------------------------------------------------------
// @route			GET /
// @info			Returns all gallery info.
//------------------------------------------------------------------------------
router.get( '/', function( req, res, next ) {

	res.render( 'nbc/galleries', { title: 'NBC Galleries' });

});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
