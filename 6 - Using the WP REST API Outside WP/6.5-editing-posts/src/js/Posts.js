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

        let id = event.target.parentElement.parentElement.dataset.id;

        event.preventDefault();

        axios.get( config.rest_url + 'wp/v2/posts/' + id )
            .then( response => {
                Helpers.clearPosts();
                Posts.renderPost( response.data, true );
            } );


    }

    static renderPost( post, single = false ) {

        const article = document.createElement( 'article' );
        let markup = '';

        if( true === single) {
            markup += '<p><a class="back-to-posts" href="#">&lt; Go Back to Posts</a>';
            markup += `<h1 class="entry-title">${post.title.rendered}</h1>`;
            markup += `<div class="entry-content">${post.content.rendered}</div>`;
        } else {
            markup += `<h2 class="entry-title"><a href="#${post.slug}">${post.title.rendered}</a></h2>`;
            markup += `<div class="entry-content">${post.excerpt.rendered}</div>`;
        }

        article.classList.add( 'post' );
        article.dataset.id = post.id;
        article.innerHTML = markup;

        if ( true === config.logged_in ){
            article.append( Posts.getEditLink() );
        }
        if( true === single ) {
            article.querySelector( 'a.back-to-posts' ).addEventListener( 'click', Posts.loadPosts, false );
        } else {
            article.querySelector( '.entry-title a' ).addEventListener( 'click', Posts.loadSinglePost, false );
        }
        config.appContainer.append( article );

    }

    static getEditLink() {

        let link = document.createElement( 'a' );

        link.href = '#edit-post';
        link.innerText = 'Edit';

        // Change LOAD_FORM to Helpers.loadEditForm
        link.addEventListener( 'click', LOAD_FORM );

        return link;

    }


}
