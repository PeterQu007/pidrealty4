<?php
/*-----------------------------------------------------------------------------------*/
/*	Enqueue Styles in Child Theme
/*-----------------------------------------------------------------------------------*/
require_once('pid-wp-db-config.php');

session_start();
if (!wp_doing_ajax()) {
	$_SESSION['url'] = $_SERVER['REQUEST_URI'];
}
$url = $_SESSION['url'];

function get_relative_url()
{
	$home_path = rtrim(parse_url(home_url(), PHP_URL_PATH), '/');
	$path = trim(substr(add_query_arg(array()), strlen($home_path)), '/');
	$qs = array_keys($_GET);
	if (!empty($qs)) {
		$path = remove_query_arg($qs, $path);
	}
	return $path;
}

function wpmdbc_exclude_plugins($plugins)
{
	if (!defined('DOING_AJAX') || !DOING_AJAX || !isset($_POST['action']) || false === strpos($_POST['action'], 'uploadimage')) return $plugins;
	define('WP_USE_THEMES', false);
	foreach ($plugins as $key => $plugin) {
		unset($plugins[$key]);
	}
	return $plugins;
}
add_filter('option_active_plugins', 'wpmdbc_exclude_plugins');

/************
 * NOTICE
 * AFTER CHANGE THE REWRITE RULE, WORDPRESS NEEDS RESET PERMALINK ON ADMIN PANEL
 */
//Add Rewrite Rules
add_action('init', 'PID_rewrite');
function PID_rewrite()
{
	// add_rewrite_rule('^schools/([^/]*)/page/([^/]*)/?', 'index.php?post_type=school&property-neighborhood=$matches[1]&page2=$matches[2]', 'top');
	// add_rewrite_rule('^schools/([^/]*)/?', 'index.php?post_type=school&property-neighborhood=$matches[1]', 'top');
	// add_rewrite_rule('^school/([^/]*)/?', 'index.php?post_type=school&name=$matches[1]', 'top');
	//Community
	add_rewrite_rule('^communities/([^/]*)/page/([^/]*)/?', 'index.php?post_type=community&property-city=$matches[1]&page1=$matches[2]', 'top');
	add_rewrite_rule('^communities/([^/]*)/?', 'index.php?&post_type=community&property-city=$matches[1]', 'top');
	add_rewrite_rule('^community/([^/]*)/?', 'index.php?post_type=community&name=$matches[1]', 'top');
	add_rewrite_rule('^communities/?', 'index.php?post_type=community', 'top');
	//Market
	// add_rewrite_rule('^markets/cn/([^/]*)/([^/]*)/([^/]*)/([^/]*)/([^/]*)/?', 'index.php?post_type=market&property-city=$matches[1]&dwell=$matches[2]&chart=$matches[3]&y=$matches[4]&mh=$matches[5]', 'top');
	// add_rewrite_rule('^markets/cn/([^/]*)/?', 'index.php?post_type=market&lang=cn&property-city=$matches[1]', 'top');
	// add_rewrite_rule('^markets/cn/?', 'index.php?post_type=market&lang=cn&property-city=gva', 'top');
	add_rewrite_rule('^markets/([^/]*)/([^/]*)/([^/]*)/([^/]*)/([^/]*)/?', 'index.php?post_type=market&property-city=$matches[1]&dwell=$matches[2]&chart=$matches[3]&y=$matches[4]&mh=$matches[5]', 'top');
	add_rewrite_rule('^markets/([^/]*)/([^/]*)/([^/]*)/([^/]*)/?', 'index.php?post_type=market&property-city=$matches[1]&dwell=$matches[2]&chart=$matches[3]&y=$matches[4]', 'top');
	add_rewrite_rule('^markets/([^/]*)/([^/]*)/([^/]*)/?', 'index.php?post_type=market&property-city=$matches[1]&dwell=$matches[2]&chart=$matches[3]', 'top');
	add_rewrite_rule('^markets/([^/]*)/([^/]*)/?', 'index.php?post_type=market&property-city=$matches[1]&dwell=$matches[2]', 'top');
	add_rewrite_rule('^markets/([^/]*)/?', 'index.php?post_type=market&property-city=$matches[1]', 'top');
	add_rewrite_rule('^markets/?', 'index.php?post_type=market&property-city=gva', 'top');

	//Database
	// add_rewrite_rule('^cn/([^/]*)/?', 'index.php?post_lang=chinese&name=$matches[1]', 'top');
	// add_rewrite_rule('^db/([^/]*)/?', get_theme_file_uri('/db/data.php'), 'top');
	//Listing
	// add_rewrite_rule('^listing/([^/]*)/?', 'index.php?post_type=rps_listing&name=$matches[1]', 'top');
}

