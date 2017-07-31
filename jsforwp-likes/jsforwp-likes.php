<?php
/*
   Plugin Name: JS for WP Likes
   Version: 1.0.0
   Author: Zac Gordon
   Description: Allows logged in users to like posts
   Text Domain: jsforwp-likes
   License: GPLv3
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

function jsforwp_scripts() {
  // Register the CSS like this for a plugin:
  wp_enqueue_style( 'jsforwp-likes-css', plugins_url( '/assets/css/jsforwp-style.css', __FILE__ ), [], time(), 'all' );
  // Register the script like this for a plugin:
  wp_enqueue_script( 'jsforwp-likes', plugins_url( '/assets/js/jsforwp-likes.js', __FILE__ ), ['jquery'], time(), true );
  $like_nonce = wp_create_nonce("like_nonce");
  $jsforwp_global = array(
      'ajaxurl' => admin_url( 'admin-ajax.php'),
      'nonce' => $like_nonce
  );
  wp_localize_script( 'jsforwp-likes', 'jsforwp_globals', $jsforwp_global );

}
add_action( 'wp_enqueue_scripts', 'jsforwp_scripts' );

function jsforwp_add_like_button( $content ) {
  global $post;
  $button = '<a class="jsforwp-like" data-id="' . $post->ID . '" href="#like"><span class="dashicons dashicons-thumbs-up"></span></a>';
  if( is_main_query() && in_the_loop() ) {
    return $button . $content;
  } else {
    return $content;
  }
}
add_filter( 'the_content', 'jsforwp_add_like_button', 12, 2 );

function jsforwp_add_like_meta_box() {
  add_meta_box(
    'jsforwp-likes',
    esc_html__( 'Likes', 'jsforwp-likes' ),
    'post'
  );
}
add_action( 'add_meta_boxes', 'jsforwp_add_like_meta_box' );

?>
