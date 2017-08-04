( function( $ ){

  $( '#secondary' ).prepend( '<p><a href="#like" class="btn jsforwp-like">Like This Site</a> <span class="jsforwp-count"></span> Likes</p>' );

  // Change the html() value to response.total_likes
  $( '.jsforwp-count' ).html( jsforwp_globals.total_likes );

  $('.jsforwp-like').click( function(){

    event.preventDefault();

    // Change url to jsforwp_globals.ajax_url
    // Change data.action to 'jsforwp_add_like'
    // Change data._ajax_nonce to jsforwp_globals.nonce
    $.ajax({
      type : 'post',
      dataType : 'json',
      url : jsforwp_globals.ajax_url,
      data : {
        action: 'jsforwp_add_like',
        _ajax_nonce: jsforwp_globals.nonce
      },
      success: function( response ) {
         if( 'success' == response.type ) {
           // Change the html() value to response.total_likes
            $(".jsforwp-count").html( response.total_likes );
         }
         else {
            alert( 'Something went wrong, try logging in!' );
         }
      }
    })

  } );

} )( jQuery );
