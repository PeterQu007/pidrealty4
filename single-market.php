<?php

/**
 * PIDHomes:: Single Market Post Page
 * Single Market Post Page is for a single post
 * Custom Single Market Post Page is for post 'm'
 * URL:: /market/location/property_type/chart_type/year/month
 * @package realhomes-child
 * @subpackage modern
 */

// P1:: PREPARATION, READ QUERY VARS, 
$time_start = microtime(true);
$post_lang = get_query_var('lang'); // cn: simplified chinese; tw: traditional chinese
// $chart_param = get_query_var('chart-param'); // chart parameters form url, sepearted by ','
// $cParams = explode('.', $chart_param);
$cParams = array('gva', 'all', 'dollar', '2020', '1');
$location = get_query_var('property-city');
if ($location == '') {
  $location = $cParams[0];
}
$location_term = get_term_by('slug', $location, 'property-city');
if (!$location_term) {
  $location_term = get_term_by('slug', 'gva', 'property-city');
}
$location_ancestors = get_ancestors($location_term->term_id, 'property-city');
if (count($location_ancestors) > 0) {
  $location_city_id = $location_ancestors[count($location_ancestors) - 1];
  $location_city_term = get_term($location_city_id, 'property-city');
} else {
  $location_city_term = $location_term;
}
// P1B:: GET CHART PARAMETERS
$property_type = strtolower(get_query_var('dwell'));
if ($property_type == '') {
  $property_type = $cParams[1];
  // set_query_var('dwell', $property_type);
}
$chart_type = get_query_var('chart');
if ($chart_type == '') {
  $chart_type = $cParams[2];
  // set_query_var('chart', $chart_type);
}
$years = get_query_var('y');
$years = explode(",", $years);
if ($years[0] == '') {
  $years = $cParams[3];
  // set_query_var('y', $years);
}
$months = get_query_var('mh');
if ($months == '') {
  $months = $cParams[4];
  // set_query_var('mh', $months);
}
// P1C: GET LANGUAGE TRANSLATIONS
$lang_set = [];
$locales = array(
  'en_US',
  'en_GB',
  'zh_CN',
  'zh_HK',
);
$translate_options = array(
  'location' => $location,
  'property_type' => $property_type,
  'chart_type' => $chart_type,
  'years' => $years,
  'month' => $months,
  'translation_group' => 1 // 1 for market archive, 2 for chart selection
);

$lang_set = pid_translate($post_lang, $translate_options);
// P1D:: CHECK POST SLUG/NAME
$post_name = get_query_var('name');
if ($post_name != 'mkt') {
  $marketID = get_the_ID(); // get the market post ID
  $terms = get_terms(array(
    'taxonomy' => 'property-city',
    'parent' => 0, //get top level taxo:: City
    'object_ids' => $marketID
  ));
  $market = $terms[0]->slug;
  $market_name = $terms[0]->name;
  $location = $market;
} else {
  add_filter('the_content', 'filter_the_content_in_the_main_loop', 1);
  function filter_the_content_in_the_main_loop($content)
  {
    // Check if we're inside the main loop in a single Post.
    global $location_city_term;
    if (is_singular() && in_the_loop() && is_main_query()) {
      return "[rps-listing-carousel max_slides=8 city='$location_city_term->name']";
    }
    return $content;
  }
}

if ($post_lang != '') {
  $title_tag = current_theme_supports('title-tag');
  if ($title_tag) {
    add_filter('pre_get_document_title', 'pid_change_page_title');
    function pid_change_page_title($title)
    {
      global $lang_set;
      return wp_strip_all_tags($lang_set['title']);
    }
  }
  add_filter('the_title', 'pid_change_post_title', 10, 2);
  function pid_change_post_title($title, $id)
  {
    if (get_post_type($id) == "post") {
      global $lang_set;
      $title = $lang_set['title'];
    }
    return  $title;
  }
} else {
  $title_tag = current_theme_supports('title-tag');
  if ($title_tag) {
    add_filter('pre_get_document_title', 'pid_change_page_title');
    function pid_change_page_title($title)
    {
      global $lang_set;
      return wp_strip_all_tags($lang_set['title']);
    }
  }
}

set_query_var('market', $location);
require_once(get_stylesheet_directory() . '/inc/neighborhood-metabox.php');

// P2:: Render Theme Page Head And Banner
get_header();
// Get Banner
set_query_var('community_label', $lang_set['city']);
get_template_part('assets/modern/partials/banner/market');

// P3:: Render Market Chart
$section_title = $lang_set['section_title'];
$section_content = $lang_set['section_content'];
$section_icon = wp_get_upload_dir()['baseurl'] . "/2015/07/icon-design-variation-1.png";
$HPI_table_title = $lang_set['HPI_table_title'] . $lang_set['this_month_label'];
?>

