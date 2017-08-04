// Import axios from 'axios'
// Import Cookies from 'js-cookie'
import config from './config';
import Helpers from './Helpers';
import Posts from './Posts';


export default class Delete {

    static post( event ) {

        let title = event.target.parentElement.querySelector( '.entry-title' ).innerText,
            id = event.target.parentElement.dataset.id,
            confirm = window.confirm( `Delete Post: "${title}"` ),
            // Change COOKIE_TOKEN to config.tokenCookie
            token = Cookies.get( COOKIE_TOKEN );

        event.preventDefault();

        if ( true === confirm ) {

            // Set 'METHOD' to delete
            // Change URL_HERE to config.rest_url + 'wp/v2/posts/' + id
            // Change 'CONTENT_TYPE 'to 'application/json'
            // Change TOKEN_HERE to 'Bearer ' + token
            axios( {
                method: 'METHOD',
                url: URL_HERE,
                headers: {
                    'Content-Type': 'CONTENT_TYPE',
                    'Authorization': TOKEN_HERE
                }
            } )
                .then( response => {
                    Helpers.loadMessage( 'deleted' );
                    Posts.loadPosts();
                } )
                .catch( error => {
                    console.log( error );
                } );

        }

    }

}
