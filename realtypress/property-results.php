<?php
// PIDHomes:  Customized for RealHomes Theme
use Timber\{Timber};
use PIDHomes\{PIDEnv, Utility};

$context = [];

global $env, $utility;

if (!isset($utility) || !$utility::$isset_google_map_api) {
  $utility = new Utility('google_map');
};

if (!isset($env)) {
  $env = new PIDEnv($utility::$location_slug);
}

if (!empty($template_args)) {
  $_GET = $utility->get_rps_listing_uri_query_vars($template_args['get']);
  $shortcode = $template_args['a'];
} elseif (isset($_GET['post_type']) || isset($_GET['pp'])) {
  $_GET = $utility->get_rps_listing_uri_query_vars($_GET);
} else {
  // facebook uri:
  $_GET = $utility->get_rps_listing_uri_query_vars($_GET);
}

if (count($_GET) === 0) {
  switch ($env->community_level) {
    case "1":
      $_GET['input_city'] = $env->location_term->name;
      break;
    case "2":
      $_GET['input_community_name'] = $env->location_term->name;
      break;
    case "3":
      $_GET['input_neighbourhood'] = $env->location_term->name;
      break;
    default:
      break;
  }
} else {
  if (isset($_GET['input_city'])) {
    $_GET['input_city'] = str_replace('_', ' ', $_GET['input_city']);
  }
  if (isset($_GET['input_community_name'])) {
    $_GET['input_community_name'] = str_replace('_', ' ', $_GET['input_community_name']);
  }
  if (isset($_GET['input_neighbourhood'])) {
    $_GET['input_neighbourhood'] = str_replace('_', ' ', $_GET['input_neighbourhood']);
  }
}


// var_dump($_GET);

// If $shortcode is an object convert to array
if (isset($shortcode) && is_object($shortcode)) {
  $shortcode = json_encode($shortcode);
  $shortcode = json_decode($shortcode, true);
}

$shortcode = (isset($shortcode['view']) && isset($shortcode['style'])) ? $shortcode : array();

// If shortcode is set not to show agreement then set disclaimer as false, otherwise carry on as usual.
if (isset($shortcode['agreement']) && $shortcode['agreement'] === false) {
  $disclaimer = false;
} else {
  $disclaimer = rps_disclaimer_view($_COOKIE, $_POST);
}

$loaded_page['listing-results'] = true;

$crud = new RealtyPress_DDF_CRUD(date('Y-m-d'));
$list = new RealtyPress_Listings();
$tpl  = new RealtyPress_Template();
$fav  = new RealtyPress_Favorites();

if (get_query_var('paged')) {
  $paged = get_query_var('paged');
} elseif (get_query_var('page')) {
  $paged = get_query_var('page');
} else {
  $paged = 1;
}
$_GET['paged'] = $paged;

// Result View
$view = (!empty($_GET['view'])) ? $_GET['view'] : '';
$view = rps_get_results_format($view);
$_GET['view'] = $view;

// Search Query
$query = $list->rps_search_posts($_GET);

$favorites = $fav->rps_list_favorite_posts();
$favorites = array_filter($favorites);
$favorites = array_values($favorites);

// Data to pass to templates (partials)
$tpl_data = array(
  'get'       => $_GET,
  'query'     => $query,
  'view'      => $view,
  'paged'     => $paged,
  'shortcode' => $shortcode,
  'favorites' => $favorites
);

if (empty($shortcode)) {
  get_header();
  // PIDHomes:: Add RealHomes Header Banner
  $input_city = get_query_var('input_city');
  $header_variation = get_option('inspiry_listing_header_variation');

  if (empty($header_variation) || ('none' === $header_variation)) {
    get_template_part('assets/modern/partials/banner/header');
  } elseif (!empty($header_variation) && ('banner' === $header_variation)) {
    get_template_part('assets/modern/partials/banner/single-property');
  }
} ?>


<!-- Top Anchor for Scroller -->
<a href="#" id="top"></a>

