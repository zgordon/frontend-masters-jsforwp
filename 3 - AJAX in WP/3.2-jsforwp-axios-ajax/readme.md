# 3.2 - Axios AJAX

### Part 1 - Setting Up on the PHP Side
1. Open up 'jsforwp-ajax.php'
2. Find the wp_localize_script() with the handle 'jsforwp-frontend-js'
3. Make this script dependent on 'axios-js'
4. Find the wp_localize_script() function for 'jsforwp-frontend-js'
5. Change the value of 'ajax_url' to admin_url( 'admin-ajax.php' )
6. Change the value of 'total_likes' to get_option( 'jsforwp_likes' )
7. Change the value of 'nonce' to wp_create_nonce( 'jsforwp_likes_nonce' )
8. Find check_ajax_referer()inside of jsforwp_add_like()
9. Change the parameter for check_ajax_referer() to 'jsforwp_likes_nonce'

### Step 2 - Setting up the AJAX Call
10. Open up '/assets/js/frontend-main.js'
11. Look for the axios() function
12. Change the url to jsforwp_globals.ajax_url
13. Change params.action to 'jsforwp_add_like'
14. Change params.\_ajax_nonce to jsforwp_globals.nonce
15. Inside of the if ( 'success' == ) conditional, change the html() value to response.data.total_likes

### Testing
16. Activate the plugin and open the site in the browser
17. Click on the "Like this Site" link
18. The number of likes should increase by 1 with each click

### Bonus
At the bottom of 'jsforwp-ajax.php' there is a require statement that pulls in more plugin code.

Look over the code in '/assets/lib/plugin-page.php' and '/assets/js/backend-main.js' to see an example of how to use AJAX on a plugin page.
