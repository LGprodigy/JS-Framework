( function( global, factory ) {

    if ( typeof module === "object" && typeof module.exports === "object" ) {

        //In Node.js expose factory as model.exports
        //https://nodejs.org/api/globals.html
        module.exports = global.document ?
            factory( global, true ) :
            function( w ) {
                if ( !w.document ) {
                    throw new Error( "No document found in current window" );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass window/this to ZCJ
} )( typeof window !== "undefined" ? window : this, function( window, globalNotAllowed ) {
var author = "Louis Gualtieri",
	version = "1.0.3",
	now = new Date(),
	year = now.getFullYear(),
	class_to_type = {},
	toString = class_to_type.toString,
	expr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
function ZCJ(selector, context) {
	return new ZCJ.mage.init(selector);
}
ZCJ.mage = ZCJ.prototype = {};
//Extend it using ZCJ.mage.extend({});
function isArraylike( obj ) {
    // Support: iOS 8.2 (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = "length" in obj && obj.length,
        type = ZCJ.type( obj );

    if ( type === "function" || ZCJ.isWindow( obj ) ) {
        return false;
    }

    if ( obj.nodeType === 1 && length ) {
        return true;
    }

    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

ZCJ.magic = ZCJ.mage.extend = function() {
    var src, copyIsArray, copy, name, options, clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;

        // skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !ZCJ.isFunction(target) ) {
        target = {};
    }

    // extend ZCJ itself if only one argument is passed
    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {
        // Only deal with non-null/undefined values
        if ( (options = arguments[ i ]) !== null ) {
            // Extend the base object
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if ( target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( ZCJ.isPlainObject(copy) || (copyIsArray = ZCJ.isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && ZCJ.isArray(src) ? src : [];

                    } else {
                        clone = src && ZCJ.isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = ZCJ.extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

ZCJ.magic({
	constructor: ZCJ,

	copyright: "ZippCast [" + author + "] 2017 - " + year + " All rights reserved.",

	ZCJ: this.copyright,

	isReady: true,

	isFunction: function( obj ) {
        return this.type(obj) === "function";
    },

    isArray: Array.isArray,

    isWindow: function( obj ) {
        return obj !== null && obj === obj.window;
    },

    isPlainObject: function( obj ) {
        // Not plain objects:
        // - Any object or value whose internal [[Class]] property is not "[object Object]"
        // - DOM nodes
        // - window
        if ( ZCJ.type( obj ) !== "object" || obj.nodeType || this.isWindow( obj ) ) {
            return false;
        }

        if ( obj.constructor &&
                !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
            return false;
        }

        // If the function hasn't returned already, we're confident that
        // |obj| is a plain object, created by {} or constructed with new Object
        return true;
    },

    type: function( obj ) {
        if ( obj === null ) {
            return obj + "";
        }
        // Support: Android<4.0, iOS<6 (functionish RegExp)
        return typeof obj === "object" || typeof obj === "function" ?
            class_to_type[ toString.call(obj) ] || "object" :
            typeof obj;
    },

    forEach: function( obj, callback, args ) {
        var value,
            i = 0,
            length = obj.length,
            isArray = isArraylike( obj );

        if ( args ) {
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback.apply( obj[ i ], args );

                    if ( value === false ) {
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    value = callback.apply( obj[ i ], args );

                    if ( value === false ) {
                        break;
                    }
                }
            }

        // A special, fast, case for the most common use of each
        } else {
            if ( isArray ) {
                for ( ; i < length; i++ ) {
                    value = callback.call( obj[ i ], i, obj[ i ] );

                    if ( value === false ) {
                        break;
                    }
                }
            } else {
                for ( i in obj ) {
                    value = callback.call( obj[ i ], i, obj[ i ] );

                    if ( value === false ) {
                        break;
                    }
                }
            }
        }

        return obj;
    },
    create: function(tagName, attrs) {
		var elem = document.createElement(tagName);
		if (attrs) {
			if (attrs.className) {
				ZCJ(elem).addClass(attrs.className);
				delete attrs.className;
			}
			if (attrs.text) {
				ZCJ(elem).txt(attrs.text);
				delete attrs.text;
			}
			for (var key in attrs) {
				if (attrs.hasOwnProperty(key)) {
					ZCJ(elem).attr(key, attrs[key]);
				}
			}
		}
		return elem;
	},
	map: function (callback) {
		var results = [];
		for (var i = 0; i < this.length; i++) {
			results.push(callback.call(this, this[i], i));
		}
		return results; //.length > 1 ? results : results[0];
	},
    unite: function( first, second ) {
        var len = +second.length,
            j = 0,
            i = first.length;

        for ( ; j < len; j++ ) {
            first[ i++ ] = second[ j ];
        }

        first.length = i;

        return first;
    },
    
    now: now
});
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
            //Use an array for the sake of a possible regex lookup.
            match = [ null, selector, null ];

        } else {

            match = expr.exec( selector );
        }

        // Match html
        if ( match && (match[1]) ) {
            context = context instanceof ZCJ ? context[0] : context;
            ZCJ.unite( this, ZCJ.parseHTML(
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
ZCJ.mage.append = function(elem) {
	elem = ZCJ.parseHTML(elem);
	return this.forEach(function () {
		this.appendChild( elem[0] );
	});
};
ZCJ.mage.attr = function(attr, val) {
	if (typeof val !== 'undefined') {
		return this.forEach(function() {
			this.setAttribute(attr, val);
		});
	} else {
		return this[0].getAttribute(attr);
	}
};

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

	swapClass: function(oldClass, newClass) {
		this.removeClass(oldClass);
		this.addClass(newClass);
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

ZCJ.mage.hide = function() {
	return this.forEach( function() {
		this.style.display = 'none';
	});
};

ZCJ.mage.show = function() {
	return this.forEach( function() {
		this.style.display = 'block';
	});
};

ZCJ.mage.toggleDisplay = function() {
	return this.forEach( function() {
		if(this.style.display != 'none') {
			this.style.display = 'none';
		} else {
			this.style.display = 'block';
		}
	});
};
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
ZCJ.mage.fn = function(fn) {
	fn.call( this[0] );
};
ZCJ.mage.forEach = function( callback, args ) {
	return ZCJ.forEach( this, callback, args );
};
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
ZCJ.mage.html = function(html) {
	if (typeof html !== "undefined") {
		return this.forEach(function () {
			this.innerHTML = html;
		});
	} else {
		return this[0].innerHTML;
	}
};
ZCJ.mage.off = function(evt, fn) {
	return this.forEach( function() {
		this.removeEventListener(evt, fn, false);
	});
};
//Support multiple events in one "on" function
function on( elem, evnts, input, fn ) {
	var evnt;

	// Check if the evnts is an object
	if ( typeof evnts === "object" ) {

		for ( evnt in evnts ) {
			//Execurte each object event as a non object
			on( elem, evnt, input, evnts[ evnt ] );
		}
		return elem;
	}

	//on(div, click, function)
	if ( fn === null ) {
  
		// If no function is specified then input is the function
		fn = input;
		input = undefined;

	}

	//Handle a flase statement
	if ( fn === false ) {
		return false;
	} else if ( !fn ) {
		return elem;
	}

	//Add event listeners
	return elem.forEach( function() {
		this.addEventListener(evnts, fn, input);
	} );
}

ZCJ.mage.on = function(evnt, input, fn) {
	//Send to the on handler
	return on( this, evnt, input, fn );

};
ZCJ.mage.prepend = function(elem) {
	return this.forEach(function () {
		this.insertBefore(elem, this.firstChild);
	});
};
ZCJ.mage.remove = function() {
	return this.forEach(function () {
		return this.parentNode.removeChild(this);
	});
};
ZCJ.mage.txt = function(text) {
	if (typeof text !== "undefined") {
		return this.forEach(function () {
			this.textContent = text;
		});
	} else {
		return this[0].textContent;
	}
};
ZCJ.mage.val = function(str) {
	if (typeof str !== "undefined") {
		return this.forEach(function () {
			this.value = str;
		});
	} else {
		return this[0].value;
	}
};
ZCJ.magic({
    xmlhttp: function() {
        if (window.XMLHttpRequest) {
            //code for IE7,firefox chrome and above
            return new XMLHttpRequest();
        } else {
            //code for Internet Explorer
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    },
    Ajax: function(config) {
		var datum, i, j;
        /*Config Structure
                url:"reqesting URL"
                type:"GET or POST"
                method: "(OPTIONAL) True for async and False for Non-async | By default its Async"
                debugLog: "(OPTIONAL)To display Debug Logs | By default it is false"
                data: "(OPTIONAL) another Nested Object which should contains reqested Properties in form of Object Properties"
                success: "(OPTIONAL) Callback function to process after response | function(data,status)"
        */
        if (!config.url) {
            if (config.debugLog === true)
                console.log("No Url!");
            return;
        }

        if (!config.type) {
            if (config.debugLog === true)
                console.log("No Default type (GET/POST) given!");
            return;
        }

        if (!config.method) {
            config.method = true;
        }


        if (!config.debugLog) {
            config.debugLog = false;
        }

        var xmlhttp = this.xmlhttp();
        

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var response = xmlhttp.responseText,
                    ContentType = config.contentType;
                if (ContentType == 'json') {
                    if(response) {
                        response = JSON.parse(response);
                    } else response = '';
                }
                    
                if (config.success) {
                    config.success(response, xmlhttp.readyState);
                }

                if (config.debugLog === true)
                    console.log("SuccessResponse");
                if (config.debugLog === true)
                    console.log("Response Data:" + xmlhttp.responseText);
            } else {
                if (config.debugLog === true)
                    console.log("FailureResponse --> State:" + xmlhttp.readyState + "Status:" + xmlhttp.status);
            }
        };

        var sendString = [],
            sendData = config.data;
        if( typeof sendData === "string" ){
            var tmpArr = String.prototype.split.call(sendData,'&');
            for(i = 0, j = tmpArr.length; i < j; i++){
                datum = tmpArr[i].split('=');
                sendString.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]));
            }
        }else if( typeof sendData === 'object' && !( sendData instanceof String || (FormData && sendData instanceof FormData) ) ){
            for (var k in sendData) {
				datum = sendData[k];
                if( Object.prototype.toString.call(datum) == "[object Array]" ){
                    for(i = 0, j = datum.length; i < j; i++) {
                            sendString.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i]));
                    }
                }else{
                    sendString.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum));
                }
            }
        }
        sendString = sendString.join('&');
        

        if (config.type == "GET") {
            xmlhttp.open("GET", config.url + "?" + sendString, config.method);
            xmlhttp.send();

            if (config.debugLog === true)
                console.log("GET fired at:" + config.url + "?" + sendString);
                
        }else if (config.type == "POST") {
            xmlhttp.open("POST", config.url, config.method);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send(sendString);

            if (config.debugLog === true)
                console.log("POST fired at:" + config.url + " || Data:" + sendString);
                
        }else if (config.type == "UPLOAD") {
            xmlhttp.open("POST", config.url, config.method);
            xmlhttp.send(config.data);
            
        } else return false;
    }
});
//Common Binds
ZCJ('a[data-hide]').on('click', function(){
    ZCJ( ZCJ(this).attr('data-hide') ).hide();
});
//ZCJ('a[data-toggle-display]').on('click', function(){
//	var elem = ZCJ(this).attr('data-hide');
//	if (ZCJ(elem).hasClass('display-none')) {
 //   	ZCJ( elem ).show();
//	} else {
//		ZCJ( elem ).hide();
//	}
//});
ZCJ('a[data-toggle]').on('click', function(){
    ZCJ( ZCJ(this).attr('data-toggle') ).toggleClass('display-none');
});
ZCJ('input[data-check-all]').on('change', function(){
	var name = ZCJ(this).attr('data-check-all');
	if(this.checked === true) {
		ZCJ('input[name="' + name + '"]').forEach(function(){
			this.checked = true;
		});
	} else {
		ZCJ('input[name="' + name + '"]').forEach(function(){
			this.checked = false;
		});
	}
});
ZCJ('input[data-check-toggle]').on('change', function(){
	var elem = ZCJ(this).attr('data-check-toggle');
	if(this.checked === true) {
		ZCJ(elem).show();
	} else {
		if(ZCJ('input[name="' + ZCJ(this).attr('name') + '"]:checked').length === 0){
			ZCJ(elem).hide();
		}
	}
});
ZCJ.magic({
    parseHTML: function(html) {
        var tmp = document.implementation.createHTMLDocument(null);
        tmp.body.innerHTML = html;
        return tmp.body.children;
    }
});
	//Work on bridging jquery pluigns into ZCJ
	//Allow "ZCJ" and "$" to be used in AMD, window and Node
	//Make sure globals are allowed
	if ( !globalNotAllowed ) {
		window.ZCJ = window.$ = ZCJ;
	}

	//Console message
	console.log("%cZCJ (ZippCast Javascript Framework) Console Debugger", "color:blue; font-weight: bold; font-size: x-large");
	console.log("%cThis is nerd stuff. If you dont know what your doing, then you probably shouldnt be here.", "color:blue; font-size: medium");

	return ZCJ;

} );