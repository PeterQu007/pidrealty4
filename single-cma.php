<?php

/**
 * @package PIDHomes::CMA report post template
 *
 * @package realhomes-child::PID theme
 * @subpackage modern
 * @link https://docs.phpdoc.org/latest/references/phpdoc/index.html
 * 
 */

function loop_multi($result)
{
  //use the global variable $conn in this function
  global $conn;
  //an array to store results and return at the end
  $returned = array("result" => array(), "error" => array());
  //if first query doesn't return errors
  if ($result) {
    //store results of first query in the $returned array
    $returned["result"][0] = mysqli_store_result($conn);
    //set a variable to loop and assign following results to the $returned array properly
    $count = 0;
    // start doing and keep trying until the while condition below is not met
    do {
      //increase the loop count by one
      $count++;
      //go to the next result
      mysqli_next_result($conn);
      //get mysqli stored result for this query
      $result = mysqli_store_result($conn);
      //if this query in the loop doesn't return errors
      if ($result) {
        //store results of this query in the $returned array
        $returned["result"][$count] = $result;
        //if this query in the loop returns errors
      } else {
        //store errors of this query in the $returned array
        $returned["error"][$count] = mysqli_error($conn);
      }
    }
    // stop if this is false
    while (mysqli_more_results($conn));
  } else {
    //if first query returns errors
    $returned["error"][0] = mysqli_error($conn);
  }
  //return the $returned array
  return $returned;
}

use PIDHomes\{PIDEnv, PIDTerms};
use Timber\Timber;

$context = [];

global $language;
$post_lang = get_query_var('lang'); // cn: simplified chinese; tw: traditional chinese
$cma_post_id = get_the_ID(); // cma post id
if (!$post_lang) {
  $post_lang = $language;
}
if ($post_lang == 'cn') {
  $x = current_theme_supports('title-tag');
  if ($x) {
    add_filter('pre_get_document_title', 'pid_change_page_title');
    function pid_change_page_title($title)
    {
      $chinese_title = get_field('chinese_title');
      $title = $chinese_title ? $chinese_title : $title;
      return wp_strip_all_tags($title);
    }
  }
  add_filter('the_title', 'pid_change_post_title', 10, 2);
  function pid_change_post_title($title, $id)
  {
    if (get_post_type($id) == "post") {
      $chinese_title = get_field('chinese_title');
      $title = $chinese_title ? $chinese_title : $title;
    }
    return  $title;
  }
}

$cmaPostID = get_the_ID(); // get the market post ID
$cmaExcerpt = get_the_excerpt(); // get the post excerpt, which keep the cma type: cma or vpr

$terms = get_terms(array(
  'taxonomy' => 'property-city',
  // 'parent' => 0, //get top level taxo:: City
  'object_ids' => $cmaPostID
));
if ($terms) {
  $market = $terms[0]->slug;
  $market_name = $terms[0]->name;
  $env = new PIDEnv($market);
  // $env->set_location($market);
} else {
  $market = "";
  $market_name = "";
};

if ($post_lang == 'cn') {
  $city_cn_field = get_field('chinese_city_name', $cma_post_id);
  $city_name = $city_cn_field ? $city_cn_field[0] : ucfirst($market_name);
} else {
  $city_name  = ucfirst($market_name);
}

$getTheFirstImage = "";
if (have_posts()) {
  while (have_posts()) {
    the_post();
    $getTheFirstImage = getTheFirstImage();
  }
}


// Get cma Post ACF cmd_ID
$cma_ID = get_post_meta($cmaPostID, 'cma_id', true);
$history_cma_ID = get_post_meta($cmaPostID, 'history_cma_id', true);
$history_year = get_post_meta($cmaPostID, 'history_year', true);
$dwelling_type = get_post_meta($cmaPostID, 'dwelling_type', true);
$listing_status = get_post_meta($cmaPostID, 'status', true);
if (!$listing_status) {
  $listing_status = array('Active', 'Sold');
}
$subject_property = get_post_meta($cmaPostID, 'subject_property', true);
$soldLink =  get_post_meta($cmaPostID, 'sold_links', true);

