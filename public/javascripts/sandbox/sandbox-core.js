/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

var Sandbox					= Class.extend({

	title:					'',
	subtitle:				'',
	route:					'/',

	// navigation/page list data
	elHeader:				'#header',
	$elHeader:				null,

	// navigation/page list data
	elNav:					'#nav',
	$elNav:					null,
	pageList:			 	null,

	// demo list data
	elDemos:				'#demos',
	$elDemos:				null,
	demoList:			 	null,

	// scroll tracking - for nav
	scroll:	{
		current:			0,
		previous:			0
	},

	//--------------------------------------------------------------------------
	// @info		Creates and initializes a sandbox app, and calls init methods to
	//				set up settings and ititial display. Holds page and demo lists.
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
		}
		// if element is set
		if ( this.$elDemos ) {
			// create demo list
			this.demoList			= new DemoList();
		}

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Initialize settings by overwriting passed in data.
	//--------------------------------------------------------------------------
	initSettings: function( settings ) {
		if ( typeof( settings ) != 'undefined' ) {
			// check title
			if ( typeof( settings.title ) != 'undefined' ) {
				this.title			= settings.title;
			}
			if ( typeof( settings.subtitle ) != 'undefined' ) {
				this.subtitle		= settings.subtitle;
			}
			// check pages
			if ( typeof( settings.header ) != 'undefined' ) {
				this.elHeader		= settings.header;
				this.$elHeader		= $( settings.header );
			}
			// check pages
			if ( typeof( settings.pages ) != 'undefined' ) {
				this.elNav			= settings.pages;
				this.$elNav			= $( settings.pages );
			}
			// check demos
			if ( typeof( settings.demos ) != 'undefined' ) {
				this.elDemos		= settings.demos;
				this.$elDemos		= $( settings.demos );
			}
		}

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Initialize the page. Set any data as needed.
	//--------------------------------------------------------------------------
	initPage: function( settings ) {
		// overwrite page info
		if ( window.location && window.location.pathname ) {
			var page				= this.pageList.where({ url: window.location.pathname })[0];
			if ( page && page.attributes ) {
				this.title		= page.attributes.title;
				this.subtitle	= page.attributes.subtitle;
			}
		}

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Register all app events (window, document, elements)
	//				Called once at start to setup the applications global events.
	//				Call Sandbox.unregisterEvents() to undo events listeners.
	//--------------------------------------------------------------------------
	registerEvents: function() {
		var sandbox = this;
		// register scroll event
		window.addEventListener( 'scroll', function _scrollHandler() {
			sandbox.updateScroll()			// update scrolling info
				.updateNav()				// update nav after scrolling
				.updateHeader();			// update header after scrolling
		});
		// register resize event
		window.addEventListener( 'resize', function _resizeHandler() {
			sandbox.resize();
		});

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Unregisters all app events that were
	//				set with Sandbox.registerEvents().
	//--------------------------------------------------------------------------
	unregisterEvents: function() {
		if ( window.hasEventListener( 'scroll' )) {
			window.removeEventListener( 'scroll' );
		}
		if ( window.hasEventListener( 'resize' )) {
			window.removeEventListener( 'resize' );
		}

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Resize event handler. If needed, updates display.
	//--------------------------------------------------------------------------
	resize: function( event ) {
		//console.log( 'resize' );
		// get the most current scroll values, and if scroll is at top most (0 value)
		// then make sure header size is just right for document height
		if ( !this.updateScroll().scroll.current ) {
			this.updateNav()		// update nav after scrolling
				.updateHeader();	// update header after scrolling
		}

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Update current scroll position.
	//--------------------------------------------------------------------------
	updateScroll: function() {
		//console.log( 'scroll' );
		this.scroll.previous	= this.scroll.current;
		this.scroll.current		= window.top.scrollY;

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Update the navigation display.
	//--------------------------------------------------------------------------
	updateNav: function() {
		//console.log( 'updateNav' );
		// check if floating nav is to be added
		//if ( this.scroll.current > this.scroll.previous ) {
			if ( !this.$elNav.hasClass( 'nav-floating' )) {
				this.$elNav.addClass( 'nav-floating' );
			}
		// check if floating nav is to be removed
		//} else if ( this.scroll.current < this.scroll.previous && !this.scroll.current ) {
		//	if ( this.$elNav.hasClass( 'nav-floating' )) {
		//		this.$elNav.removeClass( 'nav-floating' );
		//	}
		//}

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Update the header display.
	//--------------------------------------------------------------------------
	updateHeader: function() {
		//console.log( 'updateHeader' );
		// set header height to window height minus margin+padding
		var headerHeight		= Number( this.$elHeader.css( 'height' ).replace( 'px', '' )),
			paddingTop			= Number( this.$elHeader.css( 'padding-top' ).replace( 'px', '' )),
			paddingBottom		= Number( this.$elHeader.css( 'padding-bottom' ).replace( 'px', '' ));
		// calculate new margin
		var newMargin			= ( $( window ).height() - ( headerHeight + paddingTop + paddingBottom )) / 2;
		// set it
		this.$elHeader.css( 'margin-top', 	 ( newMargin + 'px' ));
		this.$elHeader.css( 'margin-bottom', ( newMargin + 'px' ));

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Fetch page list and render the nav with page links.
	//				After load + render is done, init page, update scroll, nav and header.
	//--------------------------------------------------------------------------
	fetchPages: function() {
		var sandbox = this;
		// get page list
		if ( this.$elNav ) {
			if ( !!this.pageList && this.pageList.length ) {
				this.pageList.reset( null );
			}
			// fetch data, and render the page list
			this.pageList.fetch({

				success: function( data ) {
					// render nav/page list
					var pageListView 	= new PageListView({ collection: data });
					sandbox.$elNav.html( pageListView.render().el );

					console.log( sandbox.title + ': fetchPages\n' );
				},

				error: function( jqXHR, textStatus, errorThrown ) {

					console.log( sandbox.title + ' Error!\n' + textStatus.responseText );
				}
			}).then( function() {
				// do one visual update
				sandbox
					.initPage()
					.updateScroll()
					.updateNav()
					.updateHeader();
			});
		}

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Fetch demo list and on success render the list.
	//				After load + render is done, update scroll, nav and header.
	//--------------------------------------------------------------------------
	fetchDemos: function() {
		var sandbox = this;
		// get demo list
		if ( this.$elDemos ) {
			if ( !!this.demoList && this.demoList.length ) {
				this.demoList.reset( null );
			}
			// fetch data, and render demo list
			this.demoList.fetch({

				success: function( data ) {
					// render demo list
					var demoListView 	= new DemoListView({ collection: data });
					sandbox.$elDemos.html( demoListView.render().el );

					console.log( sandbox.title + ': fetchDemos\n' );
				},

				error: function( jqXHR, textStatus, errorThrown ) {

					console.log( sandbox.title + ' Error!\n' + textStatus.responseText );
				}
			}).then( function() {
				// do one visual update
				sandbox
					.updateScroll()
					.updateNav()
					.updateHeader();
			});
		}

		return this;
	},

	//--------------------------------------------------------------------------
	// @info		Render a 3D cube and update over time. TEST.
	//--------------------------------------------------------------------------
	render3D: function() {
		var sandbox = this;
		this.cubeModel		= new Model3D();
		this.cubeView		= new Model3DView({ model: this.cubeModel });
		// add model to viewport
		$( '#sandbox3d' ).html( this.cubeView.render().el );
		// setup update render frame
		this.intervalID		= setInterval( function _renderFrame() {
			sandbox.cubeView.animate();
		}, 17 );

		return this;
	}

});

/*******************************************************************************
*******************************************************************************/
