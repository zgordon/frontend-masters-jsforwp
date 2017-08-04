// Import axios from 'axios';
// Import Cookies from 'js-cookie';
import axios from 'axios';
import Cookies from 'js-cookie';
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
                'title': config.formTitle.value,
                'content': tinyMCE.activeEditor.getContent(),
                'status': 'publish'
            },
            token = Cookies.get( config.tokenCookie );

        event.preventDefault();

        // Save post

        // Change 'METHOD' to 'post'
        // Set URL_HERE to config.rest_url + 'wp/v2/posts'
        // Set DATA_HERE to post
        // Change 'CONTENT_TYPE 'to 'application/json'
        // Change TOKEN_HERE to 'Bearer ' + token
        axios( {
            method: 'post',
            url: config.rest_url + 'wp/v2/posts',
            data: post,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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
