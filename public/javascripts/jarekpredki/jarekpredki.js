/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

//------------------------------------------------------------------------------
var Resume					= Sandbox.extend({

	//--------------------------------------------------------------------------
	// @info		Creates the sandbox app, and calls it's init methods to
	//				setup the app, events and ui.
	//--------------------------------------------------------------------------
	create: function( settings ) {
		// read settings and initialize
		this.initSettings( settings )
			.registerEvents()				// next, register events
			.updateScroll()					// next, update scroll
			.updateNav()					// next, update navigation
			.updateHeader();				// next, update header
		// if element is set
		if ( this.$elNav ) {
			// create demo list
			this.pageList			= new PageList();
			this.pageList.url		= '/pages-api/resume';
		}

		return this;
	}
});


$(function() {

	// create a new sandbox app
	var sandbox				= new Resume({
		title: 'Jaroslaw Predki',
		subtitle: 'Software Engineer // Game & Web Developer // Photographer',
		header: '#header',
		pages: '#nav',
		demos: ''
	});
	// get pages and demos...
	sandbox.fetchPages();
});
