<!--

  Generate Neighborhood 3 Level Metabox Title block
  e.g. Surrey | North Surrey | Fraser Heights
  Title block should contain correct links for every metabox
  -- links for school or community
  
-->

<?php

global $_metabox, $env;

use PIDHomes\{Metabox, PIDTerms};

$context = [];

// Define Navigation Class Constants
if (!defined('ACTIVE')) {
  DEFINE('ACTIVE', 'metabox__blog-home-link-active');
}
if (!defined('NON_ACTIVE')) {
  DEFINE('NON_ACTIVE', 'metabox__blog-home-link');
}
// Get Arguments for the partial content block
$location = $env->location_term->slug;
$locationID = get_the_ID();
$is_market = get_query_var('is_market', false);
$is_x_post = get_query_var('is_x_post', false);
$postType = $is_x_post ? get_post_type() : get_query_var('post_type');
$chartCanvasID = get_query_var('chartCanvasID');
$postType_plural = get_post_type_plural($postType);
$marketReportLevel = 1; //default report level
if ($is_market) {
  $marketReportLevel = get_query_var('report-level');
  switch ($marketReportLevel) {
    case 0:
      $metabox = Metabox::get_gva_city_metabox();
      $gva = PIDTerms::get_PIDTerm_by('slug', 'gva');
      $chartCanvasID = "line_chart_1";
      break;
    case 1:
    case 2:
      $metabox = Metabox::get_city_district_metabox($location);
      $chartCanvasID = "line_chart_2";
      break;
    case 3:
      $metabox = Metabox::get_city_district_nbh_metabox_by($location);
      $chartCanvasID = "line_chart_3";
      break;
    default:
      $metabox = Metabox::get_gva_city_metabox();
      $gva = PIDTerms::get_PIDTerm_by('slug', 'gva');
      $chartCanvasID = "line_chart_1";
      break;
  }
  $context['pid_market_chart_canvas_id'] = "pid_market_{$chartCanvasID}";
  $context['market_report_level'] = $marketReportLevel;
  $context['pid_market_form_location'] = "pidMarketForm_location_$chartCanvasID";
  $nbh_codes = get_query_var('nbh_codes');
  $nbh_names = get_query_var('nbh_names');
  set_query_var('is_market', false);
}
?>


<?php
//output the first level location button
if ($marketReportLevel == 0) {
  $activeClass =  ACTIVE;
  $input_ID = 'pid_nbh_' . $chartCanvasID . '_' . 'GVA';
  $input_name = 'nbh_group_location_' . $chartCanvasID;
  $input_label = $gva->label;
  $nbhCodes = $nbh_codes;
  $nbhNames = $nbh_names;
  $context['active_class'] = $activeClass;
  $context['input_id'] = $input_ID;
  $context['input_name'] = $input_name;
  $context['input_label'] = $input_label;
  $context['nbh_codes'] = $nbh_codes;
  $context['nbh_names'] = $nbh_names;
  $context['input_slug'] = $gva->slug;
}

$_context = [];
for ($i = 0; $i < count($metabox); $i++) {
  $active = $metabox[$i]['Term_Slug'] == $location;
  $activeClass = $marketReportLevel != 0 ? ($active ? ACTIVE : NON_ACTIVE) : NON_ACTIVE;
  $input_ID = 'pid_nbh_' . $chartCanvasID . '_' . $metabox[$i]['Term_Slug'];
  $input_name = 'nbh_group_location_' . $chartCanvasID;
  $input_label = $metabox[$i]['Term_Label'];
  $input_slug = $metabox[$i]['Term_Name']; // Best Practice should be the neighborhood code
  // get the term's children nbhCodes and nbhNames
  if ($i == 0 && $marketReportLevel != 0) {
    $nbhCodes = $nbh_codes;
    $nbhNames = $nbh_names;
  } else {
    $nbhCodesAndNames = Metabox::get_nbhCodes_and_nbhNames($metabox[$i]['Term_Slug'], 2);
    if (!$nbhCodesAndNames) {
      continue;
    }
    $nbhCodes = $nbhCodesAndNames[0];
    $nbhNames = $nbhCodesAndNames[1];
  }
  if ($active) {
    set_query_var('nbh_filter_for_table_sub_market', $nbhCodes);
  }
  $_context['active_class'] = $activeClass;
  $_context['input_id'] = $input_ID;
  $_context['input_name'] = $input_name;
  $_context['input_label'] = $input_label;
  $_context['nbh_codes'] = $nbhCodes;
  $_context['nbh_names'] = $nbhNames;
  $_context['input_slug'] = $input_slug;
  $context['metaboxes'][$metabox[$i]['Term_Slug']] = $_context;
}

$context['pid_submarket_form_name'] = "pid_sub_MarketForm_location_$chartCanvasID";
$context['pid_submarket_fieldset_id'] = "pid_sub_markets_fieldset_$chartCanvasID";
$context['pid_form_footer_button'] = "form_footer_button_$chartCanvasID";
$context['pid_filter_submarket_label'] = "filter_subMarket_$chartCanvasID";
$context['pid_filter_submarket_input'] = "filter_subMarket_$chartCanvasID";

$_metabox = $context;
unset($context);

// Timber::render('partials-twig/components/metabox-ajax.twig', $context);
