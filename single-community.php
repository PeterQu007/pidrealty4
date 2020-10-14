<?php

/**
 * PIDHomes:: All Communities Page
 *
 * @package realhomes-child
 * @subpackage modern
 * 
 * @since [.200908] TRANSFER TO TIMBER / TWIG
 */
if (!function_exists('pid_singular_community_googleMap')) {
  function pid_singular_community_googleMap()
  {
    // google map api js for regular wp pages
    // for some reason, RealHomes load google map api for some pages, but not for single and property-city taxo.
    global $language;
    switch ($language) {
      case 'cn':
        $lang = 'zh'; // language setting for google map chinese
        break;
      default:
        $lang = 'en';
        break;
    }
    wp_enqueue_script('googleMap', "//maps.googleapis.com/maps/api/js?key=AIzaSyAczOjPVWMravPAIpPPegKgPtTFiipbgMM&language=$lang", null, '1.0', true);
  }
  add_action('wp_enqueue_scripts', 'pid_singular_community_googleMap', PHP_INT_MAX);
}

use PIDHomes\{PIDEnv};
use Timber\{Timber, Post};

$env = new PIDEnv();

$context = Timber::context();
$_metabox = [];

// Render Theme Page Head.
get_header();

$context['community_label'] = $env->location_term->label;
$context['community_section_h1'] = $env->community_section_h1;
// Render Page Banner
get_template_part('assets/modern/partials/banner/pid-banner');

// ::DATA:: Get Social Share
include('pid-partials/inc/social-share.php'); //:: Create Social Share Buttons
$context['social_share'] = $social_share_context;

// ::DATA:: Greater Vancouver Location Map
$show_map = true;
include('pid-partials/inc/pid-map.php'); //:: Create Map Data
$context[$env->post_type]['show_map'] = $show_map;
$context[$env->post_type]['pid_map_locations'] = $pid_map_locations;

// Get Community / Neighborhood Posts
$community = array(
  'show_map' => true,
  'location' => $env::$location,
  'post_type' => 'community',
  'is_pid_post' => false,
  'is_a_single_post' => is_single(),
  'community_level' => $env->community_level,
  'community_term_id' => $env->community_term_id,
  'post_type_labels' => $env->post_type_labels
);
get_template_part('pid-partials/content', 'pid-post', json_encode($community));

// Get Market Charts
$market = array(
  'show_map' => false,
  'location' => $env::$location,
  'post_type' => 'market',
  'is_pid_post' => false,
  'is_a_single_post' => false,
  'report_level' => $env->community_level
);
$context['market_section_h1'] = sprintf(__("%s Market Chart", 'pidhomes'), $env->community_label);
get_template_part('pid-partials/content', 'market-stats', json_encode($market));

// Get Housing Inventory Table
$context['location_is_gva'] = $env::$location == 'gva';

// Get School Posts
$school = array(
  'show_map' => false,
  'location' => $env::$location,
  'post_type' => 'school',
  'is_pid_post' => false,
  'is_a_single_post' => false,
  'community_level' => $env->community_level,
  'post_type_labels' => $env->post_type_labels
);
$context['school_section_h1'] = sprintf(__("%s School List", 'pidhomes'), $env->community_label);
get_template_part('pid-partials/content', 'pid-post', json_encode($school));

// Render Demographic Content block
$context['demographic'] = $env::$location;

// Get RPS Listing sectionTitle
// if $term->name (the city's WP_Term) has two words, get the Timber Post
$context['rps_listings']['create_listings_by_post_content'] = false;
if ($env->community_level != 0 && strrpos($env->location_city_term->name, " ") > 0) {
  $context['rps_listings']['create_listings_by_post_content'] = true;
  $context['rps_listings']['post'] = new Post(); // Get Posts
}
$context['rps_listings']['rps_section_h1'] = sprintf(__("Active Listings Of %s", 'pidhomes'),  $env->location_city_term->label);
$context['rps_listings']['rps_location'] = $env->location_city_term->name;
$context['rps_listings']['community_level'] = $env->community_level;

// ::DATA::Get more Community Market Charts
include('pid-partials/inc/related-communities.php');
$context['related_communities']['more_community_charts_h1'] = sprintf(__("More Related Communities Of %s", 'pidhomes'),  $env->location_city_term->label);
$context['related_communities']['nbh_terms'] = $_nbh_terms;

// var_dump($context);

// ::RENDER:: THE PAGE
Timber::render('partials-twig/archive-community.twig', $context);
