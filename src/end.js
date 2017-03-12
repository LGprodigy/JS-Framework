	//Work on bridging jquery pluigns into ZCJ
	//Allow "ZCJ" and "$" to be used in AMD, window and Node
	//Make sure globals are allowed
	if ( !globalNotAllowed ) {
		window.ZCJ = window.$ = ZCJ;
	}

	//Console message
	console.log("%cZCJ (ZippCast Javascript Framework) Console Debugger", "color:blue; font-weight: bold; font-size: x-large");
	console.log("%cThis is nerd stuff. If you dont know what your doing, then you probably shouldnt be here.", "color:blue; font-size: medium");

	return ZCJ;

} );