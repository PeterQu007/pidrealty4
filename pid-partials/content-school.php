<!--
  Single School Template File
  Dec 10 2019
-->

<?php
$schoolID = get_the_ID();
if (is_single($schoolID)) {
  $location = get_query_var('name');
} else {
  $location = get_query_var('location');
}
$page_nbh = get_query_var('page1', 1);
$page_school = get_query_var('page2', 1);
$page = 1;
$is_last_page = true;
$post_type = get_query_var('post_type');
switch ($post_type) {
  case 'community':
    $post_type_plural  = 'communities';
    $page = $page_nbh;
    break;
  case 'school':
    $post_type_plural = 'schools';
    $page = $page_school;
    break;
  case 'market':
    $post_type_plural = 'markets';
    break;
  case 'cma':
    $post_type_plural = 'cma';
    break;
  case 'demography':
    $post_type_plural = 'demography';
    break;
  default:
    $post_type_plural = 'communities';
    break;
}
$post_type_labels = get_post_type_labels(get_post_type_object($post_type));

// Get the neighborhood_code
// if (is_single($schoolID)) {
//   $metabox = nbh_3level_metabox($schoolID);
// } elseif ($location) {
//   $metabox = nbh_Direct_2level_metabox_by_slug($location);
// } else {
//   $metabox = nbh_TopLevel_metabox();
// } 
?>

<div class='school'>

  <?php
  $session_id = $post_type . '_' . $page;
  ?>
  <session id='<?php echo $session_id ?>' post_type='<?php echo $post_type; ?>' name='<?php echo $session_id ?>'>
    <?php
    // Build the metabox title block
    // Loop the property-cities
    $Empty_Location_Count_Max = 3;
    $empty_count = 1;
    if (is_single($schoolID)) {
      // Get the single school post by ID
      $schools = new WP_Query(array(
        'post_type' => 'school',
        'p' => $schoolID
      ));
    } else {
      if ($location) {
        // Define the query to get school posts of the_community
        $schools = new WP_Query(array(
          'post_type' => 'school',
          'tax_query' => array(
            array(
              'taxonomy' => 'property-city',
              'field' => 'slug', // 'term_taxonomy_id' or 'slug',
              'terms' => $location // 'Fraser Heights' //$term->name,
            ),
          ),
          'posts_per_page' => 3,
        ));
      } else {
        // Define the query to get all school posts
        $schools = new WP_Query(array(
          'post_type' => 'school',
          'posts_per_page' => 3,
        ));
      }
    }

    if ($schools->have_posts()) {
    ?>
      <div class='location' id='<?php echo $session_id ?>' post_type='<?php echo $post_type; ?>' name='<?php echo $session_id ?>'>
        <?php
        $i = 0;
        // LOOP Locations
        set_query_var('location', $location);
        set_query_var('is_x_post', false);
        set_query_var('post_type', $post_type);
        get_template_part('/pid-partials/content', 'metabox');

        // Add posts content/excerpt
        while ($schools->have_posts()) {
          $schools->the_post();
          $navLink = str_replace(
            "/" . strtolower($post_type_labels->name) . "/",
            "/" . strtolower($post_type_labels->singular_name) . "/",
            strtolower(get_the_permalink())
          );
        ?>
          <div style="text-align: left" class="<?php echo $session_id ?>">
            <h3><a href="<?php echo $navLink; ?>"> <?php the_title(); ?></a> </h3>
            <div><?php the_excerpt(); ?> </div>
          </div>

          <?php
          if (is_single($schoolID)) {
            // Only for single school post
            global $wpdb;
            $results = $wpdb->get_results("SELECT school_year, school_type, `rank`, rank5, rating FROM pid_schools WHERE school_name='" . get_field('school_name') . "'");
          ?>
            <!--
      toDo: Format School Rank & Rating Style
    -->
            <div><span>School Year: &nbsp<?php echo $results[0]->school_year; ?></span></div>
            <div><span>School Type: &nbsp<?php echo $results[0]->school_type; ?></span></div>
            <div><span>FI Rank: &nbsp<?php echo $results[0]->rank; ?> </span></div>
            <div><span>FI Rating: &nbsp<?php echo $results[0]->rating . '/10'; ?></span></div>


          <?php }
        }
        if ($schools->max_num_pages > 1) {
          ?><script>
            // var ajax_session = [];
            ajax_session["<?php echo $session_id ?>"] = ['<?php echo json_encode($schools->query_vars) ?>',
              '<?php echo $schools->max_num_pages ?>',
              '<?php echo $page ?>',
              '<?php echo $post_type_labels->name ?>'
            ];
            console.log(ajax_session);
          </script>
        <?php
          if ($page == $schools->max_num_pages) {
            $is_last_page = true;
            echo '<div class="loadmore2" id="load_more_' . $session_id . '" ></div>'; // you can use <a> as well
          } else {
            $is_last_page = false;
            echo '<div class="loadmore2" id="load_more_' . $session_id . '" >More ' . $post_type_labels->name . ' ...</div>'; // you can use <a> as well
          }
          pid_paginator($schools, $session_id);
        } ?>
      </div>
      <?php
    } else {
      // No POSTS
      if ($empty_count < $Empty_Location_Count_Max) {
      ?>
        <div class='location' id='<?php echo $session_id ?>' post_type='<?php echo $post_type; ?>' name='<?php echo $session_id ?>'>
          <?php
          $empty_count++;
          set_query_var('location', $location);
          set_query_var('post_type', $post_type);
          get_template_part('/pid-partials/content', 'metabox');
          $is_last_page = false;
          echo "<p class='community_empty'> " . strtoupper($post_type_labels->name) . " WILL BE COMING SOON... </p>";
          ?>
        </div>
    <?php
      }
    }
    ?>

    <script>
      var post_type = '<?php echo $post_type; ?>';
      console.log(post_type);
      var button_id = 'load_more_' + '<?php echo $session_id ?>';
      var load_more_button = document.getElementById(button_id);
      if (load_more_button) {
        if (<?php echo ($is_last_page) ? 1 : 0; ?>) {
          load_more_button.style.pointerEvents = "none";
        } else {
          load_more_button.style.pointerEvents = "auto";
        }
      }
    </script>

    <?php
    wp_reset_postdata();
    ?>

  </session>
</div>