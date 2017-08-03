 let helpers = {

  mainContainer: document.getElementById( 'content' ),
  appContainer: document.getElementById( 'list-posts' ),
  newPostBtn: document.querySelector( '.toggle-add-form' ),
  newPostForm: document.getElementById( 'add-post-form' ),
  formTitle: document.getElementById( 'new-title' ),
  savePostBtn: document.getElementById( 'save-post' ),

  togglePostForm: function( event ) {

      let hidden = false;

      if ( event ) event.preventDefault();

      hidden = helpers.newPostForm.classList.toggle( 'hidden' );
      helpers.clearForm();

      if ( false == hidden ) {
          helpers.newPostBtn.innerText = 'X';
      } else {
          helpers.newPostBtn.innerText = 'New Post +';
      }

  },

  loadMessage: function( type = 'saved' ) {

      const message = document.createElement( 'div' ),
          savedMsg = 'This post has been saved!',
          deletedMsg = 'This post has been deleted!';
      let markup = '<p>';

      message.id = 'message';

      if ( 'saved' == type ) {
          message.classList.add( 'saved' )
          markup += savedMsg;
      } else if ( 'deleted' == type ) {
          message.classList.add( 'deleted' )
          markup += deletedMsg;
      }

      markup += '</p>';
      message.innerHTML = markup;

      helpers.mainContainer.insertBefore( message, helpers.mainContainer.childNodes[ 0 ] );

      setTimeout( function () {
          document.getElementById( "message" ).remove();
      }, 3000 );

  },

  clearForm: function() {
      helpers.formTitle.value = '';
      tinyMCE.activeEditor.setContent( '' );
      helpers.savePostBtn.dataset.id = '';
  },

  clearPosts: function() {
      helpers.appContainer.innerHTML = '';
  }

}

export default helpers;
