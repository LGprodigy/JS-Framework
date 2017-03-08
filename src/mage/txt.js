ZCJ.mage.txt = function(text) {
	if (typeof text !== "undefined") {
		return this.forEach(function () {
			this.textContent = text;
		});
	} else {
		return this[0].textContent;
	}
};