add_action('init', 'pid_rewrite_add_endpoint');
if (!function_exists('pid_rewrite_add_endpoint')) {
	function pid_rewrite_add_endpoint()
	{
		add_rewrite_endpoint('cn', EP_ALL);
	}
}

add_filter('request', 'PID_rewrite_filter_request');
function PID_rewrite_filter_request($vars)
{
	if (isset($vars['cn'])) $vars['lang'] = 'cn';
	if (strstr($_SESSION['url'], '/cn/')) $vars['lang'] = 'cn';
	return $vars;
}


function getTheFirstImage()
{
	$files = get_children('post_parent=' . get_the_ID() . '&post_type=attachment&post_mime_type=image');
	if ($files) :
		$keys = array_reverse(array_keys($files));
		$j = 0;
		$num = $keys[$j];
		$image = wp_get_attachment_image($num, 'large', false);
		$imagepieces = explode('"', $image);
		$imagepath = $imagepieces[1];
		$thumb = wp_get_attachment_thumb_url($num);
	endif;
	return $image;
}

if (is_admin()) {
	// Only add google map api key for acf plug-in on admin pages
	// No need to load google map api js for admin pages
	if (!function_exists('pidHomesMapKey')) {
		function pidHomesMapKey($api)
		{
			$api['key'] = 'AIzaSyAczOjPVWMravPAIpPPegKgPtTFiipbgMM';
			return $api;
		}
		add_filter('acf/fields/google_map/api', 'pidHomesMapKey');
	}
} else {

	if (!function_exists('inspiry_enqueue_child_styles')) {
		//PIDHomes:: Add Google Map API Key to ACF fields
		function inspiry_enqueue_child_styles()
		{
			// dequeue and deregister parent default css
			wp_dequeue_style('parent-default');
			wp_deregister_style('parent-default');

			// dequeue parent custom css
			wp_dequeue_style('parent-custom');

			// parent default css
			wp_enqueue_style('parent-default', get_template_directory_uri() . '/style.css');

			// parent custom css
			wp_enqueue_style('parent-custom');

			// child default css
			wp_enqueue_style('child-default', get_stylesheet_uri(), array('parent-default'), '1.0', 'all');

			// child custom css
			// wp_enqueue_style('chart-css', get_stylesheet_directory_uri() . '/js/Chart.min.css', null, '1.4', 'all');
			wp_enqueue_style('child-custom', get_stylesheet_directory_uri() . '/css/child-custom.css', array('child-default'), '1.4', 'all');

			// chart bundle js (including moment.js bundled)
			wp_enqueue_script('chart-js', get_stylesheet_directory_uri() . '/js/Chart.bundle.min.js', null, '1.4', true);
			wp_enqueue_script('chart-js-plugin', get_stylesheet_directory_uri() . '/js/chartjs-plugin-crosshair.js', null, '1.4', true);
			// child custom js
			wp_enqueue_script('child-custom-js', get_stylesheet_directory_uri() . '/js/child-custom.js', array('jquery'), '1.4', true);
			// loadmore-js
			// wp_enqueue_script('loadmore-js', get_stylesheet_directory_uri() . '/js/loadmore.js', null, '1.4', true);
			// google map api js for regular wp pages
			//wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=AIzaSyAczOjPVWMravPAIpPPegKgPtTFiipbgMM', null, '1.0', true);

			//load php data for loadmore.js
			// loadmore-js
			if (!is_home()) {
				wp_localize_script('child-custom-js', 'pid_Data', array(
					'siteurl' => get_site_url(),
					'nonce' => wp_create_nonce('wp_rest'),
					'first_page' => get_pagenum_link(1)
				));
			}
		}
		add_action('wp_enqueue_scripts', 'inspiry_enqueue_child_styles', PHP_INT_MAX);
	}

	if (!function_exists('pid_googleMap')) {
		function pid_googleMap()
		{
			// google map api js for regular wp pages
			// for some reason, RealHomes load google map api for some pages, but not for single and property-city taxo.
			if (is_single() || !get_query_var('property-city')) {
				wp_enqueue_script('googleMap', '//maps.googleapis.com/maps/api/js?key=AIzaSyAczOjPVWMravPAIpPPegKgPtTFiipbgMM', null, '1.0', true);
			}
		}
		add_action('wp_enqueue_scripts', 'pid_googleMap', PHP_INT_MAX);
	}
}


if (!function_exists('inspiry_load_translation_from_child')) {
	/**
	 * Load translation files from child theme
	 */
	function inspiry_load_translation_from_child()
	{
		load_child_theme_textdomain('framework', get_stylesheet_directory() . '/languages');
	}

	add_action('after_setup_theme', 'inspiry_load_translation_from_child');
}

