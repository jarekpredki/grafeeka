/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/', function( req, res, next ) {

	res.render( 'sandbox/sandbox-journal', {
		title: 'Journal',
		subtitle: 'Notes, Ideas, Todo List & Wish List'
	});

});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