// Make sure $cma_ID has cma records in wp_pid_cma
require_once('pid-wp-db-config.php');
$conn = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//
$strSql = "SELECT Subject_Address, Unit_No, City, Neighborhood, Subject_Property_Type, Land_Size, Floor_Area, BC_Assess_Land, BC_Assess_Improve, BC_Assess_Total, BC_Assess_Change, List_Price, Sold_Price FROM wp_pid_cma_subjects WHERE CMA_ACTION = 1 AND ID = $cma_ID;";
$strSql .= " SELECT COUNT(*) FROM wp_pid_cma WHERE cma_ID=$cma_ID;";
$strSql .= " SELECT `No`, `Item`, `Value`, tr.Chinese_Name FROM wp_pid_cma_criteria cr right join wp_pid_cma_criteria_translation tr
              ON cr.Item = tr.name WHERE cma_ID=$cma_ID Order By `No`;";

$res = mysqli_multi_query($conn, $strSql);
$outputs = loop_multi($res);

$res = $outputs['result'][0];
if ($res) {
  while ($row = $res->fetch_assoc()) {
    $Subject_Address = $row['Subject_Address'];
    $Unit_No = $row['Unit_No'];
    $Land_Size = $row['Land_Size'];
    $Floor_Area = $row['Floor_Area'];
    $Land_Assess = $row['BC_Assess_Land'];
    $Improve_Assess = $row['BC_Assess_Improve'];
    $Total_Assess = $row['BC_Assess_Total'];
    $City = $row['City'];
    $Neighborhood = $row['Neighborhood'];
    $BCA_Change = $row['BC_Assess_Change'];
    $List_Price = $row['List_Price'];
    $Sold_Price = $row['Sold_Price'];
  }
}

$res = $outputs['result'][1];
if ($res) {
  $do_wpdatatable_shortcode = true;
} else {
  $do_wpdatatable_shortcode = false;
}

// get cma criteria
$res = $outputs['result'][2];
$criteria_rules = [];
$criteria_rule = [];
if ($res) {
  $item_no = 1;
  while ($row = $res->fetch_assoc()) {
    $item = $language == 'cn' ? $row['Chinese_Name'] : $row['Item'];
    $value = $row['Value'];
    $criteria_no = $item_no++;
    $criteria_rule = array(
      'criteria_no' => $criteria_no,
      'item' => $item,
      'value' => $value
    );
    $criteria_rules[] = $criteria_rule;
  }
}

// Clear DB Connection
$thread = $conn->thread_id;
$conn->kill($thread);
$conn->close();
unset($conn); //sometimes, mysqli gives lots of warnings

set_query_var('market', $market);
require_once(get_stylesheet_directory() . '/inc/neighborhood-metabox.php');
//************ */

get_header();

// Render Theme Page Head.
set_query_var('community_label', ucfirst($city_name));
get_template_part('assets/modern/partials/banner/market');

// Banner Image or Map
$context['banner_image'] = $getTheFirstImage;

// DATA:: CMA Title
$context['subject_property'] = $subject_property;
$context['cma_title'] = __('Subject Property: ', 'pidhomes');
$context['unit_no'] = $dwelling_type == 'Detached' ? '' : str_replace('##', '#', '#' . $Unit_No);
$context['subject_address'] = $Subject_Address;
$context['neighborhood'] = str_replace($City, '', $Neighborhood);
$context['city'] = $City;
$context['dwelling_type'] = $dwelling_type;
$context['cma_id_label'] = $cmaExcerpt == 'CMA' ? __('CMA NO', 'pidhomes') : __('VRP NO', 'pidhomes');
$context['cma_report_type'] = $cmaExcerpt; // CMA or VPR

$context['cma_id'] = $cma_ID;
switch ($cmaExcerpt) {
  case 'CMA':
    $context['bca_change_label'] = __('BCA Change% Range', 'pidhomes');
    $context['list_price_label'] = __('List Price Range', 'pidhomes');
    break;
  case 'VPR':
    $context['bca_change_label'] = __('BCA Change%', 'pidhomes');
    $context['list_price_label'] = __('List Price', 'pidhomes');
    $context['sold_price_label'] = __('Sold Price', 'pidhomes');
    break;
}

$context['bca_change'] = strval($BCA_Change * 100) . '%';
$context['list_price'] = '$' . number_format($List_Price, 0, '.', ',');
$context['sold_price'] = empty($Sold_Price) ? "?" : '$' . number_format($Sold_Price, 0, '.', ',');
$context['list_price_range_1'] = '$' . number_format($List_Price, 0, '.', ',');
$context['list_price_range_2'] = empty($Sold_Price) ? "?" : '$' . number_format($Sold_Price, 0, '.', ',');
$context['bca_change_value'] = $BCA_Change;
$context['list_price_value'] = $List_Price;
$context['sold_price_value'] = empty($Sold_Price) ? $List_Price : $Sold_Price;

