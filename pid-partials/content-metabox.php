<!--

  Generate Neighborhood 3 Level Metabox Title block
  e.g. Surrey | North Surrey | Fraser Heights
  Title block should contain correct links for every metabox
  -- links for school or community

-->

<?php
global $language, $_metabox;

use PIDHomes\{Metabox, PIDTerms};
use Timber\Term;

$pid_content = json_decode($args);

// Define Navigation Class Constants
if (!defined('ACTIVE')) {
    DEFINE('ACTIVE', 'metabox__blog-home-link-active');
}
if (!defined('NON_ACTIVE')) {
    DEFINE('NON_ACTIVE', 'metabox__blog-home-link');
}
// Get Arguments for the partial content block
$location = $pid_content->location;
$location_term = new Timber\Term($location, 'property-city');
$location_level = PIDTerms::get_community_level($location_term->term_id);
$post_type = $pid_content->post_type;
$is_pid_post = $pid_content->is_pid_post;

$communityID = get_the_ID();
$is_market = get_query_var('is_market', false);
switch ($post_type) {
    case 'community':
        $postType_plural = __('communities', 'pidhomes');
        $postType_uri = 'communities';
        break;
    case 'school':
        $postType_plural = __('schools', 'pidhomes');
        $postType_uri = 'schools';
        break;
    case 'market':
        $postType_plural = __('markets', 'pidhomes');
        $postType_uri = 'markets';
        break;
    case 'cma':
        $postType_plural = __('cma', 'pidhomes');
        $postType_uri = 'cma';
        break;
    default:
        $postType_plural = __('communities', 'pidhomes');
        $postType_uri = 'communities';
        break;
}

// Get the neighborhood_code
if (is_single($communityID)) {
    /** archive for city community */
    $metabox = Metabox::get_city_district_nbh_metabox($communityID);
} elseif ($location) {
    /** archive for city district */
    switch ($location_level) {
        case 0:
            $metabox = Metabox::get_gva_city_metabox();
            break;
        case 1:
            $metabox = Metabox::get_city_district_metabox($location);
            break;
        case 2:
            $metabox = Metabox::get_city_district_nbh_metabox_by($location);
            break;
        case 3:
        default:
            $metabox = Metabox::get_city_district_nbh_metabox_by($location);
            break;
    }
} else {
    //** archive for city */
    $metabox = Metabox::get_gva_city_metabox();
}
// for market section
if ($is_market) {
    $nbh_codes = get_query_var('nbh_codes');
    $nbh_names = get_query_var('nbh_names');
    $market_section_id = "marketSection";
} else {
    $nbh_codes = "";
    $nbh_names = "";
    $market_section_id = "";
}
set_query_var('is_market', false);
$nav_link = get_site_url() . '/' . $postType_uri . '/';
if (is_single()) {
    global $post;
    $post_slug = $post ? $post->post_name : 'Greater Vancouver';
} else {
    $post_slug = $location;
}
$active = $location ? false : true;
// top level city
$active_2 = $metabox[0]['Term_Slug'] == $post_slug;
$nav_link_2 = get_site_url() . '/' . $postType_uri . '/' . $metabox[0]['Term_Slug'];
// level 2 city district
$active_3 = array();
$navLink_3 = array();
for ($i = 1; $i < count($metabox); $i++) {
    $active_3[$i] = $metabox[$i]['Term_Slug'] == $post_slug;
    $metabox[$i]['district_class'] = $active_3[$i] ? ACTIVE : NON_ACTIVE;
    $nav_link_3[$i] = get_site_url() . '/' . $postType_uri . '/' . $metabox[$i]['Term_Slug'];
    $metabox[$i]['district_nav_link'] = $nav_link_3[$i];
}
set_query_var('post_type', '');

$_context['is_pid_post'] = $is_pid_post;
$_context['nbh_codes'] = $nbh_codes;
$_context['nbh_names'] = $nbh_names;
$_context['gva_label'] = __('GVA ', 'pidhomes') . ucfirst($postType_plural);
$_context['nav_link'] = $nav_link;
$_context['gva_class'] = $active ? ACTIVE : NON_ACTIVE;
$_context['city_class'] = $active_2 ? ACTIVE : NON_ACTIVE;
$_context['city_nav_link'] = $nav_link_2;
$_context['city_meta'] = $metabox[0]['Term_Label'];
array_shift($metabox);
$_context['metas'] = $metabox;

$_metabox = $_context;

set_query_var('is_pid_post', false);

// Timber::render('twig/content-metabox.twig', $context);
