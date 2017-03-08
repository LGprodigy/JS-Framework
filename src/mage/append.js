ZCJ.mage.append = function(elem) {
	elem = ZCJ.parseHTML(elem);
	return this.forEach(function () {
		this.appendChild( elem[0] );
	});
};