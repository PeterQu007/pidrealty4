<?php

/**
 * Template Name: Home
 *
 * @package realhomes
 */

use PIDHomes\PIDEnv;

$env = new PIDEnv(PIDEnv::get_location());
do_action('inspiry_before_home_page_render', get_the_ID());

get_template_part('assets/' . INSPIRY_DESIGN_VARIATION . '/partials/home/home');
