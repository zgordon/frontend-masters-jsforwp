const config = {
    rest_url: 'https://vagrant.local/wp-json/',
    tokenCookie: 'jwt-token',
    logged_in: false,
    mainContainer: document.getElementById( 'content' ),
    appContainer: document.getElementById( 'main' ),
    loginForm: document.querySelector( '.login-form' ),
    logoutForm: document.querySelector( '.logout-form' ),
    username: document.querySelector( '.login-form .username' ),
    password: document.querySelector( '.login-form .password' ),
    newPostBtn: document.querySelector( '.toggle-add-form' ),
    newPostForm: document.querySelector( '.add-post-form' ),
    formTitle: document.querySelector( '.add-post-form .title-editor' ),
    savePostBtn: document.getElementById( 'save-post' ),
    tinymceSettings: {
        selector: '#content-editor',
        content_style: 'body {background: #fff !important; padding: 5px 10px}',
        plugins: 'link code',
        statusbar: false,
        menubar: false,
        toolbar: 'formatselect bold italic | link blockquote | code '
    }
};

export default config;