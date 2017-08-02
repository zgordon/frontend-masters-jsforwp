# 5.4 - Saving Posts

1. Open '/assets/js/theme.js' (also note there is a helpers.js file as well)
2. Inside of setupListeners() find the event listener attached to savePostBtn
3. Change SAVE_POST_FUNCTION to savePost
4. Find the savePost() function
5. Change TITLE_HERE to formTitle.value
6. Change CONTENT_HERE to tinyMCE.activeEditor.getContent()
7. Change STATUS_HERE to 'publish'
8. Find 'let newPost = ..' and change POST_HERE to post
9. Find the SAVE_POST() function and change to to newPost.save()


### Testing
10. Login to your site and assign "Custom JS Page" to one of your pages
11. View that page in the browser
12. Try adding new posts.  You should see message that post is saved and list of posts updated.