if (get_query_var('lang') == '') {
	add_filter('wpdatatables_filter_table_description', 'wpdt_my_hook', 10, 2);
	if (!function_exists('wpdt_my_hook')) {
		function wpdt_my_hook($object, $table_id)
		{

			$url = $_SESSION['url'];
			// var_dump($url);
			// var_dump($url_ref);
			if (strstr($url, "/cn/")) {
				if ($table_id == 40) {
					$object->dataTableParams->aLengthMenu = array(
						array(
							10, 25, 50, 75, 100
						),
						array(
							10, 25, 50, 75, 100
						)
					);
				}
			}
			return $object;
		}
	}
}


// add_filter('wpdatatables_filter_table_title', 'change_table_title', 10, 2);
// if (!function_exists('change_table_title')) {
// 	function change_table_title($tableTitle, $tabelID)
// 	{
// 		if ($tabelID == 40) {
// 			$tableTitle = "测试";
// 		}
// 		return $tableTitle;
// 	}
// }

// 'wpdatatables_filter_query_before_limit', $query, $this->getWpId())
// wddatatable:: if use server side processing, use hook before limit built:
// if not use server side processing, use hook wpdatatables_filter_mysql_query
// add_filter('wpdatatables_filter_query_before_limit', 'wpdt_translateTableQuery', 10, 2);
// if (!function_exists('wpdt_newQuery')) {
// 	function wpdt_translateTableQuery($query, $tableID)
// 	{
// 		$url = $_SESSION['url'];

// 		if (strstr($url, "/cn/")) {
// 			if ($tableID == 40) {
// 				//$query = "SELECT wp_pid_cities.`City_ID`, wp_pid_cities.`City_Name`, wp_pid_cities.`City_Chinese_Name` AS City_Full_Name FROM wp_pid_cities";
// 				$query = "SELECT wp_pid_counter() AS `Rank`, `City_Name_CN` AS `City_Name`, `Change%`, `Current HPI`, `January HPI`, `HPI Change`, `Neighborhood_ID` FROM wp_pid_van_city_HPI_change_pivotal";
// 			}
// 		}

// 		return $query;
// 	}
// }

add_filter('wpdatatables_filter_column_cssClassArray', 'wpdt_show_col_cn', 10, 2);
if (!function_exists('wpdt_show_col_cn')) {
	function wpdt_show_col_cn($classes, $columnTitle)
	{
		$colx = $columnTitle;
		$cx = $classes;
		if (get_query_var('lang') == "") {
			switch (strtolower($columnTitle)) {
				case 'city_name_cn':
					$cx = $classes . " " . "pid_wpdatatable_hidden_column";
					break;
			}
		}
		return $cx;
	}
}


// if (!function_exists('wpdt_translateTableQuery')) {
// 	function wpdt_translateTableQuery($tableMetadata, $tableId)
// 	{
// 		$url = $_SESSION['url'];

// 		if (strstr($url, "/cn/")) {
// 			if ($tableId == 40) {
// 				$tableMetadata->content = "SELECT wp_pid_counter() AS `Rank`, 城市名 AS `City_Name`, `Change%`, `Current HPI`, `January HPI`, `HPI Change`, `Neighborhood_ID` FROM wp_pid_van_city_HPI_change_pivotal";
// 			}
// 		}
// 		return $tableMetadata;
// 	}
// }
// add_filter('wpdatatables_filter_table_metadata', 'wpdt_newTableQuery', 10, 2);


