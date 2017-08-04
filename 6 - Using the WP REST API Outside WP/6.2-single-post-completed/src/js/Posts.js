import axios from 'axios';
import config from './config';
import Helpers from './Helpers';

export default class Posts {

    static loadPosts( event ) {

        if ( event ) {
            event.preventDefault();
        }

        axios.get( config.rest_url + 'wp/v2/posts', {
                params: {
                    per_page: 3
                }
            } )
            .then( response => {
                Helpers.clearPosts();
                for ( let post of response.data ) {
                    Posts.renderPost( post );
                }
            } );

    }

    static loadSinglePost() {

        // Change ID_HERE to event.target.parentElement.parentElement.dataset.id
        let id = event.target.parentElement.parentElement.dataset.id;

        event.preventDefault();

        // Append id to the end of the REST URL below
        axios.get( config.rest_url + 'wp/v2/posts/' + id )
            .then( response => {
                Helpers.clearPosts();
                // Change POST to response.data
                // Change IS_SINGLE to true
                Posts.renderPost( response.data, true );
            } );

    }

    static renderPost( post, single = false ) {

        const article = document.createElement( 'article' );
        let markup = '';

        // Change IS_SINGLE to true === single
        if( true === single) {
            markup += '<p><a class="back-to-posts" href="#">&lt; Go Back to Posts</a>';
            markup += `<h1 class="entry-title">${post.title.rendered}</h1>`;
            // Change CONTENT_HERE to post.content.rendered
            markup += `<div class="entry-content">${post.content.rendered}</div>`;
        } else {
            markup += `<h2 class="entry-title"><a href="#${post.slug}">${post.title.rendered}</a></h2>`;
            markup += `<div class="entry-content">${post.excerpt.rendered}</div>`;
        }

        article.classList.add( 'post' );
        article.dataset.id = post.id;
        article.innerHTML = markup;

        // Change IS_SINGLE to true === single
        if( true === single ) {
            // Change LOAD_POSTS to Posts.loadPosts
            article.querySelector( 'a.back-to-posts' ).addEventListener( 'click', Posts.loadPosts, false );
        } else {
            // Change LOAD_SINGLE_POST to Posts.loadSinglePost
            article.querySelector( '.entry-title a' ).addEventListener( 'click', Posts.loadSinglePost, false );
        }
        config.appContainer.append( article );

    }

}
