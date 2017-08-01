<?php
/*
   Plugin Name: 2.3 - Enqueuing Plugin Page JavaScript
   Version: 1.0.0
   Author: Zac Gordon
   Author URI: https://twitter.com/zgordon
   Description: Learn how to load JavaScript only on the plugin admin page
   Text Domain: jsforwp-load-plugin-js
   License: GPLv3
*/

defined( 'ABSPATH' ) or die( 'No direct access!' );

// Set $main_menu_url equal to 'jsforwp-2-3'
$main_menu_url = 'change_me';

function jsforwp_admin_menu() {
  global $main_menu_url;
	add_menu_page(
    'JS for WP Plugin Page',
    'JS for WP',
    'manage_options',
    $main_menu_url . '.php',
    'jsforwp_admin_page',
    'dashicons-heart',
    76
  );
}
add_action( 'admin_menu', 'jsforwp_admin_menu' );


function jsforwp_admin_page(){
	?>
	<div class="wrap">
		<h2><?php esc_html_e( 'JS for WP Plugin', 'jsforwp-load-plugin-js' ); ?></h2>
    <p><?php esc_html_e( 'This is a basic plugin admin page that does not do anything.  Check the console for loaded JavaScript.', 'jsforwp-load-plugin-js' ); ?></p>
	</div>
	<?php
}

function jsforwp_backend_scripts( $hook ) {

  global $main_menu_url;

  // Change 'custom_url' to $main_menu_url
  if( $hook != 'toplevel_page_' . 'custom_url' ) {
    return;
  }

  wp_enqueue_script( 'jsforwp-backend-js', plugins_url( '/assets/js/backend-main.js', __FILE__ ), [], time(), true );

}
add_action( 'admin_enqueue_scripts', 'jsforwp_backend_scripts' );


function jsforwp_backend_styles( $hook ) {

  global $main_menu_url;

  if( $hook != 'toplevel_page_' . $main_menu_url ) {
    return;
  }

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