//wpdatatables_filter_table_metadata( $tableMetadata, $tableId )
add_filter('wpdatatables_filter_columns_metadata', 'wpdt_newColHeader', 10, 2);
function wpdt_newColHeader($columnsMetadata, $tabelID)
{
	$url = $_SESSION['url'];

	if (strstr($url, "/cn/")) {
		foreach ($columnsMetadata as $columnMeta) {
			$display_header = '';
			switch (strtolower($columnMeta->display_header)) {
				case 'rank':
					$display_header = '排名';
					break;
				case 'city_name':
				case 'city name':
				case 'city':
					$display_header = '英文名';
					break;
				case 'city_name_cn':
					$display_header = '城市';
					break;
				case 'city_district_name_cn':
					$display_header = '城市/社区';
					break;
				case 'city/district':
					$display_header = '英文名';
					break;
				case 'city/district english':
					$display_header = '英文名';
					break;
				case 'neighborhood':
					$display_header = '社区';
					break;
				case 'change%':
					$display_header = '涨幅比例%';
					break;
				case 'month change%':
					$display_header = '当月涨幅比例%';
					break;
				case 'current hpi':
					$display_header = '当月房价指数';
					break;
				case 'last month hpi':
					$display_header = '上月房价指数';
					break;
				case 'month change$':
					$display_header = '当月涨幅金额$';
					break;
				case 'jan hpi':
				case 'january hpi':
					$display_header = '一月房价指数';
					break;
				case 'hpi change':
					$display_header = '涨幅金额$';
					break;
				case 'all hpi':
					$display_header = '综合基准房价';
					break;
				case 'detached hpi':
					$display_header = '独立屋基准房价';
					break;
				case 'townhouse hpi':
					$display_header = '城市屋基准房价';
					break;
				case 'apartment hpi':
					$display_header = '公寓基准房价';
					break;
				case 'no':
					$display_header = '序号';
					break;
				case 'address':
					$display_header = '地址';
					break;
				case 'unit no':
					$display_header = '单元号';
					break;
				case 'price':
					$display_header = '价格';
					break;
				case 'days on market':
					$display_header = '挂牌天数';
					break;
				case 'total floor area':
					$display_header = '居住面积';
					break;
				case 'strata fee':
					$display_header = '管理费';
					break;
				case 'land value':
					$display_header = '土地价值';
					break;
				case 'house value':
					$display_header = '物业价值';
					break;
				case 'bc assess':
					$display_header = '总政府估价';
					break;
				case 'plannum':
					$display_header = '小区号';
					break;
				case 'listdate':
					$display_header = '挂牌日期';
					break;
				case 'mls':
					$display_header = 'MLS号码';
					break;
				case 'year built':
					$display_header = '建造年份';
					break;
				case 'link':
					$display_header = ' ';
					break;
				case 'price per sqft':
					$display_header = '每尺价格';
					break;
				case 'change% to bca':
					$display_header = '相对政府估价涨跌幅%';
					break;
				case 'lot size':
					$display_header = '宅地面积';
					break;
				default:
					// only compare lowercase
					$display_header = $columnMeta->display_header;
					break;
			}
			$columnMeta->display_header = $display_header;
		}
	} else {
		foreach ($columnsMetadata as $columnMeta) {
			switch (strtolower($columnMeta->display_header)) {
				case 'city_name_cn':
				case 'city_district_name_cn':
					$columnMeta->width = 0;
					break;
			}
		}
	}
	return $columnsMetadata;
}

// add_action('wp_ajax_get_wdtable', 'wdtGetAjaxData');
// add_action('wp_ajax_nopriv_get_wdtable', 'wdtGetAjaxData');
/** =============== */
add_filter('query_vars', 'pid_query_vars_filter', 0, 1);
function pid_query_vars_filter($vars)
{
	$vars[] = 'page1';
	$vars[] = 'page2';
	$vars[] = 'lang';
	$vars[] = 'chart'; // perc, doll, ...
	$vars[] = 'loc'; // surrey, burnaby...
	$vars[] = 'dwell'; //for chart
	$vars[] = 'y'; // year for chart
	$vars[] = 'mh'; // start month, cannot use m, it's internal var
	return $vars;
}

add_action('wp_ajax_loadmore', 'pid_loadmore_ajax_handler'); // wp_ajax_{action}
add_action('wp_ajax_nopriv_loadmore', 'pid_loadmore_ajax_handler'); // wp_ajax_nopriv_{action}
function pid_loadmore_ajax_handler()
{
	// $X = set_debug(__FILE__);
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
			// print_X($X, __LINE__, '$iLoop::', $iLoop++);
			// look into your theme code how the posts are inserted, but you can use your own HTML of course
			// do you remember? - my example is adapted for Twenty Seventeen theme
			// get_template_part( 'pid-partials/content', get_post_format() );
			//get_template_part('pid-partials/content', 'x-post');
?>
			<div style="text-align: left" class="<?php echo $session_id ?>">
				<h3><a href="<?php echo str_replace(
												"/" . strtolower($post_type_labels->name) . "/",
												"/" . strtolower($post_type_labels->singular_name) . "/",
												strtolower(get_the_permalink())
											); ?>">
						<?php the_title(); ?></a>
				</h3>
				<div><?php the_excerpt(); ?> </div>
			</div>
<?php

		endwhile;

	endif;
	die; // here we exit the script and even no wp_reset_query() required!
}

/****************
 * CUSTOMIZE THE PAGINATOR
 */
