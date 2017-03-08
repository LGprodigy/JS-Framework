ZCJ.mage.off = function(evt, fn) {
	return this.forEach( function() {
		this.removeEventListener(evt, fn, false);
	});
};