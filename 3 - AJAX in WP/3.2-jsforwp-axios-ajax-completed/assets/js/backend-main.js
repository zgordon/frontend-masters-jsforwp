( function( $ ){

  $('.jsforwp-reset-likes').click( function(){

    event.preventDefault();
    axios({
      method: 'post',
      url: jsforwp_globals.ajax_url,
      params: {
        action: 'jsforwp_reset_likes',
        _ajax_nonce: jsforwp_globals.nonce
      }
    })
    .then( function( response ) {
      if( 'success' == response.data.type ) {

          $(".jsforwp-total-likes").html( 0 );

      } else {
          alert( 'Something went wrong, try logging in!' );
      }
    })
    .catch( function( error ) {
      alert( 'Something went wrong :(' );
      console.log( error );
    });

  } );

} )( jQuery );