function pid_paginator($query, $session_id)
{

	// $X = set_debug(__FILE__);

	// get parameters from $wp_query object
	// how much posts to display per page (DO NOT SET CUSTOM VALUE HERE!!!)
	$posts_per_page = (int) $query->query_vars['posts_per_page'];
	// current page
	$current_page = (int) $query->query_vars['paged'];
	// the overall amount of pages
	$max_page = $query->max_num_pages;

	// we don't have to display pagination or load more button in this case
	if ($max_page <= 1) return;

	// set the current page to 1 if not exists
	if (empty($current_page) || $current_page == 0) $current_page = 1;

	// you can play with this parameter - how much links to display in pagination
	$links_in_the_middle = 10;
	$links_in_the_middle_minus_1 = $links_in_the_middle - 1;

	// the code below is required to display the pagination properly for large amount of pages
	// I mean 1 ... 10, 12, 13 .. 100
	// $first_link_in_the_middle is 10
	// $last_link_in_the_middle is 13
	$first_link_in_the_middle = $current_page - floor($links_in_the_middle_minus_1 / 2);
	$last_link_in_the_middle = $current_page + ceil($links_in_the_middle_minus_1 / 2);

	// some calculations with $first_link_in_the_middle and $last_link_in_the_middle
	if ($first_link_in_the_middle <= 0) $first_link_in_the_middle = 1;
	if (($last_link_in_the_middle - $first_link_in_the_middle) != $links_in_the_middle_minus_1) {
		$last_link_in_the_middle = $first_link_in_the_middle + $links_in_the_middle_minus_1;
	}
	if ($last_link_in_the_middle > $max_page) {
		$first_link_in_the_middle = $max_page - $links_in_the_middle_minus_1;
		$last_link_in_the_middle = (int) $max_page;
	}
	if ($first_link_in_the_middle <= 0) $first_link_in_the_middle = 1;

	// begin to generate HTML of the pagination
	$pagination = '<nav id="pid_pagination_' . $session_id . '" class="wpDataTables wpDataTablesWrapper no-footer" role="navigation">
                <div class="dataTables_paginate paging_full_numbers">';

	// arrow first page
	if ($current_page == 1) {
		$pagination .= '<a class="paginate_button first disabled pid-page-numbers" page_id="first"></a>';
	} else {
		$pagination .= '<a class="paginate_button first pid-page-numbers" page_id="first"></a>';
	}

	// when to display "..." and the first page before it
	// if ($first_link_in_the_middle >= 3 && $links_in_the_middle < $max_page) {
	// 	$pagination.= '<a class="paginate_button pid-page-numbers" page_id="1">1</a>'; //'. $first_page_url . $search_query . '

	// 	if( $first_link_in_the_middle != 2 )
	// 		$pagination .= '<span class="paginate_button pid-page-numbers extend">...</span>';
	// }

	// arrow left (previous page)
	if ($current_page == 1) {
		$pagination .= '<a class="paginate_button previous disabled pid-page-numbers" page_id="previous"></a>'; //'. $first_page_url . '/page/' . ($current_page-1) . $search_query . '
	} else {
		$pagination .= '<a class="paginate_button previous pid-page-numbers" page_id="previous"></a>'; //'. $first_page_url . '/page/' . ($current_page-1) . $search_query . '
	}

	$pagination .= '<span>';
	// loop page links in the middle between "..." and "..."
	// for($i = $first_link_in_the_middle; $i <= $last_link_in_the_middle; $i++) {
	// 	if($i == $current_page) {
	// 		$pagination.= '<a class="paginate_button current pid-page-numbers">'.$i.'</a>';
	// 	} else {
	// 		$pagination .= '<a class="paginate_button pid-page-numbers" page_id="' . $i . '" >' .$i. '</a>'; //'. $first_page_url . '/page/' . $i . $search_query .'
	// 	}
	// }

	for ($i = 1; $i <= $max_page; $i++) {
		if ($i == $current_page) {
			$pagination .= '<a class="paginate_button current pid-page-numbers" page_id="' . $i . '">' . $i . '</a>';
		} else {
			$pagination .= '<a class="paginate_button pid-page-numbers" page_id="' . $i . '" >' . $i . '</a>'; //'. $first_page_url . '/page/' . $i . $search_query .'
		}
	}


	// when to display "..." and the last page after it
	// if ( $last_link_in_the_middle < $max_page ) {

	// 	if( $last_link_in_the_middle != ($max_page-1) )
	// 		$pagination .= '<span class="pid-page-numbers extend">...</span>';

	// 	$pagination .= '<a class="pid-page-numbers" page_id="' . $max_page . '">'. $max_page .'</a>'; //'. $first_page_url . '/page/' . $max_page . $search_query .'
	// }
	$pagination .= '</span>';

	// arrow right (next page)
	// if ($current_page != $last_link_in_the_middle )
	//   $pagination.= '<a class="paginate_button next pid-page-numbers"></a>'; //'. $first_page_url . '/page/' . ($current_page+1) . $search_query .'

	if ($current_page == $max_page) {
		$pagination .= '<a class="paginate_button next disabled pid-page-numbers" page_id="next"></a>'; //'. $first_page_url . '/page/' . ($current_page+1) . $search_query .'
	} else {
		$pagination .= '<a class="paginate_button next pid-page-numbers" page_id="next"></a>'; //'. $first_page_url . '/page/' . ($current_page+1) . $search_query .'
	}
	// arrow last page
	if ($current_page == $max_page) {
		$pagination .= '<a class="paginate_button last disabled pid-page-numbers" page_id="last"></a>';
	} else {
		$pagination .= '<a class="paginate_button last pid-page-numbers" page_id="last"></a>';
	}

	// end HTML
	$pagination .= "</div></nav>\n";

	// haha, this is our load more posts link
	// if( $current_page < $max_page )
	// 	$pagination.= '<div id="misha_loadmore">More posts</div>';

	// replace first page before printing it
	// echo str_replace(array("/page/1?", "/page/1\""), array("?", "\""), $pagination);
	echo $pagination;
}

