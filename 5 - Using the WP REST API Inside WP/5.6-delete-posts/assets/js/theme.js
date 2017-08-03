(function () {

    (function init() {

        if ( true == jsforwp_vars.logged_in ) {
            newPostBtn.addEventListener( 'click', togglePostForm );
            savePostBtn.addEventListener( 'click', savePost );
        }

        wp.api.loadPromise.done( () => {
            loadPosts();
        } );

    })();

    function deletePost( event ) {

        let title = event.target.parentElement.querySelector( '.entry-title a' ).innerText,
            id = event.target.parentElement.dataset.id,
            confirm = window.confirm( `Delete Post: "${title}"` );

        event.preventDefault();

        if ( true === confirm ) {

            // Change POST_ID_OBJECT to '{ id }'
            let post = new wp.api.models.Post( POST_ID_OBJECT );

            // Change DELETE_POST() to post.destroy()
            DELETE_POST()
                .done( () => {
                    loadMessage( 'deleted' );
                    loadPosts();
                } );
        }

    }

    function loadEditForm( event ) {

        let title = event.target.parentElement.querySelector( '.entry-title a' ).innerText,
            content = event.target.parentElement.querySelector( '.entry-content' ).innerHTML,
            id = event.target.parentElement.dataset.id;

        event.preventDefault();
        togglePostForm();

        formTitle.value = title;
        tinyMCE.activeEditor.setContent( content );
        savePostBtn.dataset.id = id;

    }

    function savePost( event ) {

        const newPost = {
            'title': formTitle.value,
            'content': tinyMCE.activeEditor.getContent(),
            'status': 'publish'
        };
        let post = new wp.api.models.Post( newPost ),
            postId = savePostBtn.dataset.id,
            currentPost = {};

        if ( '' !== postId ) {
            currentPost = { id: postId };
        }

        event.preventDefault();
        togglePostForm();

        post.save( currentPost )
            .done( () => {
                loadMessage( 'saved' );
                clearForm();
                loadPosts();
            } );

    }

    function loadPosts() {

        let posts = new wp.api.collections.Posts();

        posts.fetch( {
                data: {
                    per_page: 3,
                }
            } )
            .done( () => {
                clearPosts();
                posts.each( post => {
                    loadPost( post.attributes );
                } );
            } );

    }

    function loadPost( post ) {

        const article = document.createElement( 'article' );
        let markup = '';

        markup += `<h2 class="entry-title"><a href="${post.link}">${post.title.rendered}</a></h2>`;
        markup += `<div class="entry-content">${post.content.rendered}</div>`;
        article.classList.add( 'post' );
        article.dataset.id = post.id;
        article.innerHTML = markup;
        if ( true == jsforwp_vars.logged_in ) {
            article.append( getEditLink(), getDeleteLink() );
        }
        appContainer.append( article );

    }

    function getEditLink() {

        let link = document.createElement( 'a' );

        link.href = '#edit-post';
        link.innerText = 'Edit';

        link.addEventListener( 'click', loadEditForm );

        return link;

    }

    function getDeleteLink() {

        let link = document.createElement( 'a' );

        link.href = '#delete-post';
        link.innerText = 'Delete';
        link.classList.add( 'delete-post' )

        // Change DELETE_POST_FUNCTION to deletePost
        link.addEventListener( 'click', DELETE_POST_FUNCTION );

        return link;

    }


})();
