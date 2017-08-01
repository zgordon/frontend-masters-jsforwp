# 2.3 - Enqueuing Plugin Page JavaScript

1. Open jsforwp-plugin-page-js.php
2. Find where the $main_menu_url variable is being assigned and set it to 'jsforwp-2-3'
3. Find the jsforwp_backend_scripts() function
4. Find the conditional statement that begins if( $hook != )
5. Change the value of 'custom_url' to $main_menu_url
6. Activate the plugin and click on the JS for WP menu item
7. Look for "Backend Plugin JS Loaded!" in the Console
8. Navigate to other pages in the admin area and you _should not_ see this message
