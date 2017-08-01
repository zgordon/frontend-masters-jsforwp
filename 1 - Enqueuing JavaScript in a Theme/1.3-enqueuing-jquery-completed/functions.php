<?php

// Add Theme Support
add_theme_support( 'title-tag' );
add_theme_support( 'post-thumbnails' );
add_theme_support( 'html5' );
add_theme_support( 'automatic-feed-links' );


// Load in our JS
function jsforwp_enqueue_scripts() {

   // Change 'dependency-handle-1' to 'jquery'
   // Explore these other dependcy options https://goo.gl/vob23L
   // Change 'dependency-handle-2' to another dependcy
    wp_enqueue_script(
      'jsforwp-jquery-theme-js',
      get_stylesheet_directory_uri() . '/assets/js/jquery.theme.js',
      [
        'jquery',
        'jquery-masonry'
      ],
      time(),
      true
    );

}
add_action( 'wp_enqueue_scripts', 'jsforwp_enqueue_scripts' );


// Load in our CSS
function jsforwp_enqueue_styles() {

  wp_enqueue_style( 'roboto-slab-font-css', 'https://fonts.googleapis.com/css?family=Roboto+Slab', [], '', 'all' );
  wp_enqueue_style( 'main-css', get_stylesheet_directory_uri() . '/style.css', ['roboto-slab-font-css'], time(), 'all' );
  wp_enqueue_style( 'custom-css', get_stylesheet_directory_uri() . '/assets/css/custom.css', [ 'main-css' ], time(), 'all' );

}
add_action( 'wp_enqueue_scripts', 'jsforwp_enqueue_styles' );

// Control header for the_title
function jsforwp_title_markup( $title, $id = null ) {

    if ( !is_singular() && in_the_loop() ) {

      $title = '<h2><a href="' . get_permalink( $id ) . '">' . $title . '</a></h2>';

    } else if ( is_singular() && in_the_loop() ) {

      $title = '<h1>' . $title . '</h1>';

    }

    return $title;
}
add_filter( 'the_title', 'jsforwp_title_markup', 10, 2 );

// Register Menu Locations
register_nav_menus( [
  'main-menu' => esc_html__( 'Main Menu', 'wpheirarchy' ),
]);


// Setup Widget Areas
function jsforwp_widgets_init() {
  register_sidebar([
    'name'          => esc_html__( 'Main Sidebar', 'jsforwp' ),
    'id'            => 'main-sidebar',
    'description'   => esc_html__( 'Add widgets for main sidebar here', 'jsforwp' ),
    'before_widget' => '<section class="widget">',
    'after_widget'  => '</section>',
    'before_title'  => '<h2 class="widget-title">',
    'after_title'   => '</h2>',
  ]);
}
add_action( 'widgets_init', 'jsforwp_widgets_init' );


?>
