<?php
/*
   Plugin Name: 2.1 - Enqueuing Frontend JavaScript (Completed)
   Version: 1.0.0
   Author: Zac Gordon
   Author URI: https://twitter.com/zgordon
   Description: Example of how to load JavaScript on the frontend of a WordPress site using from a plugin
   Text Domain: jsforwp-loadjs
   License: GPLv3
*/

defined( 'ABSPATH' ) or die( 'No direct access!' );

function jsforwp_scripts() {


  // Change '/path/to/file.js' to use plugins_url
  // Use '/assets/js/main.js' as the first parameter
  // Pass __FILE__ as second parameter
  wp_enqueue_script(
    'jsforwp-main-js',
    plugins_url( '/assets/js/main.js', __FILE__ ),
    [],
    time(),
    true
  );

}
add_action( 'wp_enqueue_scripts', 'jsforwp_scripts' );


function jsforwp_styles() {

  // Register the CSS like this for a plugin:
  wp_enqueue_style(
    'jsforwp-main-css',
    plugins_url( '/assets/css/main.css', __FILE__ ),
    [],
    time(),
    'all'
  );

}
add_action( 'wp_enqueue_scripts', 'jsforwp_styles' );

?>
