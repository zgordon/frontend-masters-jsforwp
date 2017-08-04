import config from './config';

export default class Helpers {

    static clearPosts() {
        config.appContainer.innerHTML = '';
    }

}
