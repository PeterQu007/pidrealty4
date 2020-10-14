<?php

/**
 * Banner: Image
 *
 * Image banner for page templates.
 *
 * @package realhomes
 * @subpackage modern
 */

// PIDHomes: agent post use full banner height and not banner title */
$is_agent = get_post_type() == 'agent' ? true : false;
$is_agent = $is_agent ? true : get_query_var('is_agent');
//**https://pidhomes.ca/wp-content/uploads/2019/05/BusBenchAd-PeterQu-1To10-R2.jpg */
// $Peter_Qu_Banner = 'http://localhost/pidrealty3/wp-content/uploads/2019/05/BusBenchAd-PeterQu-1To10-R2.jpg';
// http://localhost/pidrealty3/wp-content/uploads/2019/05/BusBenchAd-PeterQu-1To10-R2.jpg
$Peter_Qu_Banner = get_site_url() . '/wp-content/uploads/2020/07/BusBenchAd-PeterQu-1To10-R2.jpg';

// Revolution Slider if alias is provided and plugin is installed.
$rev_slider_alias = get_post_meta(get_the_ID(), 'REAL_HOMES_rev_slider_alias', true);
if (function_exists('putRevSlider') && (!empty($rev_slider_alias))) {
	putRevSlider($rev_slider_alias);
} else {
	// Banner Image.
	$banner_image_path = '';
	$banner_image_id = get_post_meta(get_the_ID(), 'REAL_HOMES_page_banner_image', true);
	if ($banner_image_id) {
		$banner_image_path = wp_get_attachment_url($banner_image_id);
	} else {
		$banner_image_path = $is_agent ? $Peter_Qu_Banner : get_default_banner();
	}

	// Banner Title.
	$banner_title = get_post_meta(get_the_ID(), 'REAL_HOMES_banner_title', true);
	if (empty($banner_title)) {
		$banner_title = get_the_title(get_the_ID());
	}

	// website level banner title show/hide setting
	$hide_banner_title = get_option('theme_banner_titles');
	// PIDHomes: hide banner title on agent post
	if (is_front_page() || $is_agent) {
		$hide_banner_title = 'true';
	}
?>

	<?php //**** agent post : use height: 100% */ 
	if ($is_agent) {
	?>
		<section class="rh_banner_about rh_banner__image" style="height: auto">
			<img src="<?php echo esc_url($banner_image_path); ?>" alt="Greater Vancouver Surrey PID REALTOR PETER QU" width="100%" height="100%">
		<?php } else { ?>
			<section class="rh_banner rh_banner__image" style="background-image: url('<?php echo esc_url($banner_image_path); ?>');">
				<div class="rh_banner__cover"></div>
			<?php } ?>

			<div class="rh_banner__wrap">
				<?php
				// Page level banner title show/hide setting
				$banner_title_display = get_post_meta(get_the_ID(), 'REAL_HOMES_banner_title_display', true);

				if (('true' != $hide_banner_title) && ('hide' != $banner_title_display)) {
					if (is_page_template(array(
						'templates/2-columns-gallery.php',
						'templates/3-columns-gallery.php',
						'templates/4-columns-gallery.php',
						'templates/agencies-list.php',
						'templates/agents-list.php',
						'templates/compare-properties.php',
						'templates/contact.php',
						'templates/dsIDXpress.php',
						'templates/edit-profile.php',
						'templates/favorites.php',
						'templates/grid-layout.php',
						'templates/half-map-layout.php',
						'templates/list-layout.php',
						'templates/login-register.php',
						'templates/membership-plans.php',
						'templates/my-properties.php',
						'templates/optima-express.php',
						'templates/properties-search.php',
						'templates/properties-search-half-map.php',
						'templates/properties-search-left-sidebar.php',
						'templates/properties-search-right-sidebar.php',
						'templates/submit-property.php',
						'templates/users-lists.php',
					))) {
				?><h1 class="rh_banner__title"><?php echo esc_html($banner_title); ?></h1><?php
																																								} else {
																																									?><h2 class="rh_banner__title"><?php echo esc_html($banner_title); ?></h2><?php
																																																																													}
																																																																												}
																																																																														?>

				<?php if (is_page_template('templates/list-layout.php') || is_page_template('templates/list-layout-full-width.php') || is_page_template('templates/grid-layout.php') || is_page_template('templates/grid-layout-full-width.php')) : ?>
					<div class="rh_banner__controls">
						<?php get_template_part('assets/modern/partials/properties/view-buttons'); ?>
					</div>
				<?php endif; ?>

			</div>
			</section>
		<?php
	}
