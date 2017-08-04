<?php
    // Template Name: Custom Page
    get_header();
?>

  <div id="primary" class="content-area">

    <main id="main" class="site-main" role="main">

      <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

        <article id="post-<?php the_ID(); ?>"  <?php post_class(); ?>>

          <header class="entry-header">

            <?php the_title(); ?>

          </header>

          <div id="vueapp" class="entry-content" v-cloak>

            <ul v-if="!isSingle">
                <li v-for="post in posts" :key="post.id">
                    <a :href="'#/'+post.slug" @click="showPost(post)">
                        {{ post.title.rendered }}
                    </a>
                </li>
            </ul>

            <div v-else>
                <p><a href="#/" @click="showPosts"><< Back to Posts</a></p>
                <h2 v-text="post.title.rendered"></h2>
                <div v-html="post.content.rendered"></div>
            </div>

          </div>

        </article>

      <?php endwhile; endif; ?>

    </main>

  </div>

  <?php 
  get_sidebar(); 
  
get_footer();
