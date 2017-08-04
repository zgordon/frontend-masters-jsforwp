// Import axios from 'axios';
// Import Cookies from 'js-cookie';
import config from './config';
import Helpers from './Helpers';
import Posts from './Posts';

export default class Save {

    static post( event ) {

        // Change TITLE to config.formTitle.value
        // Change CONTENT to tinyMCE.activeEditor.getContent()
        // Change STATUS to 'publish'
        // Change COOKIE_ID to config.tokenCookie
        const post = {
                'title': TITLE,
                'content': CONTENT,
                'status': 'STATUS'
            },
            token = Cookies.get( COOKIE_ID );

        event.preventDefault();

        // Save post

        // Change 'METHOD' to 'post'
        // Set URL_HERE to config.rest_url + 'wp/v2/posts'
        // Set DATA_HERE to post
        // Change 'CONTENT_TYPE 'to 'application/json'
        // Change TOKEN_HERE to 'Bearer ' + token
        axios( {
            method: 'METHOD',
            url: URL_HERE,
            data: DATA_HERE,
            headers: {
                'Content-Type': 'CONTENT_TYPE',
                'Authorization': TOKEN_HERE
            }
        } )
            .then( response => {
                Helpers.loadMessage( 'saved' );
                Helpers.clearForm();
                Posts.loadPosts();
            } )
            .catch( error => {
                console.log( error );
            } )

    }
}
