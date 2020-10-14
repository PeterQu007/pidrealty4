<?php

/**
 * PIDHomes:: Market Archive Page
 * Archive Page of all market posts
 * Custom Archive Page is used to show GVA market charts
 * URL:: /markets/
 * @package realhomes-child
 * @subpackage modern
 */

global $language;

use PIDHomes\{Metabox, PIDEnv, Utility};
use Timber\{Timber};

// P1:: PREPARATION, READ QUERY VARS,
$utility = new Utility('google-map');
$env = new PIDEnv();
$remote_ip = $env::$remote_ip;
$is_myself_ip = $env::$is_myself_ip;

$lang_set = $env->get_pid_translate();

// P1B:: GET CHART PARAMETERS

$property_type = $env->query_vars['property_type'];
$chart_type = $env->query_vars['chart_type'];
$years = $env->query_vars['years'];
$months = $env->query_vars['month'];

// P2:: Render Theme Page Head And Banner
get_header();
// Get Banner
get_template_part('assets/modern/partials/banner/pid-banner');

// P3A:: Prepare Render Market Chart
$section_title = $lang_set['section_title'];
$section_content = $lang_set['section_content'];
$section_icon = wp_get_upload_dir()['baseurl'] . "/2020/08/icon-design.png";
$HPI_table_title = $lang_set['HPI_table_title'] . $lang_set['this_month_label'];
$section_more_charts = $lang_set['section_more_charts'];

// ::DATA:: Greater Vancouver Location Map
$show_map = true;
include('pid-partials/inc/pid-map.php'); //:: Create Map Data
$context['map_info']['show_map'] = true;
$context['map_info']['pid_map_locations'] = $pid_map_locations;
$context['map_info']['pid_map_image'] = $env->map_quest_image_uri;

// Get Page Title, Show Page Title on this page
$context['is_market_page'] = true;
// ::DATA:: Get Social Share
include('pid-partials/inc/social-share.php'); //:: Create Social Share Buttons
$context['social_share'] = $social_share_context;

// Get Chart Explanation Section
$context['section_content'] = $section_content;

// Get Market Charts
$market = array(
  'show_map' => true,
  'location' => $env::$location,
  'post_type' => 'market',
  'is_pid_post' => false,
  'is_a_single_post' => false,
  'report_level' => $env->community_level
);
$context['market_section_h1'] = $env->market_section_h1;
get_template_part('pid-partials/content', 'market-stats', json_encode($market));

// Get HPI table title
//SELECT wp_pid_counter() `No`,
// wp_pid_cur_month_hpi_pivotal.`neighborhood_id`,
//        wp_pid_cur_month_hpi_pivotal.`city/district english` `City/District`,
//        wp_pid_cur_month_hpi_pivotal.`slug`,
//        wp_pid_cur_month_hpi_pivotal.`city_district_name_cn` `city_name_cn`,
//        wp_pid_cur_month_hpi_pivotal.`All`,
//        wp_pid_cur_month_hpi_pivotal.`Detached`,
//        wp_pid_cur_month_hpi_pivotal.`Townhouse`,
//        wp_pid_cur_month_hpi_pivotal.`Apartment`
// FROM wp_pid_cur_month_hpi_pivotal
// WHERE FIND_IN_SET(neighborhood_id, '%VAR1%') AND data_type = 'HPI'
// HPI Table 29 | 45
$nbhCodesAndNames = Metabox::get_nbhCodes_and_nbhNames($env::$location, 2);
$nbhCodes = $nbhCodesAndNames[0];
$nbhNames = $nbhCodesAndNames[1];
$context['HPI_table_title'] = $HPI_table_title;
$context['community_level'] = $env->community_level;
$context['nbh_codes'] = $nbhCodes;

// Get RPS Listing sectionTitle
// if $term->name (the city's WP_Term) has two words, get the Timber Post
$context['rps_listings']['create_listings_by_post_content'] = false;
$context['rps_listings']['rps_section_h1'] = $lang_set['active_listings_label'];
$context['rps_listings']['community_level'] = $env->community_level;
// process special community names
switch ($env->location_term->name) {
  case 'South Surrey':
    $rps_location = 'South Surrey White Rock';
    break;
  default:
    $rps_location = $env->location_term->name;
    break;
}
$context['rps_listings']['rps_location'] = $rps_location;

// ::DATA::Get more Community Market Charts
include('pid-partials/inc/related-communities.php');
$context['related_communities']['more_community_charts_h1'] = $section_more_charts;
$context['related_communities']['nbh_terms'] = $_nbh_terms;

unset($_nbh_terms);
unset($_nbh_term);

Timber::render('partials-twig/archive-market.twig', $context);

echo $remote_ip;
