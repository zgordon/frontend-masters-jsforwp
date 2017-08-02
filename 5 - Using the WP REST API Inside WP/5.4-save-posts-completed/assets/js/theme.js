(function () {

    (function init() {

        setupListeners();
        loadPosts();

    })();

    function setupListeners() {

        newPostBtn.addEventListener( 'click', togglePostForm );

        // Change SAVE_POST_FUNCTION to savePost
        savePostBtn.addEventListener( 'click', savePost );

    }

    function savePost( event ) {

        // Change TITLE_HERE to formTitle.value
        // Change CONTENT_HERE to tinyMCE.activeEditor.getContent()
        // Change STATUS_HERE to 'publish'
        const post = {
            'title': formTitle.value,
            'content': tinyMCE.activeEditor.getContent(),
            'status': 'publish'
        };

        // Change POST_HERE to post
        let newPost = new wp.api.models.Post( post );

        event.preventDefault();
        togglePostForm();

        // Change SAVE_POST() to newPost.save()
        newPost.save()
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
