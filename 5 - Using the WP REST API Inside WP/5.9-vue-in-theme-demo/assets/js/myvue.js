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
    created() {
        console.log( this.siteURL );
        axios.get( this.restEndpoint )
          .then( response => this.posts = response.data )
          .catch( error => {
              alert('There was an error in your request');
              console.error( error.response.data.message );
            }
        );
    }
});
