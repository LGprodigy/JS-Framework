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
    
    now: now
});