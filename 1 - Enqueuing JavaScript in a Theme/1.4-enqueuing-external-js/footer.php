
  </div><!-- #content -->

  <footer id="colophon" class="site-footer" role="contentinfo">

    <a href="<?php echo esc_url( __( 'https://wordpress.org/', 'jsforwp' ) ); ?>">
      <?php printf( esc_html__( 'Proudly powered by %s', 'jsforwp' ), 'WordPress' ); ?>
    </a>
    |
    <span id="vue-footer" v-text="footerMsg"></span>

  </footer>

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
