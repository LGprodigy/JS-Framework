ZCJ.mage.extend({

	hasClass: function(className) {
		if (this[0].classList)
			return this[0].classList.contains(className);
		else
			return new RegExp('(^| )' + className + '( |$)', 'gi').test(this[0].className);
	},

	addClass: function(classes) {
		var className = "";
		if (typeof classes !== 'string') {
			for (var i = 0; i < classes.length; i++) {
				className += " " + classes[i];
			}
		} else {
			className = " " + classes;
		}
		return this.forEach(function () {
			this.className += className;
		});

	},

	removeClass: function(classes) {
		return this.forEach(function () {
			var cs = this.className.split(' '), i;

			while ( (i = cs.indexOf(classes)) > -1) {

				cs = cs.slice(0, i).concat(cs.slice(++i));

			}

			this.className = cs.join(' ');
		});
	},

	toggleClass: function(className) {
		return this.forEach( function() {
			if (this.classList) {
				this.classList.toggle(className);
			} else {
				var classes = this.className.split(' ');
				var existingIndex = classes.indexOf(className);

				if (existingIndex >= 0)
					classes.splice(existingIndex, 1);
				else
					classes.push(className);

				this.className = classes.join(' ');
			}
		});
	}

});
