# 6.2 - Single Post View - Decoupled

### Instructions
1. Open '/src/js/Posts.js'
2. Find loadSinglePost()
3. Change ID_HERE to event.target.parentElement.parentElement.dataset.id
4. Find axios.get( .. )
5. Append id to the end of the REST URL
6. Change POST to response.data
7. Change IS_SINGLE to true
8. Find renderPost()
9. Change IS_SINGLE to true === single
10. Change EXCERPT_HERE to post.excerpt.rendered
11. Change IS_SINGLE to true === single (Again)
12. Change LOAD_POSTS to Posts.loadPosts
13. Change LOAD_SINGLE_POST to Posts.loadSinglePost

### Test
1. Run 'npm start' and open https://localhost:3000
2. Click on a post.  It should load the single view
