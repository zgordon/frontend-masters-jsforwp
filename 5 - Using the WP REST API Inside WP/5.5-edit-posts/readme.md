# 5.5 - Editing Posts

1. Open '/assets/js/theme.js' (also note there is a helpers.js file as well)
2. Find the getEditLink() function.
3. Change LOAD_FORM_FUNCTION to loadEditForm
4. Find the loadEditForm() function
5. Change TITLE_HERE to title
6. Change CONTENT_HERE to content
7. Change ID_HERE to id
8. Find the savePost() function
9. Change POST_ID_OBJECT to { id: postId }
10. Change CURRENT_POST_HERE to currentPost


### Testing
11. Login to your site and assign "Custom JS Page" to one of your pages
12. View that page in the browser
13. Try to edit posts.  It should work properly.