// DATA:: Subject Basic Infomation
$context['subject_table_header_cell_1'] = __('BCA', 'pidhomes');
$context['subject_table_header_cell_2'] = __('Size', 'pidhomes');
$context['subject_table_header_cell_3'] = __('Value', 'pidhomes');

$context['subject_table_how1_cell_1'] = __('Improve', 'pidhomes');
$context['subject_table_how1_cell_2'] = number_format($Floor_Area, 0);
$context['subject_table_how1_cell_3'] = "$" . number_format($Improve_Assess, 0);

$context['subject_table_how2_cell_1'] = __('Land', 'pidhomes');
$context['subject_table_how2_cell_2'] = $Land_Size == 0 ? "-" : number_format($Land_Size, 0);
$context['subject_table_how2_cell_3'] = "$" . number_format($Land_Assess, 0);

$context['subject_table_how3_cell_1'] = __('Total', 'pidhomes');
$context['subject_table_how3_cell_2'] = '';
$context['subject_table_how3_cell_3'] = "$" . number_format($Total_Assess, 0);

// DATA:: CMA Criteria Rules Table
$context['cma_criteria_table_heading'] = __('CMA Comparables Criteria', 'pidhomes');
$context['cma_criteria_rules'] = $criteria_rules;
$context['cma_criteria_table_header_cell_1'] = __('Criteria No', 'pidhomes');
$context['cma_criteria_table_header_cell_2'] = __('Criteria Name', 'pidhomes');
$context['cma_criteria_table_header_cell_3'] = __('Criteria Value', 'pidhomes');

// DATA:: Active Listings Price Summary
$context['active_table_heading'] = __('Active Listings Price Analysis', 'pidhomes');

if ($dwelling_type != 'Detached') {
  $context['active_table_header_cell_1'] = __('Metric Name', 'pidhomes');
  $context['active_table_header_cell_2'] = __('Low End', 'pidhomes');
  $context['active_table_header_cell_3'] = __('Average', 'pidhomes');
  $context['active_table_header_cell_4'] = __('High End', 'pidhomes');

  $context['active_table_row1_cell_1'] = __('Market Price (PSF)', 'pidhomes');
  $context['active_table_row1_cell_2_id'] = "pid_cma_active_price_per_square_feet_min";
  $context['active_table_row1_cell_3_id'] = "pid_cma_active_price_per_square_feet_avg";
  $context['active_table_row1_cell_4_id'] = "pid_cma_active_price_per_square_feet_max";

  $context['active_table_row2_cell_1'] = __('Market Price (Total)', 'pidhomes');
  $context['active_table_row2_cell_2_id'] = "pid_cma_active_price_min";
  $context['active_table_row2_cell_3_id'] = "pid_cma_active_price_avg";
  $context['active_table_row2_cell_4_id'] = "pid_cma_active_price_max";

  $context['active_table_row3_cell_1'] = __('BCA Change (%)', 'pidhomes');
} else {
  $context['active_table_header_cell_1'] = __('Metric Name', 'pidhomes');
  $context['active_table_header_cell_2'] = __('Low End', 'pidhomes');
  $context['active_table_header_cell_3'] = __('Average', 'pidhomes');
  $context['active_table_header_cell_4'] = __('High End', 'pidhomes');

  $context['active_table_row1_cell_1'] = __('Land Market Price (PSF)', 'pidhomes');
  $context['active_table_row1_cell_2_id'] = "pid_cma_active_land_price_per_square_feet_min";
  $context['active_table_row1_cell_3_id'] = "pid_cma_active_land_price_per_square_feet_avg";
  $context['active_table_row1_cell_4_id'] = "pid_cma_active_land_price_per_square_feet_max";

  $context['active_table_row2_cell_1'] = __('Improv. Market Price (PSF)', 'pidhomes');
  $context['active_table_row2_cell_2_id'] = "pid_cma_active_improve_price_per_square_feet_min";
  $context['active_table_row2_cell_3_id'] = "pid_cma_active_improve_price_per_square_feet_avg";
  $context['active_table_row2_cell_4_id'] = "pid_cma_active_improve_price_per_square_feet_max";

  $context['active_table_row3_cell_1'] = __('BCA Change (%)', 'pidhomes');
}

// DATA:: Active Listing Evaluation
$context['active_eval_table_header_cell_1'] = __('Eval Type', 'pidhomes');
$context['active_eval_table_header_cell_2'] = __('Low End', 'pidhomes');
$context['active_eval_table_header_cell_3'] = __('Average', 'pidhomes');
$context['active_eval_table_header_cell_4'] = __('High End', 'pidhomes');

