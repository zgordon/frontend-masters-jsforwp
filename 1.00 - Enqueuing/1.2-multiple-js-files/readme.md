# PRACTICE 1.2 Enqueuing Multiple JavaScript Files and Making Dependencies

## Instructions

1. Open the functions.php file
2. Locate the *first* wp_enqueue_script() function inside of jsforwp_enqueue_scripts()
3. Change 'unique-handle-here' to 'jsforwp-config-js'
4. Change Change '/path/to/file.js' to '/assets/js/config.js'
5. Locate the *second* wp_enqueue_script() function inside of jsforwp_enqueue_scripts()
6. Change 'dependency-handle-here' to 'jsforwp-config-js'
4. Activate the theme and load the site in the browser
5. Look for a "Config Message Loaded!" message in the console
