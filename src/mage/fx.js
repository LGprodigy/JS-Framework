ZCJ.mage.fadeIn = function() {
	return this.forEach( function() {
		var el = this;
		var o = 0;
		var timer = setInterval(function () {
			el.style.display = 'block';
			el.style.opacity = o;
			el.style.filter = 'alpha(opacity=' + o * 100 + ")";
			o += 0.1;
			if (o >= 1) {
				clearInterval(timer);
			}
		}, 25);
	});
};

ZCJ.mage.fadeOut = function(){
	return this.forEach( function(){
		var el = this;
		var o = 1;
		var timer = setInterval(function () {
			el.style.opacity = o;
			el.style.filter = 'alpha(opacity=' + o * 100 + ")";
			o -= 0.1;
			if (o <= 0) {
				clearInterval(timer);
				el.style.display = 'none';
			}
		}, 25);
	});
};