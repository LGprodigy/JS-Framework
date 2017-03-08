ZCJ.mage.extend({

	next: function() {
		return this[0].nextElementSibling;
	},

	prev: function() {
		return this[0].previousElementSibling;
	},

	parent: function() {
		return this[0].parentNode;
	}

});