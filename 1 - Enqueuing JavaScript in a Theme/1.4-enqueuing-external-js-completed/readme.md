# PRACTICE 1.4 Enqueuing External JavaScript

## Instructions

1. Open the functions.php file
2. Locate the *first* wp_enqueue_script() function inside of jsforwp_enqueue_scripts()
3. Change 'https://cdn.com/for/vue.js' to 'https://unpkg.com/vue@2.4.1'
4. Make the *second* wp_enqueue_script() dependent on "jsforwp-vue-js"
5. Locate the jsforwp_remove_ver_from_cdn() function
6. Change 'cdn.com' to 'unpkg.com'
7. Activate the theme and load in the browser
8. Look for "Vue Footer Loaded!" message in the footer
