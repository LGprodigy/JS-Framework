ZCJ.mage.val = function(str) {
	if (typeof str !== "undefined") {
		return this.forEach(function () {
			this.value = str;
		});
	} else {
		return this[0].value;
	}
};