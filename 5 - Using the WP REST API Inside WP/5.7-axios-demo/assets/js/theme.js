(function () {

    (function init() {

        if ( true == jsforwp_vars.logged_in ) {
            newPostBtn.addEventListener( 'click', togglePostForm );
            savePostBtn.addEventListener( 'click', savePost );
        }

        loadPosts();

    })();

    function deletePost( event ) {

        let title = event.target.parentElement.querySelector( '.entry-title a' ).innerText,
            id = event.target.parentElement.dataset.id,
            confirm = window.confirm( `Delete Post: "${title}"` );

        event.preventDefault();

        if ( true === confirm ) {

            axios({
              method: 'delete',
              url: jsforwp_vars.rest_url + 'wp/v2/posts/' + id,
              headers: {
                'X-WP-Nonce': jsforwp_vars.nonce
              }
            })
            .then( response => {
              loadMessage( 'deleted' );
              loadPosts();
            })
            .catch( error => {
              console.log( error );
            } )
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

        let postId = savePostBtn.dataset.id,
            post = {
              'title': formTitle.value,
              'content': tinyMCE.activeEditor.getContent(),
              'status': 'publish'
            },
            putMode = false;

        event.preventDefault();
        togglePostForm();

        if ( '' == postId ) {

          // Save the post
          axios({
            method: 'post',
            url: jsforwp_vars.rest_url + 'wp/v2/posts',
            data: post,
            headers: {
              'X-WP-Nonce': jsforwp_vars.nonce
            }
          })
          .then( response => {
            loadMessage( 'saved' );
            clearForm();
            loadPosts();
          })
          .catch( error => {
            console.log( error );
          } )

        } else {

          // Update the post
          axios({
            method: 'put',
            url: jsforwp_vars.rest_url + 'wp/v2/posts/' + postId,
            data: post,
            headers: {
              'X-WP-Nonce': jsforwp_vars.nonce
            }
          })
          .then( response => {
            loadMessage( 'updated' );
            clearForm();
            loadPosts();
          })
          .catch( error => {
            console.log( error );
          } )

        }

    }

    function loadPosts() {

        axios.get( jsforwp_vars.rest_url + 'wp/v2/posts', {
          params: {
            per_page: 3
          }
        } )
        .then( response => {
          clearPosts();
          for ( let post of response.data ) {
            loadPost( post );
          }
        });

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

        link.addEventListener( 'click', deletePost );

        return link;

    }


})();
