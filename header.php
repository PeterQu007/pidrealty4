<?php

/**
 * Header file for the Realhomes WordPress theme.
 *
 * @link https://themeforest.net/item/real-homes-wordpress-real-estate-theme/5373914
 *
 * @package Realhomes
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<?php
	/** @version [.200830] Add Social Media Tags */
	$post_id = get_the_ID();

	?>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<meta name="format-detection" content="telephone=no">
	<?php

	use PIDHomes\{PIDHomesSEO, PIDEnv, Utility};

	global $env, $remote_ip, $is_myself_ip, $utility, $is_pid_home;

	if (empty($env)) {
		$utility = new Utility('');
		$env = new PIDEnv($utility::$location_slug);
		$remote_ip = $env::$remote_ip;
		$is_myself_ip = $env::$is_myself_ip;
	}

	$seo = new PIDHomesSEO($env);
	$seo->unset_pidhomes_title();
	?>
	<title> <?php echo $seo->page_title; ?> </title>
	<meta name="description" content="<?php echo $seo->page_description; ?>">
	<?php
	$seo->get_social_meta($post_id);
	/**
	 * @version [.200830] Add Google Tracking Condition 
	 * @link https://support.google.com/google-ads/answer/6095821?hl=en
	 * Set up conversion tracking for your website
	 * IF ON LOCALHOST OR ON REMOTE TESTING SERVER, BYPASS GOOGLE TAG / TRACKING
	 */
	if (PID_RUN_GOOGLE_TRACKING && !$is_myself_ip) :
	?>
		<!-- Google Tag Manager -->
		<script>
			(function(w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({
					'gtm.start': new Date().getTime(),
					event: 'gtm.js'
				});
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != 'dataLayer' ? '&l=' + l : '';
				j.async = true;
				j.src =
					'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
				f.parentNode.insertBefore(j, f);
			})(window, document, 'script', 'dataLayer', '<?php echo PID_GOOGLE_TAG_ID; ?>');
		</script>
		<!-- End Google Tag Manager -->
		<!-- Global site tag (gtag.js) - Google Ads: 608105679 -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=AW-608105679"></script>
		<script>
			window.dataLayer = window.dataLayer || [];

			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', 'AW-608105679');
		</script>
		<!-- End Google site tag (gtag.js) - Google Ads: 608105679 -->
	<?php
	endif;
	?>

	<?php
	if (is_archive('market') || is_singular('community') || is_singular('cma') || get_post_type() == 'page' || !$is_pid_home) {
		if (!function_exists('pid_social_share')) {
			function pid_social_share()
			{
				$js_dir_path = '/assets/' . INSPIRY_DESIGN_VARIATION . '/scripts/';
				$css_dir_path = '/assets/' . INSPIRY_DESIGN_VARIATION . '/styles/';
				wp_enqueue_script(
					'share-js',
					get_theme_file_uri($js_dir_path . 'vendors/share.min.js'),
					array('jquery'),
					INSPIRY_THEME_VERSION,
					true
				);

				wp_enqueue_script(
					'property-share',
					get_theme_file_uri($js_dir_path . 'js/property-share.js'),
					array('jquery'),
					INSPIRY_THEME_VERSION,
					true
				);

				if ('true' === get_option('realhomes_line_social_share', 'false')) {
					$realhomes_line_social_share = "
					(function($) { 
					    'use strict';
						$(document).ready(function () {
							$(window).on('load', function () {
							    var shareThisDiv = $('.share-this');
							    shareThisDiv.addClass('realhomes-line-social-share-enabled');
								shareThisDiv.find('ul').append('<li class=\"entypo-line\" id=\"realhomes-line-social-share\"><i class=\"fab fa-line\"></i></li>');
							});
							$(document).on('click', '#realhomes-line-social-share', function () {
								window.open(
									'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(window.location.href.replace('&','$')),
									'_blank',
									'location=yes,height=570,width=520,scrollbars=yes,status=yes'
								);
							});
						});
					})(jQuery);";
					wp_add_inline_script('property-share', $realhomes_line_social_share);
				}

				// entypo fonts.
				wp_enqueue_style(
					'entypo-fonts',
					get_theme_file_uri($css_dir_path . 'css/entypo.min.css'),
					array(),
					INSPIRY_THEME_VERSION,
					'all'
				);
			}
		}
		add_action('wp_enqueue_scripts', 'pid_social_share');
	}

	wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php
	if (PID_RUN_GOOGLE_TRACKING && !$is_myself_ip) :
	?>
		<!-- Google Tag Manager (noscript) -->
		<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=<?php echo PID_GOOGLE_TAG_ID; ?>" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
		<!-- End Google Tag Manager (noscript) -->
		<!-- <div id="fb-root"></div>
	<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0&appId=500317567485156&autoLogAppEvents=1" nonce="gbwaThGS"></script> -->

	<?php
	endif;

	if (INSPIRY_DESIGN_VARIATION === 'modern') {
		echo '<div class="rh_wrap rh_wrap_stick_footer">';
	}
	if (
		is_page_template('templates/half-map-layout.php') ||
		is_page_template('templates/properties-search-half-map.php')
	) {
		echo '<div class="inspiry_half_map_header_wrapper">'; // wrap-up header to make half map fixed compatible with Elementor.
	}

	if (!function_exists('elementor_theme_do_location') || !elementor_theme_do_location('header')) {
		if (function_exists('hfe_header_enabled') && true == hfe_header_enabled()) {
			hfe_render_header();
		} else {
			get_template_part('assets/' . INSPIRY_DESIGN_VARIATION . '/partials/header');
		}
	}
