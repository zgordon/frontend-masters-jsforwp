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
