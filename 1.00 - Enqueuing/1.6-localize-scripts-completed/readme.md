# PRACTICE 1.6 - Localizing Scripts

## Instructions

1. Open the functions.php file
2. Locate the wp_localize_script() function inside of jsforwp_enqueue_scripts()
3. Change 'unique-handle' to 'jsforwp-theme-js'
4. Change 'unique_name' to 'jsforwp_vars'
5. Change the value of 'site_url' to esc_url( home_url() )
6. Change the value of 'site_name' to get_bloginfo( 'name' )
7. Activate the theme and load in the browser
8. Look for the correct Site URL and Site Name in the Console
