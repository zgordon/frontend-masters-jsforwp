# 5.5 - Editing Posts

### Instructions
1. Open your functions.php
2. Find the wp_localize_script() for 'jsforwp-theme-js'
3. Change 'LOGGED_IN' to $logged_in
4. Open '/assets/js/theme.js' (also note there is a helpers.js file as well)
5. Find the loadPost() function
6. Set LOGGED_IN to jsforwp_vars.logged_in
7. Find the getEditLink() function
8. Change LOAD_FORM_FUNCTION to loadEditForm
9. Find the loadEditForm() function
10. Change TITLE_HERE to title
11. Change CONTENT_HERE to content
12. Change ID_HERE to id
13. Find the savePost() function
14. Change POST_ID_OBJECT to { id: postId }
15. Change CURRENT_POST_HERE to currentPost


### Testing
16. Login to your site and assign "Custom JS Page" to one of your pages
17. View that page in the browser
18. Try to edit posts.  It should work properly.
