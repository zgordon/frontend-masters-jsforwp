# 2.2 - Enqueuing Admin Area JavaScript with a Plugin

1. Open jsforwp-admin-js.php
2. Find the the add_action() immediately after the jsforwp_backend_scripts() function
3. Change 'admin_js_hook_here' to 'admin_enqueue_scripts'
4. Activate the plugin and refresh the page
6. Look for "Backend Plugin JS Loaded!" in the Console in the admin area
