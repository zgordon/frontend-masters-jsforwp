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

    if ( false == hidden ) {
        newPostBtn.innerText = 'X';
    } else {
        newPostBtn.innerText = 'New Post +';
    }

}

function loadMessage( type = 'saved' ) {

    const message = document.createElement( 'div' ),
        savedMsg = 'This post has been saved!';
    let markup = '<p>';

    message.id = 'message';

    if ( 'saved' == type ) {
        message.classList.add( 'saved' )
        markup += savedMsg;
    }

    markup += '</p>';
    message.innerHTML = markup;

    mainContainer.insertBefore( message, mainContainer.childNodes[ 0 ] );

    setTimeout( function () {
        document.getElementById( "message" ).remove();
    }, 3000 );

}

function loadPost( post ) {

    const article = document.createElement( 'article' );
    let markup = '';

    markup += `<h2 class="entry-title"><a href="${post.link}">${post.title.rendered}</a></h2>`;
    markup += `<div class="entry-content">${post.content.rendered}</div>`;
    article.classList.add( 'post' );
    article.innerHTML = markup;
    appContainer.append( article );

}

function clearForm() {
    formTitle.value = '';
    tinyMCE.activeEditor.setContent( '' );
}

function clearPosts() {
    appContainer.innerHTML = '';
}
