<?php

/**
 * Template Name: Full Width
 *
 * @since 1.0.0
 * @package realhomes
 * @ USED FOR RPS LISTING RESULTS
 */

use PIDHomes\PIDEnv;
use PIDHomes\Utility;

$utility = new Utility('google_map');
$env = new PIDEnv($utility::$location_slug);

do_action('inspiry_before_fullwidth_page_render', get_the_ID());

get_template_part('assets/' . INSPIRY_DESIGN_VARIATION . '/partials/page/fullwidth');
