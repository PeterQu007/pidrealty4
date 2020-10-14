<?php

/*
  MODULE OF FUNCTION.PHP
  ======================
  @neighborhoodID
  return metabox for section banner menu
*/

function nbh_3level_metabox($neighborhoodID)
{

  $metabox = [];

  $terms = get_the_terms($neighborhoodID, 'property-city');

  foreach ($terms as $term) {

    //Get Level 3 Term
    if (!get_term_children($term->term_id, 'property-city')) {
      $level3TermID = $term->term_id;
      $level3TermName = $term->name;
      $level3TermSlug = $term->slug;
      continue;
    }

    //Get Level 1 Term
    if ($term->parent && get_term_children($term->term_id, 'property-city')) {
      $level2TermID = $term->term_id;
      $level2TermName = $term->name;
      $level2TermSlug = $term->slug;
      continue;
    }

    //Get Top Level Term
    if (!$term->parent) {
      $topTermID = $term->term_id;
      $topTermName = $term->name;
      $topTermSlug = $term->slug;
    }
  }

  array_push($metabox, array(
    '0' => $topTermID,
    '1' => $topTermName,
    '2' => $topTermSlug,
    '3' => get_term_meta($topTermID, 'neighborhood_code', true),
    'Term_ID' => $topTermID,
    'Term_Name' => $topTermName,
    'Term_Slug' => $topTermSlug,
    'Term_Code' => get_term_meta($topTermID, 'neighborhood_code', true),
    'show_metabox' => true,
    'get_chartdata' => true
  ));

  array_push($metabox, array(
    '0' => $level2TermID,
    '1' => $level2TermName,
    '2' => $level2TermSlug,
    '3' => get_term_meta($level2TermID, 'neighborhood_code', true),
    'Term_ID' => $level2TermID,
    'Term_Name' => $level2TermName,
    'Term_Slug' => $level2TermSlug,
    'Term_Code' => get_term_meta($level2TermID, 'neighborhood_code', true),
    'show_metabox' => true,
    'get_chartdata' => true
  ));
  array_push($metabox, array(
    '0' => $level3TermID,
    '1' => $level3TermName,
    '2' => $level3TermSlug,
    '3' => get_term_meta($level3TermID, 'neighborhood_code', true),
    'Term_ID' => $level3TermID,
    'Term_Name' => $level3TermName,
    'Term_Slug' => $level3TermSlug,
    'Term_Code' => get_term_meta($level3TermID, 'neighborhood_code', true),
    'show_metabox' => true,
    'get_chartdata' => true
  ));

  return $metabox;
}

function nbh_3level_metabox_by_slug($location)
{

  $metabox = [];
  $terms = [];

  $child_terms = get_term_by('slug', $location, 'property-city');
  array_push($terms, $child_terms);

  // get parent term

  $parent_term = get_term($child_terms->parent, 'property-city');
  array_push($terms, $parent_term);
  // get grand parent term

  $grant_parent_term = get_term($parent_term->parent, 'property-city');
  array_push($terms, $grant_parent_term);

  //get parent location

  foreach ($terms as $term) {

    //Get Level 3 Term
    if (!get_term_children($term->term_id, 'property-city')) {
      $level3TermID = $term->term_id;
      $level3TermName = $term->name;
      $level3TermSlug = $term->slug;
      continue;
    }

    //Get Level 1 Term
    if ($term->parent && get_term_children($term->term_id, 'property-city')) {
      $level2TermID = $term->term_id;
      $level2TermName = $term->name;
      $level2TermSlug = $term->slug;
      continue;
    }

    //Get Top Level Term
    if (!$term->parent) {
      $topTermID = $term->term_id;
      $topTermName = $term->name;
      $topTermSlug = $term->slug;
    }
  }

  array_push($metabox, array(
    '0' => $topTermID,
    '1' => $topTermName,
    '2' => $topTermSlug,
    '3' => get_term_meta($topTermID, 'neighborhood_code', true),
    'Term_ID' => $topTermID,
    'Term_Name' => $topTermName,
    'Term_Slug' => $topTermSlug,
    'Term_Code' => get_term_meta($topTermID, 'neighborhood_code', true),
    'show_metabox' => true,
    'get_chartdata' => true
  ));

  array_push($metabox, array(
    '0' => $level2TermID,
    '1' => $level2TermName,
    '2' => $level2TermSlug,
    '3' => get_term_meta($level2TermID, 'neighborhood_code', true),
    'Term_ID' => $level2TermID,
    'Term_Name' => $level2TermName,
    'Term_Slug' => $level2TermSlug,
    'Term_Code' => get_term_meta($level2TermID, 'neighborhood_code', true),
    'show_metabox' => true,
    'get_chartdata' => true
  ));
  array_push($metabox, array(
    '0' => $level3TermID,
    '1' => $level3TermName,
    '2' => $level3TermSlug,
    '3' => get_term_meta($level3TermID, 'neighborhood_code', true),
    'Term_ID' => $level3TermID,
    'Term_Name' => $level3TermName,
    'Term_Slug' => $level3TermSlug,
    'Term_Code' => get_term_meta($level3TermID, 'neighborhood_code', true),
    'show_metabox' => true,
    'get_chartdata' => true
  ));

  return $metabox;
}

