# 6.3 - JWT Authentication - Decoupled

### Step 1 - Setup the Save Form
1. Open '/src/js/Authentication.js'
2. Import Save from './Save'
3. Find onLogin()
4. Remove the hidden class from config.newPostForm
5. Change TINYMCE_SETTINGS to config.tinymceSettings
6. Find onLogout()
7. Add the hidden class to config.newPostForm
8. Find initAddPost()
9. Change SAVE_POST to Save.post

### Step 2 - Setting up Save Functionality
10. Open '/src/js/Save.js'
11. Import axios from 'axios';
12. Import Cookies from 'js-cookie';
13. Find const post = {...}
14. Change TITLE to config.formTitle.value
15. Change CONTENT to tinyMCE.activeEditor.getContent()
16. Change STATUS to 'publish'
17. Change COOKIE_ID to config.tokenCookie
18. Find the axios({...}) call
19. Change 'METHOD' to 'post'
20. Set URL_HERE to config.rest_url + 'wp/v2/posts'
21. Set DATA_HERE to post
22. Change 'CONTENT_TYPE 'to 'application/json'
23. Change TOKEN_HERE to 'Bearer ' + token
