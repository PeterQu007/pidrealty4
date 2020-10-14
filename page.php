<?php

/**
 * Page Template
 *
 * @package realhomes
 */

use PIDHomes\PIDEnv;
use PIDHomes\Utility;

$utility = new Utility('google_map');
$env = new PIDEnv($utility::$location_slug);
get_template_part('assets/' . INSPIRY_DESIGN_VARIATION . '/partials/page');
