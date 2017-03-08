ZCJ.mage.hide = function() {
	return this.forEach( function() {
		this.style.display = 'none';
	});
};

ZCJ.mage.show = function() {
	return this.forEach( function() {
		this.style.display = 'block';
	});
};

ZCJ.mage.toggleDisplay = function() {
	return this.forEach( function() {
		if(this.style.display != 'none') {
			this.style.display = 'none';
		} else {
			this.style.display = 'block';
		}
	});
};