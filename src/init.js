var init = ZCJ.mage.init = function( selector, context ) {
	var match, elem;

    // HANDLE: ZCJ(""), ZCJ(null), ZCJ(undefined), ZCJ(false)
    if ( !selector ) {
        return this;
    }

    // Handle HTML strings
    if ( typeof selector === "string" ) {
        if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
            // Assume that strings that start and end with <> are HTML and skip the regex check
            match = [ null, selector, null ];

        } else {
            match = expr.exec( selector );
        }

        // Match html
        if ( match && (match[0]) ) {
            context = context instanceof ZCJ ? context[0] : context;
            ZCJ.merge( this, ZCJ.parseHTML(
                match[1],
                context && context.nodeType ? context.ownerDocument || context : document,
                true
            ) );
		} else {
			elem = document.querySelectorAll(selector);
			this.context = document;
			this.selector = selector;
            for(var i = 0; i < elem.length; i++ ) {
				this[i] = elem[i];
			}
			this.length = elem.length;
            return this;
        }

    } else {
		this.context = this[0] = selector;
		this.length = 1;
		return this;
    }

};

init.prototype = ZCJ.mage;