function nbh_Direct_2Level_metabox_by_Slug($communityTermSlug)
{

  global $language;
  $metabox = [];

  // if($communityTermSlug){
  // $level1Term = get_term_by('slug', $communityTermSlug, 'property-city');
  $level1Term = pid_get_term_by_i18n('slug', $communityTermSlug); // see functions.php
  $level1Terms = [];

  // Loop for top community term
  if ($level1Term->parent) {
    // Set for City District, e.g. :: North Surrey
    // $topLevelTerm = get_term_by('id', $level1Term->parent, 'property-city');
    $topLevelTerm = pid_get_term_by_i18n('id', $level1Term->parent);
    $level1Terms = pid_get_terms_i18n(array(
      'taxonomy' => 'property-city',
      'parent' => $topLevelTerm->term_id, //get direct children
      'orderby' => 'slug', //district slug is named by [city]-#
      'order' => 'ASC', //'DESC',
      //'child_of' => $topTermID, //get all children
      'hide_empty' => false,
    ), $language);
  } else {
    // Set for City, e.g. :: Surrey
    $topLevelTerm = $level1Term;
    // Fetch second level (City District) terms
    $level1Terms = pid_get_terms_i18n(array(
      'taxonomy' => 'property-city',
      'parent' => isset($level1Term) ? $level1Term->term_id : null, //get direct children
      'orderby' => 'slug', //district slug is named by [city]-#
      'order' => 'ASC', //'DESC',
      //'child_of' => $topTermID, //get all children
      'hide_empty' => false,
    ), $language);
  }
  // Output the results with Normalized Var names
  // Top Level Normalized
  if (isset($topLevelTerm)) {
    array_push($metabox, array(
      '0' => $topLevelTerm->term_id,
      '1' => $topLevelTerm->name,
      '2' => $topLevelTerm->slug,
      '3' => get_term_meta($topLevelTerm->term_id, 'neighborhood_code', true),
      '4' => $topLevelTerm->i18n_title,
      'Term_ID' => $topLevelTerm->term_id,
      'Term_Name' => $topLevelTerm->name,
      'Term_Slug' => $topLevelTerm->slug,
      'Term_Code' => get_term_meta($topLevelTerm->term_id, 'neighborhood_code', true),
      'show_metabox' => true,
      'get_chartdata' => true,
      'i18n_Title' => $topLevelTerm->i18n_title
    ));
  }

  // Level 1 Terms Normalized
  for ($i = 0; $i < count($level1Terms); $i++) {
    array_push($metabox, array(
      '0' => $level1Terms[$i]->term_id,
      '1' => $level1Terms[$i]->name,
      '2' => $level1Terms[$i]->slug,
      '3' => get_term_meta($level1Terms[$i]->term_id, 'neighborhood_code', true),
      '4' => $level1Terms[$i]->i18n_title,
      'Term_ID' => $level1Terms[$i]->term_id,
      'Term_Name' => $level1Terms[$i]->name,
      'Term_Slug' => $level1Terms[$i]->slug,
      'Term_Code' => get_term_meta($level1Terms[$i]->term_id, 'neighborhood_code', true),
      'show_metabox' => true,
      'get_chartdata' =>  true, // $level1Terms[$i]->term_id == $level1Term->term_id ? true : false
      'i18n_Title' => $level1Terms[$i]->i18n_title,
    ));
  }

  return $metabox;
}

