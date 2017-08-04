// import axios from 'axios';
// Import Cookies from 'js-cookie';
// Import formurlencoded from 'form-urlencoded';
import axios from 'axios';
import Cookies from 'js-cookie';
import formurlencoded from 'form-urlencoded';
import config from './config';
import Posts from './Posts';

export default class Authentication {

    static init() {

        // Change COOKIE_ID to config.tokenCookie
        if ( undefined === Cookies.get( config.tokenCookie ) ) {
            Authentication.onLogout();
            Authentication.initLogin();
        } else {
            Authentication.onLogin();
            Authentication.initLogout();
        }
    }

    static onLogin() {

        // Set LOGGED_ID to true
        // Add 'hidden' to the loginForm
        // Remove 'hidden' to the logoutForm
        config.logged_in = true;
        config.loginForm.classList.add( 'hidden' );
        config.logoutForm.classList.remove( 'hidden' );


    }

    static onLogout() {

        // Set LOGGED_ID to true
        // Add 'hidden' to the loginForm
        // Remove 'hidden' to the logoutForm
        config.logged_in = false;
        config.loginForm.classList.remove( 'hidden' );
        config.logoutForm.classList.add( 'hidden' );

    }

    static initLogin() {

        config.loginForm.addEventListener( 'submit', function( event ) {

            // Set USERNAME to config.username.value
            // Set PASSWORD to config.password.value
            const creds = {
                'username': config.username.value,
                'password': config.password.value
            };

            event.preventDefault();

            // Set METHOD to 'post'
            // Change REST_URL to config.rest_url + 'jwt-auth/v1/token'
            // Change DATA_HERE to formurlencoded( creds )
            // Set 'CONTENT_TYPE' to application/x-www-form-urlencoded
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

                    // Change COOKIE_ID to config.tokenCookie
                    // Change TOKEN_HERE to response.data.token
                    // Change EXPIRES to 1
                    // Change SECURE to true
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
                    alert(`Login failed :( ${error} `);
                } )

        }, false );
    }

    static initLogout() {

        Authentication.onLogin();

        config.logoutForm.addEventListener( 'submit', function( event ) {

            event.preventDefault();

            // Change COOKIE_ID to config.tokenCookie
            // Change SECURE to true
            Cookies.remove(
              config.tokenCookie,
              { secure: true }
            );
            Authentication.init();

        }, false );

    }

};
