<?php

/**
 * @since [.200901] CUSTOMIZE THE HOME PAGINATOR
 * @var USE_REAL_HOMES_STYLES
 */
function pid_home_paginator($query, $session_id)
{

  // get parameters from $wp_query object
  // how much posts to display per page (DO NOT SET CUSTOM VALUE HERE!!!)
  $posts_per_page = (int) $query->query_vars['posts_per_page'];
  // current page
  $current_page = (int) $query->query_vars['paged'];
  // the overall amount of pages
  $max_page = $query->max_num_pages;

  // we don't have to display pagination or load more button in this case
  if ($max_page <= 1) return;

  // set the current page to 1 if not exists
  if (empty($current_page) || $current_page == 0) $current_page = 1;

  // you can play with this parameter - how much links to display in pagination
  $links_in_the_middle = 10;
  $links_in_the_middle_minus_1 = $links_in_the_middle - 1;

  $first_link_in_the_middle = $current_page - floor($links_in_the_middle_minus_1 / 2);
  $last_link_in_the_middle = $current_page + ceil($links_in_the_middle_minus_1 / 2);

  // some calculations with $first_link_in_the_middle and $last_link_in_the_middle
  if ($first_link_in_the_middle <= 0) $first_link_in_the_middle = 1;
  if (($last_link_in_the_middle - $first_link_in_the_middle) != $links_in_the_middle_minus_1) {
    $last_link_in_the_middle = $first_link_in_the_middle + $links_in_the_middle_minus_1;
  }
  if ($last_link_in_the_middle > $max_page) {
    $first_link_in_the_middle = $max_page - $links_in_the_middle_minus_1;
    $last_link_in_the_middle = (int) $max_page;
  }
  if ($first_link_in_the_middle <= 0) $first_link_in_the_middle = 1;

  // begin to generate HTML of the pagination
  $pagination = '<nav id="pid_pagination_' . $session_id . '" class="wpDataTables wpDataTablesWrapper no-footer" role="navigation">
                <div class="rh_pagination">';


  for ($i = 1; $i <= $max_page; $i++) {
    if ($i == $current_page) {
      $pagination .= '<a class="rh_pagination__btn current pid-page-numbers" page_id="' . $i . '">' . $i . '</a>';
    } else {
      $pagination .= '<a class="rh_pagination__btn pid-page-numbers" page_id="' . $i . '" >' . $i . '</a>'; //'. $first_page_url . '/page/' . $i . $search_query .'
    }
  }

  // end HTML
  $pagination .= "</div></nav>\n";

  echo $pagination;
}
