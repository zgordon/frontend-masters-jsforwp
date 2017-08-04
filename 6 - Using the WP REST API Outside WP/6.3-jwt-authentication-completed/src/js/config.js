const config = {
    rest_url: 'https://vagrant.local/wp-json/',
    tokenCookie: 'jwt-token',
    logged_in: false,
    mainContainer: document.getElementById( 'content' ),
    appContainer: document.getElementById( 'main' ),
    loginForm: document.querySelector( '.login-form' ),
    logoutForm: document.querySelector( '.logout-form' ),
    username: document.querySelector( '.login-form .username' ),
    password: document.querySelector( '.login-form .password' )
};

export default config;
