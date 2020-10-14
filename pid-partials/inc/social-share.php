<?php

/**
 * @version self-contained social share component
 * Populating View social-share.twig (social share buttons panel)
 */


$display_social_share         = get_option('theme_display_social_share', 'true');
$inspiry_share_property_label = get_option('inspiry_share_property_label');
$inspiry_print_property_label = get_option('inspiry_print_property_label');

// Get Social Share Info
if (!isset($wp)) {
  global $wp;
}
$current_url = home_url(add_query_arg(array($_GET), $wp->request));
$social_share_context['fb_share_and_like_link'] = str_replace('&', '$', $current_url);
$social_share_context['social_share_label'] = $inspiry_print_property_label;
if (wp_is_mobile()) {
  $social_share_context['social_is_mobile'] = esc_html('mobile');
}
$social_share_context['share_button_id'] = "market_share_this";
$social_share_context['share_button_class'] = "share-this";
