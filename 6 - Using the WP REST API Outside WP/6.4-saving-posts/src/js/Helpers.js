import config from './config';

export default class Helpers {

    static loadMessage( type = 'saved' ) {

        const message = document.createElement( 'div' ),
            savedMsg = 'This post has been saved!';
        let markup = '<p>';

        message.id = 'message';
        message.classList.add( 'saved' );
        markup += savedMsg;
        markup += '</p>';
        message.innerHTML = markup;

        config.mainContainer.insertBefore( message, config.mainContainer.childNodes[ 0 ] );
        setTimeout( function() {
            document.getElementById( "message" ).remove();
        }, 2000 );

    }

    static clearForm() {
        config.formTitle.value = '';
        tinyMCE.activeEditor.setContent( '' );
        config.savePostBtn.dataset.id = '';
    }

    static clearPosts() {
        config.appContainer.innerHTML = '';
    }

}
