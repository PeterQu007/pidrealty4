<?php

/**
 * Single Blog Page
 *
 * @package realhomes
 */
// echo "TEST";


$post_lang = get_query_var('lang'); // cn: simplified chinese; tw: traditional chinese

add_action('wp_head', 'pid_change_meta_description');
function pid_change_meta_description()
{
	global $post_lang;
	// if condition for you parameter
	if ($post_lang == 'cn') {
		$description = '<meta name="description" content="大温房地产基准房价涨跌幅排行表 2020年 大温哥华地区 Greater Vancouver Area Provided By Peter Qu">';
	}
	echo $description;
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
get_template_part('assets/' . INSPIRY_DESIGN_VARIATION . '/partials/blog/single');

echo $_SESSION['url'] . '<br>';
echo strstr($url, '/cn/') == true ? 'yes, cn' : 'no, cn';
echo '<br>';
