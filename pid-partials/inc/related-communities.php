<?php

/**
 * @version Related Communities Links
 * @param community_level:: 0,1,2,3 | From Parent Module
 * @param post_type_plural::  markets/communities/schools/ From Parent Module
 */

use PIDHomes\{Metabox, PIDTerms};

switch ($env->community_level) {
  case "0":
    $more_nbhs_names = json_decode(Metabox::get_nbhCodes_and_nbhNames($env::$location, 1)[1]);
    break;
  case "1":
  case "2":
    $more_nbhs_names = json_decode(Metabox::get_nbhCodes_and_nbhNames($env::$location, 2)[1]);
    break;
  default:
    // default level is level 3
    $more_nbhs_names = Metabox::get_city_district_nbh_metabox_by($env::$location);
    $x = [];
    foreach ($more_nbhs_names as $nbh) {
      $x[$nbh['Term_Code']] = $nbh['Term_Name'];
    }
    $more_nbhs_names = $x;
    break;
}
$_nbh_terms = [];
$_nbh_term = [];
foreach ($more_nbhs_names as $key => $value) {
  $nbh_term = PIDTerms::get_PIDTerm_by('nbh_code', $key);
  if (!$nbh_term) {
    continue;
  } else {
    $nbh_link = site_url() . "/" . $env->post_type_labels->plural_name . "/" . $nbh_term->slug . "/";
    $more_nbhs_label = $nbh_term->label;
  }
  $_nbh_term['more_nbhs_label'] = $more_nbhs_label;
  $_nbh_term['nbh_link'] = $nbh_link;
  $_nbh_terms[$nbh_term->slug] = $_nbh_term;
}
