/*******************************************************************************
* @route	NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/:file', function( req, res, next ) {
	var fileRequest = req.params.file;
	console.log( '> ' + fileRequest );
	if ( fileRequest == 'robots.txt' ) {
		var fileResponse = 'robotsfix.txt', options = {
			root: './public/',
			dotfiles: 'allow',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		};
		// send the requested file
		res.sendFile( fileResponse, options, function( error ) {
			if ( error ) {
				console.log( '> ERROR loading robotsfix.txt' + ' - ' + error );
				res.status( error.status ).end();
			} else {
				console.log( '> LOADED robotsfix.txt' );
				res.end();
			}
		});
	}
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
