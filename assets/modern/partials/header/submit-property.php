<?php

/** *@since [.200907] @var ADD_MOBILE_DETECT DISABLE SUBMIT BUTTON IF ON MOBILE DEVICE  */
if (!is_mobile()) {
	$submit_url         = inspiry_get_submit_property_url();
	$show_submit_button = get_option('inspiry_show_submit_on_login', 'false');

	if (!empty($submit_url) && ('hide' !== $show_submit_button)) {

		$theme_submit_button_text = get_option('theme_submit_button_text');
		if (empty($theme_submit_button_text)) {
			$theme_submit_button_text = esc_html__('Submit', 'framework');
		}

		$submit_link_format = '<div class="rh_menu__user_submit"><a href="%s">%s</a></div>';
		if ('true' === $show_submit_button) {
			if (is_user_logged_in() || inspiry_guest_submission_enabled()) {
				printf($submit_link_format, esc_url($submit_url), esc_html($theme_submit_button_text));
			}
		} else {
			printf($submit_link_format, esc_url($submit_url), esc_html($theme_submit_button_text));
		}
	}
}
