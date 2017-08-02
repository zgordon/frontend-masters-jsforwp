(function() {

	const appContainer = document.getElementById('app');

	(function init() {
		loadPosts();
	})();

	function loadPosts() {

		let posts = new wp.api.collections.Posts();

    // Change PER_PAGE to '3'
    // Change ORDERBY to 'title'
    // Change ORDER to 'desc'
    // Play around with other arguments https://goo.gl/xcJ9rG
    posts.fetch({
      data: {
        per_page: 'PER_PAGE',
        orderby: 'ORDERBY',
        order: 'ORDER',
      }
    })
    .done( () => {
  		clearPosts();
			posts.each( post => {
        loadPost( post.attributes );
      });

  	});

  }

	function loadPost( post ) {

    const article = document.createElement('article');
    let   markup = '';

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
