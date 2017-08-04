import axios from 'axios';
import config from './config';

export default class Helpers {

    static loadEditForm( event ) {

        let title = event.target.parentElement.querySelector( '.entry-title' ).innerText,
            id = event.target.parentElement.dataset.id;

        if ( event ) {
            event.preventDefault();
        }

        // Append id to the end of 'wp/v2/posts/'
        axios.get( config.rest_url + 'wp/v2/posts/' + id )
            .then( response => {
                // Change X, Y to 0, 50
                // Change TITLE_HERE to response.data.title.rendered
                // Change CONTENT_HERE to response.data.content.rendered
                // Change ID_HERE to id
                window.scrollTo( 0, 50 );
                config.formTitle.value = response.data.title.rendered;
                tinyMCE.activeEditor.setContent( response.data.content.rendered );
                config.savePostBtn.dataset.id = id;
            } );


    }

    static loadMessage( type = 'saved' ) {

        const message = document.createElement( 'div' ),
            savedMsg = 'This post has been saved!',
            updatedMsg = 'This post has been updated!';
        let markup = '<p>';

        message.id = 'message';

        switch ( type ) {
            case 'saved':
                message.classList.add( 'saved' );
                markup += savedMsg;
                break;
            default:
                message.classList.add( 'updated' );
                markup += updatedMsg;
        }

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
