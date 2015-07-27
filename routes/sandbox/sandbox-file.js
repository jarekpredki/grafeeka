/*******************************************************************************
* @route	NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var router 					= express.Router();

router.get( '/:file', function( req, res, next ) {
	var fileRequest = req.params.file;
	var fileExtension = fileRequest.substring( fileRequest.lastIndexOf( '.' ) + 1 );
	// load and send: robots.txt
	if ( fileRequest == 'robots.txt' ) {
		var fileResponse = fileRequest.replace( '.txt', 'fix.txt' ),
			options = {
				root: './public/',
				dotfiles: 'allow',
				headers: {
					'x-timestamp': Date.now(),
					'x-sent': true
				}
			};
		console.log( '> LOADING > /' + fileRequest + ', ' + fileExtension );
		// send the requested file
		res.sendFile( fileResponse, options, function( error ) {
			if ( error ) {
				console.log( '> ERROR > /' + fileResponse + ', ' + error );
				res.status( error.status ).end();
			} else {
				console.log( '> LOADED > /' + fileResponse );
				res.end();
			}
		});
	} else {
		next();
	}
});

module.exports 				= router;

/*******************************************************************************
*******************************************************************************/
