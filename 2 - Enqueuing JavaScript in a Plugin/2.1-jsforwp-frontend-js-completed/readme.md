# 2.1 - Enqueuing Frontend JavaScript with a plugin

1. Open jsforwp-frontend-js.php
2. Find the wp_enqueue_script() function inside of jsforwp_scripts()
3. Change '/path/to/file.js' to use plugins_url
4. Use '/assets/js/main.js' as the first parameter
5. Pass __FILE__ as second parameter
6. Active the plugin and load the site in the browser
7. Look for "Plugin JS Loaded!" in the Console
