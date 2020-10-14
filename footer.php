<?php

/**
 * Footer Template
 *
 * @package realhomes
 */

use PIDHomes\{PIDEnv};
?>
<div class="rh_sticky_wrapper_footer <?php if (INSPIRY_DESIGN_VARIATION === 'modern') {
																				echo esc_attr('rh_apply_sticky_wrapper_footer');
																			} ?>">
	<?php
	if (!function_exists('elementor_theme_do_location') || !elementor_theme_do_location('footer')) {
		if (function_exists('hfe_footer_enabled') && true == hfe_footer_enabled()) {
			hfe_render_footer();
		} else {
	?>
	<?php
			get_template_part('assets/' . INSPIRY_DESIGN_VARIATION . '/partials/footer');
		}
	}
	?>
</div>
<?php

inspiry_post_nav();

if (INSPIRY_DESIGN_VARIATION == 'modern') {
	echo '</div>';
	//close .rh_wrap opened in header.php
}
$inspiry_scroll_to_top = get_option('inspiry_scroll_to_top', 'true');
if ($inspiry_scroll_to_top == 'true') {
?>
	<a href="#top" id="scroll-top"><i class="fa fa-chevron-up"></i></a>
<?php
}
/**
 * Include modal login if login & register page URL is not configured
 */
if (!is_user_logged_in()) {
	$theme_login_url   = inspiry_get_login_register_url();
	$prop_detail_login = inspiry_prop_detail_login();
	$skip_prop_single  = ('yes' == $prop_detail_login && !is_user_logged_in() && is_singular('property'));

	if (
		empty($theme_login_url) &&
		(!is_page_template('templates/login-register.php')) &&
		!$skip_prop_single
	) {
		get_template_part('common/partials/login-modal');
	}
}

// floating features.
get_template_part('common/partials/floating-features');

wp_footer();
?>
</body>

</html>