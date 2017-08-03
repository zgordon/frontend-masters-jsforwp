# 5.5 - Deleting Posts


### Instructions 

1. Open '/assets/js/theme.js' (also note there is a helpers.js file as well)
2. Find the getDeleteLink() function 
3. In the event listener, change DELETE_POST_FUNCTION to deletePost
4. Find the deletePost() function
5. Find 'let post = new wp.api.models.Post ..' and change POST_ID_OBJECT to '{ id }'
6. Change DELETE_POST() to post.destroy()

### Testing
7. Login to your site and assign "Custom JS Page" to one of your pages
8. View that page in the browser.
9. Try to edit delete posts.  After a confirmation the post should be deleted, a message displayed, and the list of posts refreshed.
