/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

// models
var Model3D					= Backbone.Model.extend({

	defaults: {
		// id +
		type:			'',		// cube, pyramid, sphere
		text:			'',		// text label

		geometry:		null,
		material:		null,
		mesh:			null
	},

	initialize: function() {
		this.geometry		= new THREE.BoxGeometry( 3, 3, 3, 5, 5, 5 );
		this.material		= new THREE.MeshBasicMaterial( { color: 0xff0000 } );
		this.mesh			= new THREE.Mesh( this.geometry, this.material );
	}

});

// demo collection data
var Models3D				= Backbone.Collection.extend({

	model:				Model3D//,
	//url:				'/sandbox-3d-api',
	//parse: function( data ) {
	//	return data.models;
	//}

});

// views
// demo model view
var Model3DView				= Backbone.View.extend({

	tagName: 			'div',
	className:			'sandbox-3d-model',
	scene:				null,	// Three.js / WebGL
	camera:				null,	// Three.js / WebGL
	renderer:			null,	// Three.js / WebGL

	clock:				null,

	initialize: function() {
		var viewportWidth	= $( '#sandbox-viewport' ).width();
		var viewportHeight	= $( '#sandbox-viewport' ).height();
		this.scene			= new THREE.Scene();
		this.camera			= new THREE.PerspectiveCamera( 75, viewportWidth / viewportHeight, 0.1, 1000 );
		this.renderer		= new THREE.WebGLRenderer();

		this.renderer.setSize( viewportWidth, viewportHeight );
		this.renderer.setClearColor( 0xffffff );

		this.scene.add( new THREE.AmbientLight( 0xffffff ));

		var light = new THREE.PointLight( 0x00ffff, 1, 50 );
		light.position.set( 5, 5, 15 );
		this.scene.add( light );
		this.scene.add( this.model.mesh );
		this.camera.position.z = 5;

		this.clock			= new THREE.Clock();

		// add change event listener
		this.listenTo( this.model, 'change', this.animate );
	},

	render: function() {

		//this.$el.html( '' );

		var template 		= $( '#model-3d-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );

		this.$el.html( html );
		this.$el.append( this.renderer.domElement );

		this.renderer.render( this.scene, this.camera );
		//this.animate();

		return this;
	},

	animate: function() {

		//requestAnimationFrame( this.animate );
		var deltaTime		= this.clock.getDelta();

		// update model
		this.model.mesh.rotation.x += 1.0 	* deltaTime;
		this.model.mesh.rotation.y += 1.0	* deltaTime;

		// re-render
		this.renderer.render( this.scene, this.camera );
	}
});

// demo list view
var Models3DView			= Backbone.View.extend({

	tagName: 			'div',
	className: 			'sandbox-3d-models',

	render: function() {

		this.collection.each( function( model3d ) {

			var model3DView		= new Model3DView({ model: model3d });
			this.$el.append( model3DView.render().el );

		}, this );

		return this;
	}

});

/*******************************************************************************
*******************************************************************************/
