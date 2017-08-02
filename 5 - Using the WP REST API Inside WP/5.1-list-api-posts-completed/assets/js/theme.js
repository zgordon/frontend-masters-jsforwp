(function() {

  // Change ID to 'app'
	const appContainer = document.getElementById('app');

	(function init() {
		loadPosts();
	})();

	function loadPosts() {

    // Change GET_API_POSTS() to 'new wp.api.collections.Posts()'
		let posts = new wp.api.collections.Posts();

    // Change FETCH_POSTS() to posts.fetch()
    posts.fetch()
    .done( () => {
  		clearPosts();
			posts.each( post => {
        // Change POST_HERE to post.attributes
        loadPost( post.attributes );
      });

  	});

  }

	function loadPost( post ) {

    const article = document.createElement('article');
    let   markup = '';

    // Change LINK_HERE to post.link
    // Change TITLE_HERE to post.title.rendered
    // Change CONTENT_HERE to post.content.rendered
    markup += `<h2 class="entry-title"><a href="${post.link}">${post.title.rendered}</a></h2>`;
    markup += `<div class="entry-content">${post.content.rendered}</div>`;
    article.classList.add( 'post' );
    article.innerHTML = markup;
    appContainer.append( article );

	}

  function clearPosts() {
		appContainer.innerHTML = '';
	}

})();
