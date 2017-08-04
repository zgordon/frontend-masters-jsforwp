// Import axios from 'axios';
import axios from 'axios';
import config from './config';
import Helpers from './Helpers';

export default class Posts {

    static loadPosts( event ) {

        if ( event ) {
            event.preventDefault();
        }

        // Add 'wp/v2/posts' to the end of config.rest_url
        // Change TOTAL_POSTS to 3
        axios.get( config.rest_url + 'wp/v2/posts', {
                params: {
                    per_page: 3
                }
            } )
            .then( response => {
                Helpers.clearPosts();
                // Change POSTS to response.data
                for ( let post of response.data ) {
                    // Change POST_HERE to post
                    Posts.renderPost( post );
                }
            } );

    }

    static renderPost( post ) {

        const article = document.createElement( 'article' );
        let markup = '';

        // Change SLUG_HERE to post.slug
        // Change TITLE_HERE to post.title.rendered
        // Change EXCERPT_HERE to post.excerpt.rendered
        markup += `<h2 class="entry-title"><a href="#${post.slug}">${post.title.rendered}</a></h2>`;
        markup += `<div class="entry-content">${post.excerpt.rendered}</div>`;

        // Change ID_HERE to post.id
        article.classList.add( 'post' );
        article.dataset.id = post.id;
        article.innerHTML = markup;

        config.appContainer.append( article );

    }

}
