# 5.1 - Listing API Posts with Backbone Client

### Step 1. Making Backbone Client a Dependency
1. Open functions.php
2. Make 'jsforwp-theme-js' dependent on 'wp-api'

### Step 2. Setting up the JavaScript
3. Change GET_API_POSTS() to 'new wp.api.collections.Posts()'
4. Change FETCH_POSTS() to posts.fetch()
5. Change LINK_HERE to post.link
6. Change TITLE_HERE to post.title.rendered
7. Change CONTENT_HERE to post.content.rendered

### Step 3. Test
8. Login to your site and assign "Custom JS Page" to one of your pages
9. View that page in the browser
10. You should see a list of recent posts
