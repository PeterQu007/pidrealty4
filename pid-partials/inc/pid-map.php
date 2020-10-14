<?php

//:: Build Greater Vancouver Location Map
use PIDHomes\PIDTerms;

$location = $env::$location;

switch ($env->community_level) {
  case 0: // 'gva'
    // All Top Locations(GVA Cities)
    $map_locations = PIDTerms::get_PIDTerms(array(
      'taxonomy' => 'property-city',
      'parent' => 0,
      'hide_empty' => false,
      'order' => 'DESC', //DESC: descending; ASC: ascending
      'exclude' => array($env->community_term_id) // exclude gva
    ));;
    break;
  case 1: // 'surrey'
    $map_locations = PIDTerms::get_PIDTerms(array(
      'taxonomy' => 'property-city',
      'fields' => 'all', //'names',
      'hide_empty' => false,
      'child_of' => $env->community_term_id,
    ));
    break;
  case 2: // 'north surrey'
    // Get Family ancestors tree plus children
    $map_locations = PIDTerms::get_PIDTerms(array(
      'taxonomy' => 'property-city',
      'fields' => 'all', //'names',
      'hide_empty' => false,
      'child_of' => $env->community_term_id,
    ));
    break;
  case 3: // 'fraser heights'
    // Get Family ancestors tree
    $map_locations = PIDTerms::get_ancestor_pidterms('slug', $location);
    break;
  default:
}

$pid_map_locations = [];
$map_location_info = [];

if ($show_map) {
  foreach ($map_locations as $map_location) {
    // do not show Whistler and Sunshine Coast on the map
    if (in_array($map_location->slug, array('whistler', 'sunshine-coast'))) {
      continue;
    }
    $mapLocation = get_field('map_location', 'property-city_' . $map_location->term_id); // ACF get the map location by term
    // if mapLocation has not been set, bypass the location
    if (!$mapLocation) {
      continue;
    }
    $map_location_info['map_location'] = $mapLocation;
    $map_location_info['map_location_label'] = $map_location->label;
    $map_location_info['nav_link'] =
      get_site_url() . '/' . $env->post_type_labels->plural_name . '/' . $map_location->slug . '/';
    $map_location_info['location_name'] = $map_location->name;

    // add map location info to pid_map_locations array
    $pid_map_locations[$map_location->slug] = $map_location_info;
  }
}
