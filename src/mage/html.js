ZCJ.mage.html = function(html) {
	if (typeof html !== "undefined") {
		return this.forEach(function () {
			this.innerHTML = html;
		});
	} else {
		return this[0].innerHTML;
	}
};