$context['active_eval_table_row1_cell_1'] = __('Market Value Range 1', 'pidhomes');
$context['active_eval_table_row1_cell_2_id'] = "pid_market_active_value_min";
$context['active_eval_table_row1_cell_3_id'] = "pid_market_active_value_avg";
$context['active_eval_table_row1_cell_4_id'] = "pid_market_active_value_max";

$context['active_eval_table_row2_cell_1'] = __('Market Value Range 2', 'pidhomes');
$context['active_eval_table_row2_cell_2_id'] = "pid_market_active_value_min_2";
$context['active_eval_table_row2_cell_3_id'] = "pid_market_active_value_avg_2";
$context['active_eval_table_row2_cell_4_id'] = "pid_market_active_value_max_2";

// DATA:: Evaluation Buttons
$context['active_eval_button_1'] = __('Evaluation 1', 'pidhomes');
$context['active_eval_button_2'] = __('Evaluation 2', 'pidhomes');
$context['active_eval_button_3'] = __('Start Over', 'pidhomes');

// DATA:: Sold Listings Price Summary
$context['sold_table_heading'] = __('Sold Listings Price Analysis', 'pidhomes');

if ($dwelling_type != 'Detached') {
  $context['sold_table_header_cell_1'] = __('Metric Name', 'pidhomes');
  $context['sold_table_header_cell_2'] = __('Low End', 'pidhomes');
  $context['sold_table_header_cell_3'] = __('Average', 'pidhomes');
  $context['sold_table_header_cell_4'] = __('High End', 'pidhomes');

  $context['sold_table_row1_cell_1'] = __('Market Price (PSF)', 'pidhomes');
  $context['sold_table_row1_cell_2_id'] = "pid_cma_sold_price_per_square_feet_min";
  $context['sold_table_row1_cell_3_id'] = "pid_cma_sold_price_per_square_feet_avg";
  $context['sold_table_row1_cell_4_id'] = "pid_cma_sold_price_per_square_feet_max";

  $context['sold_table_row2_cell_1'] = __('Market Price (Total)', 'pidhomes');
  $context['sold_table_row2_cell_2_id'] = "pid_cma_sold_price_min";
  $context['sold_table_row2_cell_3_id'] = "pid_cma_sold_price_avg";
  $context['sold_table_row2_cell_4_id'] = "pid_cma_sold_price_max";

  $context['sold_table_row3_cell_1'] = __('BCA Change (%)', 'pidhomes');
} else {
  $context['sold_table_header_cell_1'] = __('Metric Name', 'pidhomes');
  $context['sold_table_header_cell_2'] = __('Low End', 'pidhomes');
  $context['sold_table_header_cell_3'] = __('Average', 'pidhomes');
  $context['sold_table_header_cell_4'] = __('High End', 'pidhomes');

  $context['sold_table_row1_cell_1'] = __('Land Market Price (PSF)', 'pidhomes');
  $context['sold_table_row1_cell_2_id'] = "pid_cma_sold_land_price_per_square_feet_min";
  $context['sold_table_row1_cell_3_id'] = "pid_cma_sold_land_price_per_square_feet_avg";
  $context['sold_table_row1_cell_4_id'] = "pid_cma_sold_land_price_per_square_feet_max";

  $context['sold_table_row2_cell_1'] = __('Improv. Market Price (PSF)', 'pidhomes');
  $context['sold_table_row2_cell_2_id'] = "pid_cma_sold_improve_price_per_square_feet_min";
  $context['sold_table_row2_cell_3_id'] = "pid_cma_sold_improve_price_per_square_feet_avg";
  $context['sold_table_row2_cell_4_id'] = "pid_cma_sold_improve_price_per_square_feet_max";

  $context['sold_table_row3_cell_1'] = __('BCA Change (%)', 'pidhomes');
}

// DATA:: Sold Listing Evaluation
$context['sold_eval_table_header_cell_1'] = __('Eval Type', 'pidhomes');
$context['sold_eval_table_header_cell_2'] = __('Low End', 'pidhomes');
$context['sold_eval_table_header_cell_3'] = __('Average', 'pidhomes');
$context['sold_eval_table_header_cell_4'] = __('High End', 'pidhomes');

$context['sold_eval_table_row1_cell_1'] = __('Market Value Range 1', 'pidhomes');
$context['sold_eval_table_row1_cell_2_id'] = "pid_market_sold_value_min";
$context['sold_eval_table_row1_cell_3_id'] = "pid_market_sold_value_avg";
$context['sold_eval_table_row1_cell_4_id'] = "pid_market_sold_value_max";

