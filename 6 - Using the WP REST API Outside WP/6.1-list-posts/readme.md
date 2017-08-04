# 6.1 - List Posts - Decoupled

### Step 1 - Get Familiar with the App
1. Open '/src/js/Index.js'
2. Do nothing, just check it out.
3. Open 'src/js/config.js'
4. Do nothing, just check it out.
5. Open 'src/js/Helpers.js'
6. Do nothing, just check it out.

### Step 2 - Loading Posts
1. Open '/src/js/Posts.js'
2. Import axios from 'axios';
3. Add 'wp/v2/posts' to the end of config.rest_url
4. Change TOTAL_POSTS to 3
5. Change POSTS to response.data
6. Change POST_HERE to post
7. Find renderPost()
8. Change SLUG_HERE to post.slug
9. Change TITLE_HERE to post.title.rendered
10. Change EXCERPT_HERE to post.excerpt.rendered
11. Change ID_HERE to post.id

### Step 3 - Test
1. Run 'npm start' and open https://localhost:3000
2. 3 posts should load on the page
