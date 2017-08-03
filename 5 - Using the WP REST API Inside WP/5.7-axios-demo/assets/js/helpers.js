const mainContainer = document.getElementById( 'content' ),
    appContainer = document.getElementById( 'list-posts' ),
    newPostBtn = document.querySelector( '.toggle-add-form' ),
    newPostForm = document.getElementById( 'add-post-form' ),
    formTitle = document.getElementById( 'new-title' ),
    savePostBtn = document.getElementById( 'save-post' );


function togglePostForm( event ) {

    let hidden = false;

    if ( event ) event.preventDefault();

    hidden = newPostForm.classList.toggle( 'hidden' );
    clearForm();

    if ( false == hidden ) {
        newPostBtn.innerText = 'X';
    } else {
        newPostBtn.innerText = 'New Post +';
    }

}

function loadMessage( type = 'saved' ) {

    const message = document.createElement( 'div' ),
        savedMsg = 'This post has been saved!',
        deletedMsg = 'This post has been deleted!',
        updatedMsg = 'This post has been updated!';
    let markup = '<p>';

    message.id = 'message';

    switch ( type ) {
      case 'saved':
        message.classList.add( 'saved' );
        markup += savedMsg;
        break;
      case 'deleted':
        message.classList.add( 'deleted' );
        markup += deletedMsg;
        break;
      default:
        message.classList.add( 'updated' );
        markup += updatedMsg;
    }

    markup += '</p>';
    message.innerHTML = markup;

    mainContainer.insertBefore( message, mainContainer.childNodes[ 0 ] );

    setTimeout( function () {
        document.getElementById( "message" ).remove();
    }, 3000 );

}

function clearForm() {
    formTitle.value = '';
    tinyMCE.activeEditor.setContent( '' );
    savePostBtn.dataset.id = '';
}

function clearPosts() {
    appContainer.innerHTML = '';
}
