<?php
/*
   Plugin Name: 2.2 - Enqueuing Backend JavaScript (Completed)
   Version: 1.0.0
   Author: Zac Gordon
   Author URI: https://twitter.com/zgordon
   Description: Example of how to load JavaScript on a backend plugin page (and frontend) of a WordPress site using a plugin
   Text Domain: jsforwp-load-backend-js
   License: GPLv3
*/

defined( 'ABSPATH' ) or die( 'No direct access!' );


function jsforwp_backend_scripts() {

  wp_enqueue_script(
    'jsforwp-backend-js',
    plugins_url( '/assets/js/backend-main.js', __FILE__ ),
    [],
    time(),
    true
  );

}
// Change 'admin_js_hook_here' to 'admin_enqueue_scripts'
add_action( 'admin_enqueue_scripts', 'jsforwp_backend_scripts' );


function jsforwp_backend_styles() {
  wp_enqueue_style( 'jsforwp-backend-css', plugins_url( '/assets/css/backend-main.css', __FILE__ ), [], time(), 'all' );
}
add_action( 'admin_enqueue_scripts', 'jsforwp_backend_styles' );


function jsforwp_frontend_scripts() {
  wp_enqueue_script( 'jsforwp-frontend-js', plugins_url( '/assets/js/frontend-main.js', __FILE__ ), [], time(), true );
}
add_action( 'wp_enqueue_scripts', 'jsforwp_frontend_scripts' );


function jsforwp_frontend_styles() {
  wp_enqueue_style( 'jsforwp-frontend-css', plugins_url( '/assets/css/frontend-main.css', __FILE__ ), [], time(), 'all' );
}
add_action( 'wp_enqueue_scripts', 'jsforwp_frontend_styles' );

?>
