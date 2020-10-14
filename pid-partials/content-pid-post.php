<?php

/***********************
 * All Posts: Show by City Taxonomy
 * Single Post: Show Sub area of the City
 */

// Get Arguments for the template
use PIDHomes\{Metabox, PIDTerms, Utility};

global $language, $context, $_metabox, $env;

// $postID = $env->post_ID;
$page = 1;
$is_last_page = true;

$pid_info = json_decode($args); // pid post could be community, market or school...
$show_map = $pid_info->show_map;
$is_pid_post = $pid_info->is_pid_post;
$is_a_single_post = $pid_info->is_a_single_post;
$post_type = $pid_info->post_type;
if (is_single($env->post_id)) {
    $location = get_query_var('name');
} else {
    $location = $pid_info->location;
}
// $community_level = $pid_info->community_level; // 3 for the communities have not level setting

$post_type_labels = $pid_info->post_type_labels;

// declare the variable for metabox locations
$Locations = [];

switch ($env->community_level) {
    case 0: // 'gva'
        // All Top Locations(GVA Cities)
        if ($is_pid_post) {
            $Locations = PIDTerms::get_gva_cities();
        } else {
            $Locations = [PIDTerms::get_PIDTerm_by('slug', 'gva')];
        }
        break;
    case 1: // 'surrey'
        // if it is the main section, show by districts metabox panels
        // if the city has no districts, show one metabox panel
        // if it is the sub section, show one metabox panel
        if ($is_pid_post) {
            $Locations = PIDTerms::get_city_district_PIDTerms_by('slug', $location);
            $Locations = array_slice($Locations, 1, count($Locations) - 1);
            // test the location community level
            $_location_level = PIDTerms::get_community_level($Locations[0]->term_id);
            if ($_location_level == 3) {
                $Locations = [PIDTerms::get_PIDTerm_by('slug', $location)];
            }
        } else {
            array_push($Locations, PIDTerms::get_PIDTerm_by('slug', $location));
        }
        break;
    case 2: // 'north surrey'
        // Get Family ancestors tree plus children
        array_push($Locations, PIDTerms::get_PIDTerm_by('slug', $location));
        break;
    case 3: // 'fraser heights'
        // Get Family ancestors tree
        array_push($Locations, PIDTerms::get_PIDTerm_by('slug', $location));
        break;
    default:
}

// Loop the property-cities
$Empty_Location_Count_Max = 5;
$empty_count = 1;
// Prepare to catch WP_Query errors
if (!function_exists('exceptions_error_handler')) {
    function exceptions_error_handler($severity, $message, $filename, $lineno)
    {
        if (error_reporting() == 0) {
            return;
        }
        if (error_reporting() & $severity) {
            throw new ErrorException($message, 0, $severity, $filename, $lineno);
        }
    }
}
set_error_handler('exceptions_error_handler');

$pid_location_info = [];
$pid_location_infos = [];
$pid_post_info = [];
$pid_post_infos = [];
$pid_metabox_info = [];
$pid_location_and_posts_info = [];
$pid_location_and_posts_infos = [];

foreach ($Locations as $location_term) {
    /** *@var session_id for loadmore */
    $session_id = $post_type . '_' . $location_term->slug . '_' . $page;
    $pid_location_info['session_id'] = $session_id;
    $pid_location_info['post_type_label'] = strtoupper($post_type_labels->name);
    $termID = $location_term->term_id;
    $pid_metabox_info['location'] = $location_term->slug;
    $pid_metabox_info['is_pid_post']  = $is_pid_post;
    $pid_metabox_info['post_type'] = $post_type;

    try {
        $pid_posts = Utility::fetchCommunityPosts($post_type, $location_term->slug, $page);
        get_template_part('/pid-partials/content', 'metabox',  json_encode($pid_metabox_info));

        if ($pid_posts->have_posts()) {
            $pid_location_info['have_posts'] = true;
            $pid_location_info['post_type'] = $post_type;
            $pid_location_info['pid_posts'] = $pid_posts;
            $pid_location_info['pid_more_pidposts'] = sprintf(__('Load More %s ...', 'pidhomes'), $post_type_labels->name);
            // Add posts content/excerpt
            while ($pid_posts->have_posts()) {
                $pid_posts->the_post();
                $navLink = str_replace(
                    "/" . strtolower($post_type_labels->name) . "/",
                    "/" . strtolower($post_type_labels->singular_name) . "/",
                    strtolower(get_the_permalink())
                );
                $pid_post_info['nav_link'] = $navLink;
                $pid_post_info['title'] = get_the_title();
                // TEST if it is a post, show the content, 
                // if it is an archive , not a post, show the excerpt.
                if ($is_a_single_post) {
                    $pid_post_info['excerpt'] = get_the_content();
                } else {
                    $pid_post_info['excerpt'] = get_the_excerpt();
                }
                $pid_post_infos[$location_term->slug . "_" . get_the_ID()] = $pid_post_info;
            }
            $pid_location_info["posts"] = $pid_post_infos;
            if ($pid_posts->max_num_pages > 1) {

                $pid_location_info['ajax_session'] = array(
                    "session_id" => $session_id,
                    'pid_posts_query_vars' => json_encode($pid_posts->query_vars),
                    'max_num_pages' => $pid_posts->max_num_pages,
                    'page' => $page,
                    'post_type_labels' => $post_type_labels->name
                );
                if ($page == $pid_posts->max_num_pages) {
                    $is_last_page = true;
                    $load_more_button_label = sprintf(__("End of %s List", 'pidhomes'), $post_type_labels->name);
                } else {
                    $is_last_page = false;
                    $load_more_button_label = sprintf(__("Load More %s ...", 'pidhomes'), $post_type_labels->name);
                }
                $pid_location_info['is_last_page'] = $is_last_page;
                $pid_location_info['load_more_button_label'] = $load_more_button_label;
            }
        } else {
            // No POSTS
            $pid_location_info['have_posts'] = false;
            $pid_location_info['pid_more_pidposts'] = sprintf(__('MORE %s WILL BE COMING SOON ...', 'pidhomes'), $post_type_labels->name);
            if ($empty_count < $Empty_Location_Count_Max) {
                $is_last_page = false;
                $pid_location_info['empty_count'] = $empty_count++;
                $pid_location_info['Empty_Location_Count_Max'] = $Empty_Location_Count_Max;
            } else {
                break;
            }
        }
    } catch (\Exception $e) {
        $error = $e;
        $wp_query_success = false;
    }
    wp_reset_postdata();
    wp_reset_query();
    unset($pid_posts);

    $pid_location_and_posts_info['posts'] = $pid_post_infos;
    $pid_location_and_posts_info['locations'] = $pid_location_info;
    $pid_location_and_posts_info['metabox'] = $_metabox;

    $pid_location_and_posts_infos[$location_term->slug] = $pid_location_and_posts_info;

    $pid_post_info = [];
    $pid_location_info = [];
    $pid_post_infos = [];
    $pid_location_infos = [];
    $pid_metabox_info = [];
    $pid_location_and_posts_info = [];
    $_metabox = [];
    // Reset community in query_var array
    set_query_var('location', get_query_var('property-city'));
}

// Restore the error handler
restore_error_handler();

$context[$post_type]['pid_location_and_posts'] = $pid_location_and_posts_infos;

// Timber::render('twig/content-pid-post.twig', $context);

?>

<div style="text-align: left">
    <?php
    //var_dump($context);
    ?>
</div>