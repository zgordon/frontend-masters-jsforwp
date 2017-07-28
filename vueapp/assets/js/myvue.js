new Vue({
    el: '#vueapp',
    data: {
        isSingle: false,
        posts: [],
        post: {},
        siteURL: jsforwp_vars.site_url
    },
    methods: {
        showPost( post ) {
            this.post = post;
            this.isSingle = true;
        },
        showPosts() {
            this.isSingle = false;
        }
    },
    computed: {
        restEndpoint() {
            return `${this.siteURL}/wp-json/wp/v2/posts?per_page=3`;
        }
    },
        let posts = this.$http.get( jsforwp_vars.site_url + '/wp-json/wp/v2/posts?per_page=3').then(response => {

            // get body data
            // console.log( response.body );
            this.posts = response.body;

        }, response => {
            // error callback
        });
    created() {
        console.log( this.siteURL );
    }
});