function nbh_parent_and_children_metabox_by_slug($location)
{

  $metabox = [];

  $topLevelTerm = get_term_by('slug', $location, 'property-city');
  $level1Terms = [];

  // Loop for top community term
  // Set for City District, e.g. :: North Surrey
  $level1Terms = get_terms(array(
    'taxonomy' => 'property-city',
    'parent' => $topLevelTerm->term_id, //get direct children
    'orderby' => 'slug', //district slug is named by [city]-#
    'order' => 'ASC', //'DESC',
    //'child_of' => $topTermID, //get all children
    'hide_empty' => false,
  ));

  // Output the results with Normalized Var names
  // Top Level Normalized
  if (isset($topLevelTerm)) {
    array_push($metabox, array(
      '0' => $topLevelTerm->term_id,
      '1' => $topLevelTerm->name,
      '2' => $topLevelTerm->slug,
      '3' => get_term_meta($topLevelTerm->term_id, 'neighborhood_code', true),
      'Term_ID' => $topLevelTerm->term_id,
      'Term_Name' => $topLevelTerm->name,
      'Term_Slug' => $topLevelTerm->slug,
      'Term_Code' => get_term_meta($topLevelTerm->term_id, 'neighborhood_code', true),
      'show_metabox' => true,
      'get_chartdata' => true
    ));
  }

  // Level 1 Terms Normalized
  for ($i = 0; $i < count($level1Terms); $i++) {
    array_push($metabox, array(
      '0' => $level1Terms[$i]->term_id,
      '1' => $level1Terms[$i]->name,
      '2' => $level1Terms[$i]->slug,
      '3' => get_term_meta($level1Terms[$i]->term_id, 'neighborhood_code', true),
      'Term_ID' => $level1Terms[$i]->term_id,
      'Term_Name' => $level1Terms[$i]->name,
      'Term_Slug' => $level1Terms[$i]->slug,
      'Term_Code' => get_term_meta($level1Terms[$i]->term_id, 'neighborhood_code', true),
      'show_metabox' => true,
      'get_chartdata' =>  true // $level1Terms[$i]->term_id == $level1Term->term_id ? true : false
    ));
  }

  // print_X($X, __LINE__, __FUNCTION__, $metabox);
  return $metabox;
}

function nbh_parent_and_all_children_metabox_by_slug($location)
{

  $metabox = [];

  $topLevelTerm = pid_get_term_by('slug', $location, 'property-city');
  $level1Terms = [];

  // Loop for top community term
  // Set for City District, e.g. :: North Surrey
  $level1Terms = get_terms(array(
    'taxonomy' => 'property-city',
    // 'parent' => $topLevelTerm->term_id, //get direct children
    'child_of' => $topLevelTerm->term_id, // get all children
    'orderby' => 'name', //district slug is named by [city]-#
    'order' => 'ASC', //'DESC',
    //'child_of' => $topTermID, //get all children
    'hide_empty' => false,
  ));
  foreach ($level1Terms as $level1Term) {
    $level1Term = pid_add_chinese_title($level1Term);
  }

  $level1TermsSorted = [];

  for ($i = 0; $i < count($level1Terms); $i++) {
    $level1TermsSorted[$level1Terms[$i]->name] = $level1Terms[$i];
  }

  ksort($level1TermsSorted);

  $level1Terms = [];

  $level1Terms = array_values($level1TermsSorted);

  $allChildrenTerms = get_term_children($topLevelTerm->term_id, 'property-city');

  // Output the results with Normalized Var names
  // Top Level Normalized
  if (isset($topLevelTerm)) {
    array_push($metabox, array(
      '0' => $topLevelTerm->term_id,
      '1' => $topLevelTerm->name,
      '2' => $topLevelTerm->slug,
      '3' => get_term_meta($topLevelTerm->term_id, 'neighborhood_code', true),
      '6' => $topLevelTerm->chinese_title,
      'Term_ID' => $topLevelTerm->term_id,
      'Term_Name' => $topLevelTerm->name,
      'Term_Slug' => $topLevelTerm->slug,
      'Term_Code' => get_term_meta($topLevelTerm->term_id, 'neighborhood_code', true),
      'show_metabox' => true,
      'get_chartdata' => true,
      'Chinese_Title' => $topLevelTerm->chinese_title,
    ));
  }

  // Level 1 Terms Normalized
  for ($i = 0; $i < count($level1Terms); $i++) {
    array_push($metabox, array(
      '0' => $level1Terms[$i]->term_id,
      '1' => $level1Terms[$i]->name,
      '2' => $level1Terms[$i]->slug,
      '3' => get_term_meta($level1Terms[$i]->term_id, 'neighborhood_code', true),
      '6' => $level1Terms[$i]->chinese_title,
      'Term_ID' => $level1Terms[$i]->term_id,
      'Term_Name' => $level1Terms[$i]->name,
      'Term_Slug' => $level1Terms[$i]->slug,
      'Term_Code' => get_term_meta($level1Terms[$i]->term_id, 'neighborhood_code', true),
      'show_metabox' => true,
      'get_chartdata' =>  true, // $level1Terms[$i]->term_id == $level1Term->term_id ? true : false
      'Chinese_Title' => $level1Terms[$i]->chinese_title,
    ));
  }

  return $metabox;
}


