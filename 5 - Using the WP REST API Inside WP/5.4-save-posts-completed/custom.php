<?php
  // Template Name: Custom JS Page
  get_header();
?>

  <div id="primary" class="content-area">

    <main id="main" class="site-main" role="main">

      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

        <article id="post-<?php the_ID(); ?>"  <?php post_class(); ?>>

          <header class="entry-header">

            <?php the_title(); ?>

          </header>

          <div class="entry-content">

            <?php if ( is_user_logged_in() && current_user_can( 'edit_others_posts' ) ): ?>

              <p><a class="button toggle-add-form" href="#add-new">New Post +</a></p>

              <div id="add-post-form" class="hidden">
                <h3 class="add-new-post">Add New Post</h3>

                <h3><input id="new-title" class="title-editor" type="text" name="title" placeholder="Enter title here" value=""></h3>

                <?php wp_editor('', 'editor'); ?>

                <p><input id="save-post" class="button" type="submit" name="" value="Save"></p>
              </div>

            <?php endif; ?>

            <div id="list-posts"></div>

          </div>

        </article>

      <?php endwhile; endif; ?>

    </main>

  </div>

  <?php get_sidebar(); ?>

<?php get_footer(); ?>
