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