<hr class="pid_separator">
<section class="rh_section rh_section--flex rh_wrap--padding rh_wrap--topPadding pid_wrap--padding">
  <div class="rh_page rh_page__listing_page rh_page__main">
    <h2 class="pid_separator--first-line"><?php echo $section_title; ?></h2>
    <div class="pid_section_wrapper">
      <img class="pid_section_leading_icon" src=<?php echo $section_icon; ?>>
      <p class="pid_section_content"><?php echo $section_content; ?></p>
    </div>
    <?php
    // Render market stats block
    set_query_var('report-level', $location == "gva" ? 1 : 2);
    set_query_var('property-city', $location);
    get_template_part('pid-partials/content', 'market-stats-x');

    ?>
    <!-- P4:: CREATE HPI TABLES -->
    <h2 class="pid_separator"><?php echo $HPI_table_title; ?></h2>
    <?php
    // community level values will be 0, 1, 2, null === 3
    $community_level = get_field('community_level', 'property-city_' . $location_term->term_id);

    $nbhCodesAndNames = get_nbhCodes_and_nbhNames($location, 2);
    $nbhCodes = $nbhCodesAndNames[0];
    $nbhNames = $nbhCodesAndNames[1];
    // echo do_shortcode("[wpdatatable id=30 var1='" . $market_name . "']");
    // echo do_shortcode("[wpdatachart id=3]");
    if ($community_level === "0") {
      echo do_shortcode("[wpdatatable id=29]");
      echo do_shortcode("[wpdatachart id=2]");
    } else {
      echo do_shortcode("[wpdatatable id=45 VAR1=$nbhCodes]");
      // echo do_shortcode("[wpdatachart id=5]");
    }
    ?>
    <!-- P5:: CREATE RPS LISTING SHOWCASE -->
    <hr class="pid_separator--first-line">
    <section class='rps_listing-template-default single single-rps_listing variation--cards wpb-js-composer js-comp-ver-6.1 vc_responsive pid_community'>
      <div class="vc_row wpb_row vc_row-fluid rp-page vc_custom_1530887860175 vc_row-has-fill main--content">
        <div class="wrapper container">
          <div class="row">
            <div class="ihf-page wpb_column vc_column_container vc_col-sm-12 ">
              <div class="vc_column-inner ">
                <div class="wpb_wrapper ">
                  <h2 class="pid_separator"><?php echo $lang_set['active_listings_label']; ?></h2>
                  <?php
                  if ($community_level === "0") {
                    echo do_shortcode("[rps-listing-slider max_slides=16]");
                  } else {
                    // output the rps listing
                    if (have_posts()) {
                      while (have_posts()) {
                        the_post();
                        the_content();
                      }
                    }
                  }
                  ?>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- P6:: CREATE MORE COMMUNITY MARKET CHARTS LINKS -->
    <section class='rps_listing-template-default single single-rps_listing variation--cards wpb-js-composer js-comp-ver-6.1 vc_responsive pid_community'>
      <h2 class="pid_separator">More Community Market Charts:</h2>
      <div class="metabox metabox--with-home-link">
        <div class="sub_market_wrapper ">
          <ul>
            <?php
            switch ($community_level) {
              case "0":
                $more_nbhs_names = json_decode(get_nbhCodes_and_nbhNames($location, 1)[1]);
                break;
              case "1":
              case "2":
                $more_nbhs_names = json_decode(get_nbhCodes_and_nbhNames($location, 2)[1]);
                break;
              default:
                // default level is level 3
                $more_nbhs_names = nbh_Direct_2Level_metabox_by_Slug($location);
                $x = [];
                foreach ($more_nbhs_names as $nbh) {
                  $x[$nbh['Term_Code']] = $nbh['Term_Name'];
                }
                $more_nbhs_names = $x;
                break;
            }
            foreach ($more_nbhs_names as $key => $value) {
              $nbh_term = get_term_by('name', $value, 'property-city');
              $nbh_link = site_url() . '/market/' . $nbh_term->slug;
            ?>
              <li class="metabox__blog-home-link pid_sub_market_label pid_more_community_label"><a href="<?php echo $nbh_link; ?>"><?php echo $nbh_term->name; ?></a></li>
            <?php
            }
            ?>
          </ul>
        </div>
      </div>
    </section>

  </div>
  <!-- P7:: CREATE PAGE SIDEBAR -->
  <div class="rh_page rh_page_sidebar">
    <?php get_sidebar('default'); ?>
  </div>
</section>

<?php
// P8:: CREATE PAGE FOOTER
get_template_part('assets/modern/partials/banner/peterqu');
$time_end = microtime(true);
$time = $time_end - $time_start;
echo $time;
echo '</br>';
global $time_start1, $time_start2, $time_start3;
echo $time_start1;
echo '</br>';
echo $time_start2;
echo '</br>';
echo $time_start3;
echo '</br>';
echo $time_start;
echo '</br>';
echo $time_end;
echo '</br>';

get_footer();
