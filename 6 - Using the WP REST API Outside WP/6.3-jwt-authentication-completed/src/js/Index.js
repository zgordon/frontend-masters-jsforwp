import Authentication from './Authentication';
import Posts from './Posts';


(function init() {

    Posts.loadPosts();
    Authentication.init();

})();