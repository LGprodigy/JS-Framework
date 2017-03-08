ZCJ.mage.attr = function(attr, val) {
	if (typeof val !== 'undefined') {
		return this.forEach(function() {
			this.setAttribute(attr, val);
		});
	} else {
		return this[0].getAttribute(attr);
	}
};