// chart drawing image handler ajax
add_action('wp_ajax_uploadimage', 'pid_chart_image_ajax_handler'); // wp_ajax_{action}
add_action('wp_ajax_nopriv_uploadimage', 'pid_chart_image_ajax_handler'); // wp_ajax_nopriv_{action}
function pid_chart_image_ajax_handler()
{
	ignore_user_abort(true);
	ob_start(null, 0, PHP_OUTPUT_HANDLER_FLUSHABLE & PHP_OUTPUT_HANDLER_FLUSH & PHP_OUTPUT_HANDLER_REMOVABLE);
	// ob_start();
	// error_reporting(0);
	// Send HTTP headers
	$new = array(
		'post_title' => 'Our new post',
		'post_content' => 'This is the content of our new post.',
		'post_status' => 'publish'
	);
	$post_id = wp_insert_post($new);
	echo $post_id . ",";
	// echo json_encode($_SERVER);
	echo get_stylesheet_directory_uri() .
		"/db/worker.php";
	$filename = $_FILES["fileToUpload"]["name"];
	$chart_params = json_decode(stripslashes($_POST['chartParams']));
	/* Location */
	$location = wp_upload_dir()['path'] . "/$filename";
	$uploadOk = 1;
	$imageFileType = pathinfo($location, PATHINFO_EXTENSION);

	/* Valid Extensions */
	$valid_extensions = array("jpg", "jpeg", "png");
	/* Check file extension */
	if (!in_array(strtolower($imageFileType), $valid_extensions)) {
		$uploadOk = 0;
	}
	$move_file = move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $location);
	//data to be forwarded to worker.php
	$postData = json_encode(array_merge($_POST, $_FILES, array('postID' => $post_id)));
	echo strlen($postData);
	// headers for the connection to worker.php
	$worker =
		"https://pidhomes.ca/wp-content/themes/realhomes-child-3/db/worker.php";
	$headers =  "POST $worker HTTP/1.1" . PHP_EOL;
	$headers .= "Host: localhost" . PHP_EOL;
	$headers .= "Content-Length: " . strlen($postData) . PHP_EOL;
	$headers .= "Content-Encoding: none" . PHP_EOL;
	$headers .= "Content-Type: application/json" . PHP_EOL;

	// create socket to the local webserver for calling background script
	$socketToWorker = fsockopen('gator3140.hostgator.com', 443, $errno, $err_msg);
	if (!$socketToWorker) die("fsockopen error #$errno: $err_msg");

	// Make the request and send the POST data
	fwrite($socketToWorker, $headers . PHP_EOL . $postData);

	//read until the 1st packet is returned, then stop. 8192 is arbitrary
	//but needs to be greater than the expected response from worker.php
	$data = fread($socketToWorker, 8192);
	fclose($socketToWorker);

	//send response to browser (work still ongoing in background)
	if ($data === 'OK') echo "Success";
	else echo "Background work failed. Error: $data";

	// header("Content-Encoding: none");
	// header('Connection: close');
	// header('Content-Length: ' . ob_get_length());
	// ob_end_flush();
	// ob_flush();
	// flush();

	// function wpc_unset_imagesizes($sizes)
	// {
	// 	unset($sizes['thumbnail']);
	// 	unset($sizes['medium']);
	// 	unset($sizes['medium_large']);
	// 	unset($sizes['large']);
	// }
	// add_filter('intermediate_image_sizes_advanced', 'wpc_unset_imagesizes');

	// $attachment = array(
	// 	'post_mime_type' => "image/$imageFileType",  // file type
	// 	'post_title' => sanitize_file_name($filename),  // sanitize and use image name as file name
	// 	'post_content' => '',  // could use the image description here as the content
	// 	'post_status' => 'inherit'
	// );

	// // insert and return attachment id
	// $attachmentId = wp_insert_attachment($attachment, $location, $post_id);

	// // insert and return attachment metadata
	// $attachmentData = wp_generate_attachment_metadata($attachmentId, $location);

	// // update and return attachment metadata
	// wp_update_attachment_metadata($attachmentId, $attachmentData);

	// // finally, associate attachment id to post id
	// $success = set_post_thumbnail($post_id, $attachmentId);

	// // was featured image associated with post?
	// if ($success) {
	// 	$message = $filename . ' has been added as featured image to post.';
	// } else {
	// 	$message = $filename . ' has NOT been added as featured image to post.';
	// }

	// $filename = $_FILES['fileToUpload']['name'];
	// $chart_params = json_decode(stripslashes($_POST['chartParams']));
	// /* Location */
	// $location = wp_upload_dir()['path'] . $filename;
	// $uploadOk = 1;
	// $imageFileType = pathinfo($location, PATHINFO_EXTENSION);

	// /* Valid Extensions */
	// $valid_extensions = array("jpg", "jpeg", "png");
	// /* Check file extension */
	// if (!in_array(strtolower($imageFileType), $valid_extensions)) {
	// 	$uploadOk = 0;
	// }

	// if ($uploadOk == 0) {
	// 	echo 0;
	// } else {
	// 	/* Upload file */
	// 	if (true || move_uploaded_file($_FILES['fileToUpload']['tmp_name'], $location)) {
	// 		$new = array(
	// 			'post_title' => 'Our new post',
	// 			'post_content' => 'This is the content of our new post.',
	// 			'post_status' => 'publish'
	// 		);
	// 		$post_id = wp_insert_post($new);

	// 		if ($post_id) {
	// 			echo $post_id . ",";
	// 			header('Content-Length: ' . ob_get_length());
	// 			header('Connection: close');
	// 			ob_end_flush();
	// 			ob_flush();
	// 			flush();
	// 			$id = media_handle_sideload(
	// 				$_FILES['fileToUpload'],
	// 				$post_id,
	// 				"TEST POST with image"
	// 			);			// // And finally assign featured image to post
	// 			set_post_thumbnail($post_id, $id);
	// 			echo "image inserted,";
	// 		} else {
	// 			echo "Something went wrong, try again.";
	// 		}
	// 	} else {
	// 		echo 0;
	// 	}
	// }
}

