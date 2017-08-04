# 6.5 - Editing Posts - Decoupled

### Step 1 - Setting up the Edit Link
1. Open '/src/js/Posts.js'
2. Find getEditLink()
3. Change LOAD_FORM to Helpers.loadEditForm


### Step 2 - Setup the Edit Form
1. Open '/src/js/Helpers.js'
2. Locate loadEditForm()
3. In the axios call, append id to the end of 'wp/v2/posts/'
4. In the .then() promise, do the following
5. Change X, Y to 0, 50
6. Change TITLE_HERE to response.data.title.rendered
7. Change CONTENT_HERE to response.data.content.rendered
8. Change ID_HERE to id


### Step 3 - Setting up Edit Functionality
9. Open '/src/js/Save.js'
10. Locate the if ( '' == postId ) {} else {}.  In the else statement do the following
11. Change 'METHOD' to 'put'
12. Append the postId to the end of 'wp/v2/posts/'
13. Set DATA_HERE to post
14. Change 'CONTENT_TYPE 'to 'application/json'
15. Change TOKEN_HERE to 'Bearer ' + token
