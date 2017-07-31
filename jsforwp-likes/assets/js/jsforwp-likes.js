(function( $ ){

  $( '.jsforwp-like' ).click( function() {

    let postId = event.target.parentElement.dataset.id;

    event.preventDefault();
    console.log( postId );

  });

})(jQuery)
