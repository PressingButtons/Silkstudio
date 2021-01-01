'use strict';
//requires Jquery full library for ajax
const IDE = (function( ) {

  const loadTemplate = function( element, templatename) {
    return new Promise(function(resolve, reject) {
      getResource('/hbs/' + templatename ).then( hbs => {
        $(element).html( hbs );
        resolve( element );
      }).catch( reject );
    });
  }

  const getResource = url => {
    return new Promise(function(resolve, reject) {
      if( !window.JQuery ) reject('No JQuery detected!');
      $.get( url ).done( resolve ).error( reject );
    });
  }


})( );
