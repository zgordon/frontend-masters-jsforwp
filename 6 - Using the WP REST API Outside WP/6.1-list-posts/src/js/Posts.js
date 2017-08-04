// Import axios from 'axios';
import config from './config';
import Helpers from './Helpers';

export default class Posts {

    static loadPosts( event ) {

        if ( event ) {
            event.preventDefault();
        }

        // Add 'wp/v2/posts' to the end of config.rest_url
        // Change TOTAL_POSTS to 3
        axios.get( config.rest_url, {
                params: {
                    per_page: TOTAL_POSTS
                }
            } )
            .then( response => {
                Helpers.clearPosts();
                // Change POSTS to response.data
                for ( let post of POSTS ) {
                    // Change POST_HERE to post
                    Posts.renderPost( POST_HERE );
                }
            } );

    }

    static renderPost( post ) {

        const article = document.createElement( 'article' );
        let markup = '';

        // Change SLUG_HERE to post.slug
        // Change TITLE_HERE to post.title.rendered
        // Change EXCERPT_HERE to post.excerpt.rendered
        markup += `<h2 class="entry-title"><a href="#${SLUG_HERE}">${TITLE_HERE}</a></h2>`;
        markup += `<div class="entry-content">${EXCERPT_HERE}</div>`;

        // Change ID_HERE to post.id
        article.classList.add( 'post' );
        article.dataset.id = ID_HERE;
        article.innerHTML = markup;

        config.appContainer.append( article );

    }

}
