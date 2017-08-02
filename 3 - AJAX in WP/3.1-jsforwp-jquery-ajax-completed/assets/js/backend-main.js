( function( $ ){

  $('.jsforwp-reset-likes').click( function(){

    event.preventDefault();
    $.ajax({
      type : 'post',
      dataType : 'json',
      url : jsforwp_globals.ajax_url,
      data : {
        action: 'jsforwp_reset_likes',
        _ajax_nonce: jsforwp_globals.nonce
      },
      success: function( response ) {
         if( 'success' == response.type ) {
            $(".jsforwp-total-likes").html( 0 );
         }
         else {
            alert( 'Something went wrong!' );
         }
      }
    })

  } );

} )( jQuery );