function nbh_TopLevel_metabox()
{

  // Get gva cities;

  $metabox = [];

  // Get gva term_id;
  // Change get_term_by() to pid_get_term_by()
  $gva = pid_get_term_by('slug', 'gva', 'property-city');

  // Fetch property-city top level terms
  $topLevelTerms = get_terms(array(
    'taxonomy' => 'property-city',
    'parent' => 0, //get direct children
    'exclude' => $gva->term_id, // exclude gva
    'orderby' => 'name', //district slug is named by [city]-#
    'order' => 'ASC', // ascedning: 'ASC', descending: 'DESC',
    'hide_empty' => false,
  ));
  // Push Chinese Title to the Terms array
  foreach ($topLevelTerms as $topLevelTerm) {
    $topLevelTerm = pid_add_chinese_title($topLevelTerm);
  }

  for ($i = 0; $i < count($topLevelTerms); $i++) {
    array_push($metabox, array(
      '0' => $topLevelTerms[$i]->term_id,
      '1' => $topLevelTerms[$i]->name,
      '2' => $topLevelTerms[$i]->slug,
      '3' => get_term_meta($topLevelTerms[$i]->term_id, 'neighborhood_code', true),
      'Term_ID' => $topLevelTerms[$i]->term_id,
      'Term_Name' => $topLevelTerms[$i]->name,
      'Term_Slug' => $topLevelTerms[$i]->slug,
      'Term_Code' => get_term_meta($topLevelTerms[$i]->term_id, 'neighborhood_code', true),
      'show_metabox' => true,
      'get_chartdata' => true,
      'Chinese_Title' => $topLevelTerms[$i]->chinese_title,
    ));
  }

  return $metabox;
}

if (!defined('NON_ACTIVE')) {
  DEFINE('NON_ACTIVE', 'metabox__blog-home-link');
}
if (!function_exists('get_nbhCodes_and_nbhNames')) {
  function get_nbhCodes_and_nbhNames($location, $marketReportLevel)
  {

    switch ($marketReportLevel) {
      case 1:
        $metabox = nbh_TopLevel_metabox();
        // $chartCanvasID = "line_chart_1";
        break;
      case 2:
        $metabox = nbh_parent_and_all_children_metabox_by_slug($location);
        // $chartCanvasID = "line_chart_2";
        break;
      case 3:
        $metabox = nbh_3level_metabox($location);
        // $chartCanvasID = "line_chart_3";
        break;
    }

    $neighborhood_code_string = '';
    $neighborhood_code_query_string = '';
    $neighborhood_codes = [];
    $neighborhood_names = [];
    foreach ($metabox as $meta) {
      if ($meta['get_chartdata']) {
        $neighborhood_code_string .= $meta['3'] . ",";
        $neighborhood_names[$meta['3']] = $meta['1'];
      }
    }
    $neighborhood_code_string = rtrim($neighborhood_code_string, ',');
    $neighborhood_codes = explode(',', $neighborhood_code_string);
    // Build neighborhood codes as mysql query IN operator's requirement:
    foreach ($neighborhood_codes as $code) {
      $neighborhood_code_query_string .= "'" . $code . "'" . ",";
    }
    $neighborhood_code_query_string = rtrim($neighborhood_code_query_string, ',');


    global $wpdb;

    $results = $wpdb->get_results("SELECT Neighborhood_Code, Neighborhood_Name
                                  FROM wp_pid_neighborhoods
                                  WHERE Neighborhood_Code IN (" . $neighborhood_code_query_string . ") ORDER BY Neighborhood_Name;
                                ");
    $nbh_names = null;
    foreach ($results as $nbh) {
      $nbh_code = trim($nbh->Neighborhood_Code);
      $nbh_names[@$nbh_code] = trim($nbh->Neighborhood_Name);
    }
    $neighborhood_name_string = json_encode(isset($nbh_names) ? $nbh_names : array());
    $nbhCodesAndNames = array();
    array_push($nbhCodesAndNames, $neighborhood_code_string);
    array_push($nbhCodesAndNames, $neighborhood_name_string);
    return $nbhCodesAndNames;
  }
}