function puts()
{
	static $init    = false;
	$numargs = func_num_args();
	$arg_list = func_get_args();
	$string = '';

	if ($numargs === 0)
		return;
	else if ($numargs > 1)
		$string = implode('', $arg_list);
	else
		$string = $arg_list[0];

	if ($init === false) {
		// buffer all upcoming output - make sure we care about compression:
		if (ob_start("ob_gzhandler")) {
			connsettings('compression', true);
		} else {
			ob_start();
		}
		$init = true;
		register_shutdown_function('puts', null, true);
	}
	echo $string;
}
function connsettings(/*$name, (optional)$val=$arg_list[1]*/)
{
	static $settings = array();
	$numargs        = func_num_args();
	$arg_list        = func_get_args();
	$name            = $arg_list[0];

	if ($numargs === 1)
		return $settings[$name] ?? null;

	$oldVal            = $settings[$name] ?? null;
	$settings[$name] = $arg_list[1];

	return $oldVal;
};
function connection_close()
{
	if (!headers_sent()) //it may work without this verification when no compression but may lead to uncomplete data
	{
		set_time_limit(0);
		ignore_user_abort(true);
		// send headers to tell the browser to close the connection
		ob_end_flush(); // Order here matter, it won't work if it goes after Content-Length
		if (connsettings('compression') === false)
			header("Content-Encoding: none");
		header('Content-Length: ' . ob_get_length());
		header('Connection: close');
		// flush all output
		if (ob_get_level() > 0)
			ob_flush();
		flush();
	}
}


