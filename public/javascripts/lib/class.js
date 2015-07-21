/*********************************************************************************
* @script		class.js
* @author		Jaroslaw Predki
*********************************************************************************/

(function() {

	var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

	// base Class
	this.Class				= function() {};

	// create a new Class that inherits from this class
	Class.extend 			= function(prop) {
		var _super 				= this.prototype;

		// Instantiate a base class (but only create the instance, don't run the init constructor)
		initializing 			= true;
		var prototype 			= new this();
		initializing 			= false;

		// copy the properties over onto the new prototype
		for ( var name in prop ) {
			// check if we're overwriting an existing function
			prototype[name] 		= typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test( prop[name] ) ?
				( function( name, fn ) {
					return function() {
						var tmp 		= this._super;

						// add a new ._super() method that is the same method but on the super-class
						this._super 	= _super[name];

						// the method only need to be bound temporarily, so we remove it when we're done executing
						var ret 		= fn.apply( this, arguments );
						this._super 	= tmp;

						return ret;
					};
				})( name, prop[name] ) :
				prop[name];
		}

		// dummy class constructor
		function Class() {
			// all construction is actually done in the init method
			if ( !initializing && this.create ) {
				this.create.apply( this, arguments );
			}
		}

		// populate our constructed prototype object
		Class.prototype 		= prototype;

		// enforce the constructor to be what we expect
		Class.prototype.constructor = Class;

		// and make this class extendable
		Class.extend 			= arguments.callee;

		return Class;
	};
})();

/*********************************************************************************
*********************************************************************************/
