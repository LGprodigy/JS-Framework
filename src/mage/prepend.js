ZCJ.mage.prepend = function(elem) {
	return this.forEach(function () {
		this.insertBefore(elem, this.firstChild);
	});
};