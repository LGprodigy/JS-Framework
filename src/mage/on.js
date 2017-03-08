ZCJ.mage.on = function(evt, fn) {
	return this.forEach( function() {
		this.addEventListener(evt, fn, false);
	});
};