( function( $ ){

  $( '#secondary' ).prepend( '<p><a href="#like" class="btn jsforwp-like">Like This Site</a> <span class="jsforwp-count"></span> Likes</p>' );

  // Change the html() value to response.total_likes
  $( '.jsforwp-count' ).html( 'Total # Here' );

  $('.jsforwp-like').click( function(){

    event.preventDefault();

    // Change url to jsforwp_globals.ajax_url
    // Change data.action to 'jsforwp_add_like'
    // Change data._ajax_nonce to jsforwp_globals.nonce
    $.ajax({
      type : 'post',
      dataType : 'json',
      url : 'ajax_url_here',
      data : {
        action: 'jsforwp_add_like',
        _ajax_nonce: 'nonce_here'
      },
      success: function( response ) {

         if( 'success' == response.type ) {

           // Change the html() value to response.total_likes
            $(".jsforwp-count").html( 'Total # Likes Here' );

         }
         else {
            alert( 'Something went wrong, try logging in!' );
         }

      }
    })

  } );

} )( jQuery );
