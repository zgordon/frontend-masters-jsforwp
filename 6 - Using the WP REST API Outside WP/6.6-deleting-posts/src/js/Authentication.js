import axios from 'axios';
import Cookies from 'js-cookie';
import formurlencoded from 'form-urlencoded';
import config from './config';
import Save from './Save.js';
import Posts from './Posts';

export default class Authentication {

    static init() {

        if ( Cookies.get( config.tokenCookie ) === undefined ) {
            Authentication.onLogout();
            Authentication.initLogin();
        } else {
            Authentication.onLogin();
            Authentication.initLogout();
        }
    }

    static onLogin() {

        config.logged_in = true;
        config.loginForm.classList.add( 'hidden' );
        config.newPostForm.classList.remove( 'hidden' );
        config.logoutForm.classList.remove( 'hidden' );
        tinymce.init( config.tinymceSettings );
        Posts.loadPosts();

    }

    static onLogout() {

        config.logged_in = false;
        config.loginForm.classList.remove( 'hidden' );
        config.newPostForm.classList.add( 'hidden' );
        config.logoutForm.classList.add( 'hidden' );
        Posts.loadPosts();

    }

    static initLogin() {

        config.loginForm.addEventListener( 'submit', function( event ) {

            const creds = {
                'username': config.username.value,
                'password': config.password.value
            };

            event.preventDefault();

            axios( {
                method: 'post',
                url: config.rest_url + 'jwt-auth/v1/token',
                data: formurlencoded( creds ),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            } )
                .then( response => {

                  if ( 200 === response.status ) {

                    Cookies.set(
                      config.tokenCookie,
                      response.data.token,
                      {
                        expires: 1,
                        secure: true
                      }
                    );
                    Authentication.init();

                  } else {
                      alert('Login failed, please check credentials and try again!');
                  }

                } )
                .catch( error => {
                    console.log( 'Error: ', error );
                } )

        }, false );
    }

    static initLogout() {

        Authentication.initAddPost();
        Authentication.onLogin();

        config.logoutForm.addEventListener( 'submit', function( event ) {

            event.preventDefault();
            Cookies.remove( config.tokenCookie, { secure: true } );
            Authentication.init();

        }, false );

    }

    static initAddPost() {
        config.savePostBtn.addEventListener( 'click', Save.post, false );
    }

};
