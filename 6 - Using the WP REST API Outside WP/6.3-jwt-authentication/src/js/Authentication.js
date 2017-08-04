// import axios from 'axios';
// Import Cookies from 'js-cookie';
// Import formurlencoded from 'form-urlencoded';
import config from './config';
import Posts from './Posts';

export default class Authentication {

    static init() {

        // Change COOKIE_ID to config.tokenCookie
        if ( undefined === Cookies.get( COOKIE_ID ) ) {
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
        config.logged_in = LOGGED_ID;
        config.loginForm.classList.add();
        config.logoutForm.classList.remove();


    }

    static onLogout() {

        // Set LOGGED_ID to true
        // Add 'hidden' to the loginForm
        // Remove 'hidden' to the logoutForm
        config.logged_in = LOGGED_ID;
        config.loginForm.classList.remove();
        config.logoutForm.classList.add();

    }

    static initLogin() {

        config.loginForm.addEventListener( 'submit', function( event ) {

            // Set USERNAME to config.username.value
            // Set PASSWORD to config.password.value
            const creds = {
                'username': USERNAME,
                'password': PASSWORD
            };

            event.preventDefault();

            // Set METHOD to 'post'
            // Change REST_URL to config.rest_url + 'jwt-auth/v1/token'
            // Change DATA_HERE to formurlencoded( creds )
            // Set 'CONTENT_TYPE' to application/x-www-form-urlencoded
            axios( {
                method: 'METHOD',
                url: REST_URL,
                data: DATA_HERE,
                headers: {
                    'Content-Type': 'CONTENT_TYPE'
                }
            } )
                .then( response => {

                  if ( 200 === response.status ) {

                    // Change COOKIE_ID to config.tokenCookie
                    // Change TOKEN_HERE to response.data.token
                    // Change EXPIRES to 1
                    // Change SECURE to true
                    Cookies.set(
                      COOKIE_ID,
                      response.data.token,
                      {
                        expires: EXPIRES,
                        secure: SECURE
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
              COOKIE_ID,
              {
                secure: SECURE
              }
            );
            Authentication.init();

        }, false );

    }

};
