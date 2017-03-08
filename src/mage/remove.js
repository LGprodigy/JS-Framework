ZCJ.mage.remove = function() {
	return this.forEach(function () {
		return this.parentNode.removeChild(this);
	});
};