<?php

/**
 * @version [.200901] ADD LOAD MORE FEATURE TO HOME PAGE
 * @var AJAX_HANDLER
 * @file pid_loadmore_communities.php
 */
add_action('wp_ajax_loadmorecommunities', 'pid_loadmorecommunities_ajax_handler'); // wp_ajax_{action}
add_action('wp_ajax_nopriv_loadmorecommunities', 'pid_loadmorecommunities_ajax_handler'); // wp_ajax_nopriv_{action}
function pid_loadmorecommunities_ajax_handler()
{
  // prepare our arguments for the query
  $args = json_decode(stripslashes($_POST['query']), true);
  $args['paged'] = $_POST['page']; // we need next page to be loaded
  $args['post_status'] = 'publish';
  $session_id = $_POST['session_id'];

  // it is always better to use WP_Query but not here
  query_posts($args);
  // print_X($X, __LINE__, $args['paged']);
  $post_type = $args['post_type'];
  $post_type_labels = get_post_type_labels(get_post_type_object($post_type));

  if (have_posts()) :
    $iLoop = 1;
    // run the loop
    while (have_posts()) : the_post();
      if (has_post_thumbnail()) :
?>
        <div class="rh_gallery__item isotope-item <?php echo esc_attr($session_id); ?>">
          <?php
          $image_id       = get_post_thumbnail_id();
          $full_image_url = wp_get_attachment_url($image_id);
          global $gallery_image_size;
          $featured_image = wp_get_attachment_image_src($image_id, $gallery_image_size);
          ?>
          <figure>
            <div class="media_container">
              <a class="<?php echo esc_attr(get_lightbox_plugin_class()); ?> zoom" <?php echo generate_gallery_attribute(); ?> href="<?php echo esc_url($full_image_url); ?>" title="<?php the_title_attribute(); ?>">
                <img src="<?php echo esc_url(get_theme_file_uri(INSPIRY_THEME_ASSETS . '/images/icons/icon-zoom.svg')); ?>">
              </a>
              <a class="link" href="<?php the_permalink(); ?>">
                <img src="<?php echo esc_url(get_theme_file_uri(INSPIRY_THEME_ASSETS . '/images/icons/icon-link.svg')); ?>">
              </a>
            </div>
            <?php echo '<img class="img-border" src="' . esc_attr($featured_image[0]) . '" alt="' . the_title_attribute('echo=0') . '">'; ?>
          </figure>
          <h5 class="item-title entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
        </div>
<?php
      endif;

    endwhile;

  endif;
  die; // here we exit the script and even no wp_reset_query() required!
}