<session class="rh_section rh_section--flex rh_wrap--padding rh_wrap--topPadding">
  <?php

  // ::DATA:: Get Social Share
  include(get_stylesheet_directory() . '/pid-partials/inc/social-share.php'); //:: Create Social Share Buttons
  $context = $social_share_context;
  ?>
  <!-- RealtyPress Wrapper -->
  <div class="bootstrap-realtypress rps-mb30 rps-mt30">

    <?php if (get_option('rps-general-fluid', true) == true || !empty($shortcode)) { ?>
      <div class="container-fluid">
      <?php } else { ?>
        <div class="container">
        <?php } ?>

        <div class="row row-property-result">

          <?php
          //      if( $disclaimer == true && get_option( 'rps-general-show-crea-disclaimer', 1 ) == 1 ) {

          // CREA disclaimer has not been agreed to, display CREA disclaimer
          // Do before hook, get CREA disclaimer partial, do after hook.
          //          do_action ( 'realtypress_before_listing_result_header' );
          //            echo $tpl->get_template_part( 'partials/crea-disclaimer' );
          //          do_action ( 'realtypress_after_listing_result_header' );
          //
          //        }
          //        else {

          if (
            empty($shortcode['style']) && get_option('rps-result-page-layout', 'page-sidebar-right') == 'page-sidebar-left' ||
            !empty($shortcode['style']) && $shortcode['style'] == 'sidebar-left'
          ) {
            // Sidebar Left
            echo $tpl->get_template_part('sidebar-results-sidebar-left', $tpl_data);
          }

          if (
            empty($shortcode['style']) && get_option('rps-result-page-layout', 'page-sidebar-right') == 'page-full-width' ||
            !empty($shortcode['style']) && $shortcode['style'] == 'full-width'
          ) {
            // Full Width
            echo '<div class="col-sm-12 col-property-result">';
            echo '<div class="col-inner-result">';
          } else {
            // Sidebar Right (default)
            echo '<div class="col-md-9 col-sm-8 col-xs-12 col-property-result">';
            echo '<div class="col-inner-result">';
          }

          // Do before hook, get result header partial, do after hook.
          do_action('realtypress_before_listing_result_header');
          echo $tpl->get_template_part('partials/property-result-header', $tpl_data);
          do_action('realtypress_after_listing_result_header');
          Timber::render('././partials-twig/components/social-share.twig', $context);
          if ($view == 'grid') {

            // Do before hook, get result grid partial, do after hook.
            do_action('realtypress_before_listing_result_grid');
            echo $tpl->get_template_part('partials/property-result-grid', $tpl_data);
            do_action('realtypress_after_listing_result_grid');
          } elseif ($view == 'list') {

            // Do before hook, get result list partial, do after hook.
            do_action('realtypress_before_listing_result_list');
            echo $tpl->get_template_part('partials/property-result-list', $tpl_data);
            do_action('realtypress_after_listing_result_list');
          } elseif ($view == 'map') {

            // Do before hook, get result map partial, do after hook.
            do_action('realtypress_before_listing_result_map');
            echo $tpl->get_template_part('partials/property-result-map', $tpl_data);
            do_action('realtypress_after_listing_result_map');
          }

          echo '</div><!-- ./col-inner-result -->';

          if (
            empty($shortcode['style']) && get_option('rps-result-page-layout', 'page-sidebar-right') == 'page-full-width' ||
            !empty($shortcode['style']) && $shortcode['style'] == 'full-width'
          ) { ?>
            <div class="row">
              <div class="col-sm-6 col-xs-12">
                <?php
                if (get_option('rps-result-contact-form', 1) == 1) {
                  echo $tpl->get_template_part('partials/property-result-contact-form-h', $tpl_data);
                }
                ?>
              </div><!-- /.col-sm-6 -->
              <div class="col-sm-6 col-xs-12">
                <?php
                if (get_option('rps-result-user-favorites', 1) == 1) {
                  echo $tpl->get_template_part('partials/user-favorites-h', $tpl_data);
                }
                ?>
              </div><!-- /.col-sm-6 -->
            </div><!-- /.row -->
          <?php } ?>

        </div><!-- /.col-sm-9 . col-property-result -->

        <?php
        if (
          empty($shortcode['style']) && get_option('rps-result-page-layout', 'page-sidebar-right') == 'page-sidebar-right' ||
          !empty($shortcode['style']) && $shortcode['style'] == 'sidebar-right'
        ) {

          // Sidebar Right
          echo $tpl->get_template_part('sidebar-results-sidebar-right', $tpl_data);
        }
        ?>

        <?php // } // end disclaimer else 
        ?>

        </div><!-- /.row -->
      </div><!-- /.container -->
  </div><!-- /.bootstrap-realtypress -->
</session>

<?php
// ::DATA:: Greater Vancouver Location Map
$context = [];
$show_map = true;
include(get_stylesheet_directory() . '/pid-partials/inc/pid-map.php'); //:: Create Map Data
$context['map_info']['show_map'] = true;
$context['map_info']['pid_map_locations'] = $pid_map_locations;
$context['map_info']['pid_map_image'] = $env->map_quest_image_uri;
Timber::render('././partials-twig/components/pid-map.twig', $context['map_info']);

// Get Market Charts
$market = array(
  'show_map' => true,
  'location' => $env::$location,
  'post_type' => 'market',
  'is_pid_post' => false,
  'is_a_single_post' => false,
  'report_level' => $env->community_level,
  'render_market' => true
);
$context['market_section_h1'] = $env->market_section_h1;
get_template_part('././pid-partials/content', 'market-stats', json_encode($market));

if (empty($shortcode)) {
  get_footer();
} ?>

<?php
// Search Location Shortcode
$look_search    = (!empty($_GET['look'])) ? $_GET['look'] : '';
$input_map_look = (!empty($_GET['input_map_look'])) ? $_GET['input_map_look'] : '';

if ($look_search == true) {
  $json                        = array();
  $json['look_search']         = $look_search;
  $json['input_map_look']      = $input_map_look;
?>
  <script type="application/json" id="listing-results-options-json">
    <?php print json_encode($json); ?>
  </script>
<?php } ?>
<!-- <?php echo REALTYPRESS_PLUGIN_NAME . ' v' . REALTYPRESS_PLUGIN_VERSION ?> -->