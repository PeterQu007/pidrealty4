<?php

/**
 * PIDHomes:: Single Community Post Page
 *
 * @package realhomes-child
 * @subpackage modern
 */

$communityID = get_the_ID();
$terms = get_terms(array(
  'taxonomy' => 'property-city',
  'childless' => true,
  'object_ids' => $communityID
));
$community = $terms[0]->slug;
set_query_var('community', $community);
require_once(get_stylesheet_directory() . '/inc/neighborhood-metabox.php');
//************ */

get_header();

// Render Theme Page Head.
$header_variation = get_option('inspiry_listing_header_variation');

if (empty($header_variation) || ('none' === $header_variation)) {
  get_template_part('assets/modern/partials/banner/header');
} elseif (!empty($header_variation) && ('banner' === $header_variation)) {
  get_template_part('assets/modern/partials/banner/community');
}

if (inspiry_show_header_search_form()) {
  get_template_part('assets/modern/partials/properties/search/advance');
}

if (isset($_GET['view'])) {
  $view_type = $_GET['view'];
} else {
  /* Theme Options Listing Layout */
  $view_type = get_option('theme_listing_layout');
}

?>
<script>
  var ajax_session = new Object();
</script>
<section class="rh_section rh_section--flex rh_wrap--padding rh_wrap--topPadding">
  <div class="rh_page rh_page__listing_page rh_page__main">
    <?php
    // Render community block
    get_template_part('pid-partials/content', 'single-community');
    // Render market stats block
    get_template_part('pid-partials/content', 'market-stats');
    // Render school block
    set_query_var('post_type', 'school');
    get_template_part('pid-partials/content', 'x-post');

    ?>
    <section class='rps_listing-template-default single single-rps_listing variation--cards wpb-js-composer js-comp-ver-6.1 vc_responsive pid_community'>
      <div class="vc_row wpb_row vc_row-fluid rp-page vc_custom_1530887860175 vc_row-has-fill main--content">
        <div class="wrapper container">
          <div class="row">
            <div class="ihf-page wpb_column vc_column_container vc_col-sm-12 ">
              <div class="vc_column-inner ">
                <div class="wpb_wrapper ">
                  <?php
                  // echo do_shortcode('[rps-listings show_per_page=8 city=surrey]');
                  echo do_shortcode('[rps-listing-slider max_slides=8 city=surrey]');
                  ?>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>

  <div class="rh_page rh_page_sidebar">
    <?php get_sidebar('default'); ?>
  </div>
</section>


<?php
/************ */
get_template_part('assets/modern/partials/banner/peterqu');
get_footer();