// language translation function
if (!function_exists('pid_translate')) {
	function pid_translate($lang, $options)
	{

		if ($options === 2) {
			switch ($lang) {
				case 'cn':
					$lang_set = array(
						'all' => '所有类别&nbsp',
						'townhouse' => '联排别墅/城市屋&nbsp',
						'detached' => '别墅/独立屋&nbsp',
						'condo' => '公寓&nbsp',
						'groupbynbh' => '按照社区分组',
						'select_property_type' => '选择居住类别:&nbsp',
						'select_year' => '选择数据年份:&nbsp',
						'select_month' => '选择起始月份:&nbsp',
						'select_chart' => '选择图表类型:&nbsp',
						'chart_dollar' => '基准房屋价格',
						'chart_percentage' => '房价涨跌幅度%&nbsp'
					);
					break;
				case 'hk':
					$lang_set = array(
						'all' => '所有类别&nbsp',
						'townhouse' => '联排别墅/城市屋&nbsp',
						'detached' => '别墅/独立屋&nbsp',
						'condo' => '公寓&nbsp',
						'groupbynbh' => '按照社区分组',
						'select_property_type' => '选择居住类别:&nbsp',
						'select_year' => '选择数据年份:&nbsp',
						'select_month' => '选择月份:&nbsp',
						'select_chart' => '选择图表类型:&nbsp',
						'chart_dollar' => '基准房屋价格',
						'chart_percentage' => '房价涨跌幅度%&nbsp'
					);
					break;
				default: // english
					$lang_set = array(
						'all' => 'All Types&nbsp',
						'townhouse' => 'Townhouse&nbsp',
						'detached' => 'Single House&nbsp',
						'condo' => 'Apartment&nbsp',
						'groupbynbh' => 'By Hoods',
						'select_property_type' => 'Property Type:&nbsp',
						'select_year' => 'Years:&nbsp',
						'select_month' => 'Start Month:&nbsp',
						'select_chart' => 'Chart Type:&nbsp',
						'chart_dollar' => 'HPI Price $ $&nbsp',
						'chart_percentage' => 'HPI $ Change %&nbsp'
					);
					break;
			}
			return $lang_set;
		}
		// Search Chinese City Name or other language
		$term = get_term_by('slug', $options['location'], 'property-city');
		$location2 = $term->name;
		switch ($lang) {
			case 'cn':
			case 'hk':
				//$city_chinese_name = get_field('chinese_title', get_queried_object());
				$city_chinese_name = get_field('chinese_title', 'property-city_' . $term->term_id);
				$location = $city_chinese_name == '' ? $term->name : $city_chinese_name;
				break;
			default:
				$location = $term->name;
				break;
		}

		$dwelling_type = "";
		switch ($lang) {
			case 'cn':
			case 'hk':
				switch ($options['property_type']) {
					case 'detached':
						$dwelling_type = "独立屋/别墅";
						break;
					case 'townhouse':
						$dwelling_type = "城市屋/联排别墅";
						break;
					case 'condo':
						$dwelling_type = "公寓";
						break;
					default:
						$dwelling_type = "";
						break;
				}
				break;
			default:
				switch ($options['property_type']) {
					case 'all':
						$dwelling_type = '';
						break;
					default:
						$dwelling_type = $options['property_type'];
						break;
				}
				break;
		}
		$dwelling_type = ucfirst($dwelling_type);

		switch ($lang) {
			case 'cn':
				$lang_set = array(
					'locale' => 'zh_CN',
					'title' => "{$location}房价走势 | Peter Qu | {$location}房地产经纪 | PIDHOMES.ca",
					'city' => "$location",
					'section_title' => "{$location}房地产{$dwelling_type}基准房价走势和市场报告",
					'section_content' => "[使用方法] 点击选择您感兴趣的城市, 显示该城市的所有社区列表, 继续点击需要查看房价走势的社区标签, 即可显示出该社区的过去两年的房价走势. 点击多个社区标签, 可以比较不同社区的房价走势. X按钮是复位按钮. 清除社区标签后, 可以重新开始选择需要了解的社区, 查看社区房价走势图. 比如说, 对{$location}的房价走势感兴趣, 则首先点击{$location2}, 然后选择社区在{$location2}板块下选择几个不同的社区, 即可比较这些社区的房价走势了.",
					'HPI_table_title' => "{$location}房地产本月基准房价",
					'this_month_label' => '[' . date('Y m') . ']',
					'active_listings_label' => "{$location}在售房源"
				);
				break;
			case 'hk':
				$lang_set = array(
					'locale' => 'zh_HK',
					'title' => "{$location}房价走势 | Peter Qu | {$location}房地产经纪 | PIDHOMES.ca",
					'city' => '大温',
					'section_title' => "{$location}房地产{$dwelling_type}基准房价走势和市场报告",
					'section_content' => '[使用方法] 点击选择您感兴趣的城市, 显示该城市的所有社区列表, 继续点击需要查看房价走势的社区标签, 即可显示出该社区的过去两年的房价走势. 点击多个社区标签, 可以比较不同社区的房价走势. X按钮是复位按钮. 清除社区标签后, 可以重新开始选择需要了解的社区, 查看社区房价走势图. 比如说, 对素里的房价走势感兴趣, 则首先点击Surrey, 然后选择社区, 例如Fleetwood和Fraser Heights, 即可比较这两个社区的房价走势了. ',
					'HPI_table_title' => '大温房地产本月基准房价',
					'this_month_label' => '[' . date('Y m') . ']',
					'active_listings_label' => '在售房源'
				);
				break;
			default:
				$lang_set = array(
					'locale' => 'en_US',
					'title' => "$location Housing Market Chart and Report | Peter Qu | $location REALTOR | PIDHOMES.ca",
					'city' => "$location",
					'section_title' => "$location Real Estate $dwelling_type HPI Home Price Chart",
					'section_content' => "[<strong>How</strong> to use] Select a Greater Vancouver City/District, the communities of the City will be display under the main panel. Select one or more communities to show or compare the HPI House Price Trend Line. Press X to reset and start over. For Example, if you want to check the $location Communities House Price Trend, first click $location Label, then you can select any community from the sub panel, and the Trend Line will be displayed according to your selection.",
					'HPI_table_title' => "$location Real Estate Monthly House HPI",
					'this_month_label' => '[' . date('F Y') . ']',
					'active_listings_label' => "$location Active Listings"
				);
				break;
		}

		return $lang_set;
	}
}
