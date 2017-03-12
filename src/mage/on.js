//Support multiple events in one "on" function
function on( elem, evnts, input, fn ) {
	var evnt;

	// Check if the evnts is an object
	if ( typeof evnts === "object" ) {

		for ( evnt in evnts ) {
			//Execurte each object event as a non object
			on( elem, evnt, input, evnts[ evnt ] );
		}
		return elem;
	}

	//on(div, click, function)
	if ( fn === null ) {
  
		// If no function is specified then input is the function
		fn = input;
		input = undefined;

	}

	//Handle a flase statement
	if ( fn === false ) {
		return false;
	} else if ( !fn ) {
		return elem;
	}

	//Add event listeners
	return elem.forEach( function() {
		this.addEventListener(evnts, fn, input);
	} );
}

ZCJ.mage.on = function(evnt, input, fn) {
	//Send to the on handler
	return on( this, evnt, input, fn );

};