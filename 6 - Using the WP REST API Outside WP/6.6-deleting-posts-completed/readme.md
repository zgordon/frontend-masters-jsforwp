# 6.6 - Deleting Posts - Decoupled

### Step 1 - Setting up Delete Link
1. Open '/src/js/Posts.js'
2. Import Delete from './Delete'
3. Find getDeleteLink()
4. Change DELETE_POST to Delete.post

### Step 2 - Setting up Delete Functionality
5. Open '/src/js/Delete.js'
6. Import axios from 'axios'
7. Import Cookies from 'js-cookie'
8. Find token = Cookies.get() and change COOKIE_TOKEN to config.tokenCookie
9. Locate the axios call
10. Set 'METHOD' to delete
11. Change URL_HERE to config.rest_url + 'wp/v2/posts/' + id
12. Change 'CONTENT_TYPE 'to 'application/json'
13. Change TOKEN_HERE to 'Bearer ' + token
