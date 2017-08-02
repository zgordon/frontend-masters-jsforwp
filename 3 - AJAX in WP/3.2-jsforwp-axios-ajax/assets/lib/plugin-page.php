<?php

$main_menu_url = 'jsforwp-likes-3-2';

function jsforwp_admin_menu() {
  global $main_menu_url;
	add_menu_page(
    'JS for WP Likes Plugin Page',
    'JS Likes',
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
		<h2><?php esc_html_e( 'JS for WP Likes', 'jsforwp-axios-ajax' ); ?></h2>
    <p>Total Likes: <span class="jsforwp-total-likes"><?php echo get_option( 'jsforwp_likes' ); ?></span></p>
    <p><a href="#reset-likes" class="jsforwp-reset-likes">Reset Likes to 0</a></p>
	</div>
	<?php
}

function jsforwp_backend_scripts( $hook ) {

  global $main_menu_url;
  if( $hook != 'toplevel_page_' . $main_menu_url ) {
    return;
  }

  $nonce = wp_create_nonce( 'jsforwp_likes_reset_nonce' );

  wp_enqueue_script( 'axios-js', 'https://unpkg.com/axios/dist/axios.min.js', [], '', true);
  wp_enqueue_script( 'jsforwp-backend-js', plugins_url( '../js/backend-main.js', __FILE__ ), ['jquery', 'axios-js'], time(), true );
  wp_localize_script(
    'jsforwp-backend-js',
    'jsforwp_globals',
    [
      'ajax_url'    => admin_url( 'admin-ajax.php' ),
      'total_likes' => get_option( 'jsforwp_likes' ),
      'nonce'       => $nonce
    ]
  );
}
add_action( 'admin_enqueue_scripts', 'jsforwp_backend_scripts' );

function jsforwp_reset_likes( ) {

  check_ajax_referer( 'jsforwp_likes_reset_nonce' );

  update_option( 'jsforwp_likes', 0 );

  $response['total_likes'] = 0;
  $response['type'] = 'success';

  $response = json_encode($response);
  echo $response;

  die();

}
add_action( 'wp_ajax_jsforwp_reset_likes', 'jsforwp_reset_likes' );