$context['sold_eval_table_row2_cell_1'] = __('Market Value Range 2', 'pidhomes');
$context['sold_eval_table_row2_cell_2_id'] = "pid_market_sold_value_min_2";
$context['sold_eval_table_row2_cell_3_id'] = "pid_market_sold_value_avg_2";
$context['sold_eval_table_row2_cell_4_id'] = "pid_market_sold_value_max_2";

// DATA:: Evaluation Buttons
$context['sold_eval_button_1'] = __('Evaluation 1', 'pidhomes');
$context['sold_eval_button_2'] = __('Evaluation 2', 'pidhomes');
$context['sold_eval_button_3'] = __('Start Over', 'pidhomes');

/***
 *  Doing Active Listings by wpdatatable 34
 */
$context['cma_id'] = $cma_ID;
if (in_array('Active', $listing_status)) :
  $active_title = $post_lang == 'cn' ? '在售挂牌' : 'Active Listings';
  $context['active_title'] = $active_title;
  $context['do_active_wpdatatable_shortcode'] = true;

  switch ($dwelling_type) {
    case 'Detached':
      $context['active_listings_table_id'] = 35;
      break;
    default:
      $context['active_listings_table_id'] = 34;
      break;
  }
endif;

/***
 *  Doing Sold Listings by wpdatatable 34
 */
if (in_array('Sold', $listing_status)) :
  $sold_title = $post_lang == 'cn' ? '已售挂牌(点击查看详情)' : 'Sold Listings(click for detailed listings)';
  $sold_listing_links = $soldLink;
  $context['sold_title'] = $sold_title;
  $context['sold_listing_links'] = $sold_listing_links;
  $context['do_sold_wpdatatable_shortcode'] = true;

  switch ($dwelling_type) {
    case 'Detached':
      $context['sold_listings_table_id'] = 35;
      break;
    default:
      $context['sold_listings_table_id'] = 34;
      break;
  }
endif;
/***
 * Do History Listing
 */
if ($history_cma_ID && in_array('Sold', $listing_status)) :
  $history_sold_title = $post_lang == 'cn' ? "{$history_year}年历史已售挂牌(点击查看详情)" : "$history_year History Sold Listings(click for detailed listings)";
  $context['history_sold_title'] = $history_sold_title;
  $context['history_sold_links'] = $soldLink;
  $context['do_history_wpdatatable_shortcode'] = true;
  $context['history_cma_id'] = $history_cma_ID;
  // History SOLD LISTINGS
  switch ($dwelling_type) {
    case 'Detached':
      $context['history_table_id'] = 35;
      break;
    default:
      $context['history_table_id'] = 34;
      break;
  }
endif;

// Render market stats block
$currentYear = date("Y");
$years = $currentYear - 1;
$y = '';
for ($i = $years; $i <= $currentYear; $i++) {
  $y = $y . "," . $i;
}
$y = ltrim($y, ",");
set_query_var('y', $y);
$months = 1;
set_query_var('m', $months);
$property_type = strtolower($dwelling_type);
set_query_var('dwell', $property_type);
$chart_type = 'perc';
set_query_var('chart', $chart_type);
$translate_options = array(
  'location' => $env::$location,
  'property_type' => $property_type,
  'chart_type' => $chart_type,
  'years' => $years,
  'month' => $months,
  'translation_group' => 1 // 1 for market archive, 2 for chart selection
);
$lang_set = pid_translate($post_lang, $translate_options);
set_query_var('report-level', 2); // set report-level to 2;
set_query_var('property-city', $market);
// Get Market Charts
$cma_market = array(
  'show_map' => false,
  'location' => $market,
  'post_type' => 'market',
  'is_pid_post' => false,
  'is_a_single_post' => false,
  'report_level' => 3,
  'render_market' => false
);
$context['market_section_h1'] = sprintf(__("%s Market Chart", 'pidhomes'), $env->community_label);
get_template_part('pid-partials/content', 'market-stats', json_encode($cma_market));

// DATA:: HPI Price Table
$context['hpi_table_heading'] = sprintf(__('%s Real Estate Monthly House HPI', 'pidhomes'), ucfirst($env->community_label));

$context['hpi_market'] = $env->location_term->neighborhood_code;

// Render CMA Context
Timber::render('partials-twig/single-cma.twig', $context);

/************ */
get_template_part('assets/modern/partials/banner/peterqu');
get_footer();
var_dump($env->location_term->neighborhood_code);
var_dump($env->community_label);
