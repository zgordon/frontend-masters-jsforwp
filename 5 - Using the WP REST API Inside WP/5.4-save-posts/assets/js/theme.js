(function () {

    (function init() {

        setupListeners();
        loadPosts();

    })();

    function setupListeners() {

        newPostBtn.addEventListener( 'click', togglePostForm );

        // Change SAVE_POST_FUNCTION to savePost
        savePostBtn.addEventListener( 'click', SAVE_POST_FUNCTION );

    }

    function savePost( event ) {

        // Change TITLE_HERE to formTitle.value
        // Change CONTENT_HERE to tinyMCE.activeEditor.getContent()
        // Change STATUS_HERE to 'publish'
        const post = {
            'title': TITLE_HERE,
            'content': CONTENT_HERE,
            'status': 'STATUS_HERE'
        };

        // Change POST_HERE to post
        let newPost = new wp.api.models.Post( POST_HERE );

        event.preventDefault();
        togglePostForm();

        // Change SAVE_POST() to newPost.save()
        SAVE_POST()
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

})();
