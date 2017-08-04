import axios from 'axios';
import Cookies from 'js-cookie';
import config from './config';
import Helpers from './Helpers';
import Posts from './Posts';

export default class Save {

    static post( event ) {

        const postId = config.savePostBtn.dataset.id,
            post = {
                'title': config.formTitle.value,
                'content': tinyMCE.activeEditor.getContent(),
                'status': 'publish'
            },
            token = Cookies.get( config.tokenCookie );

        event.preventDefault();

        if ( '' == postId ) {

            // Save post
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

        } else {

            // Update the post

            // Change 'METHOD' to 'put'
            // Append the postId to the end of 'wp/v2/posts/'
            // Set DATA_HERE to post
            // Change 'CONTENT_TYPE 'to 'application/json'
            // Change TOKEN_HERE to 'Bearer ' + token
            axios( {
                method: 'METHOD',
                url: config.rest_url + 'wp/v2/posts/',
                data: DATA_HERE,
                headers: {
                    'Content-Type': 'CONTENT_TYPE',
                    'Authorization': TOKEN_HERE
                }
            } )
                .then( response => {
                    Helpers.loadMessage( 'updated' );
                    Helpers.clearForm();
                    Posts.loadPosts();
                } )
                .catch( error => {
                    console.log( error );
                } )

        }


    }
}
