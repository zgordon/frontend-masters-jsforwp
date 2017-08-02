<?php
/*
   Plugin Name: Simple Posts Endpoint
   Version: 1.0.0
   Author: Zac Gordon
   Author URI: https://twitter.com/zgordon
   Description: Provides a simplified (and faster) listing of blog posts at the custom endpoint site.com/wp-json/simple/v1/posts.  Includes id, slug, title, excerpt and content for each post.
   Text Domain: jsforwp-simple-posts-endpoint
   License: GPLv3
*/

defined( 'ABSPATH' ) or die( 'No direct access!' );

// Register the endpoint
function jsforwp_register_simple_posts() {
  register_rest_route( 'simple/v1', '/posts', [
    'methods' => 'GET',
    'callback' => 'jsforwp_simple_posts',
  ] );
}
add_action( 'rest_api_init', 'jsforwp_register_simple_posts' );

// Get simple posts
function jsforwp_simple_posts( $data ) {

  // Get all posts
  $args = [
    'numberposts'       => -1,
    'suppress_filters'  => true
  ];
  $posts = get_posts( $args );

  // If not posts, return null
  if ( empty( $posts ) ) {
    return null;
  }

  // If posts, setup simple posts
  $simple_posts = [];
  foreach( $posts as $post ) {

    $simple_post = [
      'id'      => $post->ID,
      'url'     => $post->guid,
      'slug'    => $post->post_name,
      'title'   => $post->post_title,
      'excerpt' => wpautop( $post->post_excerpt ),
      'content' => wpautop( $post->post_content ),
    ];
    array_push( $simple_posts, $simple_post );

  }

  return $simple_posts;

}

?>
