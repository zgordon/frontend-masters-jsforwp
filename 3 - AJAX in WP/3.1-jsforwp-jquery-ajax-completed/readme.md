# 3.1 - jQuery AJAX

### Part 1 - Setting up the Enqueue
1. Open up 'jsforwp-ajax.php'
2. Find the function jsforwp_frontend_scripts()
3. Find the wp_localize_script() function inside of jsforwp_frontend_scripts()
4. Change the value of 'ajax_url' to admin_url( 'admin-ajax.php' )
5. Change the value of 'total_likes' to get_option( 'jsforwp_likes' )
6. Change the value of 'nonce' to wp_create_nonce( 'jsforwp_likes_nonce' )

### Step 2 - Hooking in the AJAX Function
7. Find add_action function directly after jsforwp_add_like()
8. Change 'wp_ajax_your_hook' to 'wp_ajax_jsforwp_add_like'
9. Change 'your_hook' to 'jsforwp_add_like'
10. Inside of jsforwp_add_like(), change the parameter of check_ajax_referer() to 'jsforwp_likes_nonce'

### Step 3 - The jQuery AJAX Call
11. Open up '/assets/js/frontend-main.js'
12. Look for the $.ajax() function
13. Change url to jsforwp_globals.ajax_url
14. Change data.action to 'jsforwp_add_like'
15. Change data.\_ajax_nonce to jsforwp_globals.nonce
16. Inside of the AJAX success method, change the html() value to response.total_likes

### Testing
17. Activate the plugin and open the site in the browser
18. Click on the "Like this Site" link
19. The number of likes should increase by 1 with each click

### Bonus
At the bottom of 'jsforwp-ajax.php' there is a require statement that pulls in more plugin code.

Look over the code in '/assets/lib/plugin-page.php' and '/assets/js/backend-main.js' to see an example of how to use AJAX on a plugin page.
