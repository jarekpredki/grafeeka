/*******************************************************************************
* @demo		NodeJS/Express Application
* @author	Jaroslaw Predki
*******************************************************************************/

var express 				= require( 'express' );
var path 					= require( 'path' );
var favicon 				= require( 'serve-favicon' );
var logger 					= require( 'morgan' );
var cookieParser 			= require( 'cookie-parser' );
var bodyParser 				= require( 'body-parser' );

// sandbox pages routes
var sandboxIndex			= require( './routes/sandbox/sandbox-index' );				// page
var sandboxInfo 			= require( './routes/sandbox/sandbox-info' );				// page
var sandboxDemos 			= require( './routes/sandbox/sandbox-demos' );				// page
var sandboxJournal			= require( './routes/sandbox/sandbox-journal' );			// page
var jarekpredki 			= require( './routes/jarekpredki/jarekpredki' );			// page
var jarekpredkiBasics		= require( './routes/jarekpredki/jarekpredki-basics' );		// page
var jarekpredkiLFW			= require( './routes/jarekpredki/jarekpredki-lfw' );		// page
var jarekpredkiSkills		= require( './routes/jarekpredki/jarekpredki-skills' );		// page
var jarekpredkiEducation	= require( './routes/jarekpredki/jarekpredki-education' );	// page
var jarekpredkiHistory		= require( './routes/jarekpredki/jarekpredki-history' );	// page
var jarekpredkiGallery		= require( './routes/jarekpredki/jarekpredki-gallery' );	// page
var jarekpredkiContact		= require( './routes/jarekpredki/jarekpredki-contact' );	// page
// demos routes
var photoGallery1 			= require( './routes/photogallery/photogallery1' );			// page
var photoGallery2 			= require( './routes/photogallery/photogallery2' );			// page
// api routes
var sandboxPagesAPI			= require( './routes/sandbox/pages-api' );					// api
var sandboxDemosAPI 		= require( './routes/sandbox/demos-api' );					// api
var sandboxPhotosAPI		= require( './routes/photogallery/photos-api' );			// api
/*
// NOTE: Commenting out, was only for interview.
// NBC task
var nbcGalleries 			= require( './routes/nbc/galleries' );						// page
var nbcGalleriesAPI			= require( './routes/nbc/galleries-api' );					// api
var nbcPhotosAPI			= require( './routes/nbc/photos-api' );						// api
*/
var app 					= express();

// view engine setup
app.set( 'views', 		path.join( __dirname, 'views' ));
app.set( 'view engine', 'jade' );

// setup application
app.use( favicon( __dirname + '/public/favicon.ico' ));
app.use( logger( 'dev' ));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }));
app.use( cookieParser());
app.use( '/public', express.static( path.join( __dirname, 'public' )));

// setup page routes
app.use( '/', 								sandboxIndex );				// sandbox landing page
app.use( '/info', 							sandboxInfo );				// info page
app.use( '/demos', 							sandboxDemos );				// demos page
app.use( '/journal', 						sandboxJournal );			// journal page
app.use( '/photogallery1', 					photoGallery1 );			// photo gallery 1 page
app.use( '/photogallery2', 					photoGallery2 );			// photo gallery 2 page
app.use( '/jarekpredki', 					jarekpredki );				// resume landing page
//app.use( '/jarekpredki/basics', 			jarekpredkiBasics );		// basics page (moved to landing page)
app.use( '/jarekpredki/lookingforwork',		jarekpredkiLFW );			// lfw page
app.use( '/jarekpredki/skills', 			jarekpredkiSkills );		// skills page
app.use( '/jarekpredki/education', 			jarekpredkiEducation );		// education page
app.use( '/jarekpredki/history', 			jarekpredkiHistory );		// history page
app.use( '/jarekpredki/gallery', 			jarekpredkiGallery );		// gallery page
app.use( '/jarekpredki/contact', 			jarekpredkiContact );		// contact page
// setup RESTful API
app.use( '/pages-api', 						sandboxPagesAPI );			// pages api
app.use( '/demos-api', 						sandboxDemosAPI );			// demos api
app.use( '/photos-api', 					sandboxPhotosAPI );			// photos api
/*
// NOTE: Commenting out, was only for interview.
// NBC Task
app.use( '/nbc', 							nbcGalleries );				// nbc task - galleries/gallery page(s)
app.use( '/nbc-galleries-api', 				nbcGalleriesAPI );			// nbc task - galleries api
app.use( '/nbc-photos-api', 				nbcPhotosAPI );				// nbc task - photos api
*/

// error handlers

// catch 404 and forward to error handler
app.use( function( req, res, next ) {
	var err 				= new Error( 'Not Found' );
	err.status 				= 404;
	next( err );
});

// development error handler - prints stacktrace
if ( app.get( 'env' ) === 'development' ) {
	app.use( function( err, req, res, next ) {
		res.status( err.status || 500 );
		res.render( 'error', { message: err.message, error: err });
	});
}

// production error handler - no stacktraces
app.use( function( err, req, res, next ) {
	res.status( err.status || 500 );
	res.render( 'error', { message: err.message, error: {}});
});

module.exports 				= app;

/*******************************************************************************
*******************************************************************************/
