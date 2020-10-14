<!--
  PIDHomes:: Render the community contents
  @parameter $communityID

-->

<?php
$communityID = get_the_ID();
$community = get_query_var('community');
// Build the metabox title block
get_template_part('/pid-partials/content', 'metabox');

if ($communityID) {
  //Define the query to get community posts
  $Communities = new WP_Query(array(
    'post_type' => 'community',
    'tax_query' => array(
      array(
        'taxonomy' => 'property-city',
        'field' => 'slug', // 'term_taxonomy_id' or 'slug',
        'terms' =>  $community // 'Fraser Heights' //$term->name,
      ),
    ),
    'posts_per_page' => -1,
  ));
} else {
  $Communities = new WP_Query(array(
    'post_type' => 'community',
    'p' => $communityID
  ));
}
while ($Communities->have_posts()) {
  $Communities->the_post();  ?>
  <div style="text-align: left">
    <h2><?php the_title(); ?></h2>
    <?php get_field('banner_image') ?>
    <?php if ($communityID) { ?>
      <div class="acf-map">
        <?php
        $terms = get_the_terms($communityID, 'property-city');
        $mapLocation = get_field('map_location', 'property-city_' . $terms[0]->term_id);
        $community_section_link =  '/communities/';
        $href = get_site_url() . $community_section_link . $terms[0]->slug;
        ?>
        <div class="marker" data-lat="<?php echo $mapLocation['lat'] ?>" data-lng="<?php echo $mapLocation['lng'] ?>">
          <h3><a href="<?php echo $href; ?>"><?php the_title(); ?></a> </h3>
          <?php echo $mapLocation['address']; ?>
        </div>
        <?php
        $mapLocation = get_field('map_location');
        $community_section_link = '/community/';
        $href = get_site_url() . $community_section_link . $community;
        ?>
        <div class="marker" data-lat="<?php echo $mapLocation['lat'] ?>" data-lng="<?php echo $mapLocation['lng'] ?>">
          <h3><a href="<?php echo $href; ?>"><?php the_title(); ?></a> </h3>
          <?php echo $mapLocation['address']; ?>
        </div>
      </div>

    <?php } ?>
    <div><?php !$communityID ? the_excerpt() : the_content(); ?> </div>

  </div>
  <!--
          toDo: Format Community Profile data
        -->
  <div><span>Community Area: &nbsp<?php echo get_field('community_area'); ?></span></div>
  <div><span>Private Dwellings: &nbsp<?php echo get_field('occupied_private_dwellings'); ?></span></div>
  <div><span>Population: &nbsp<?php echo get_field('population'); ?> </span></div>
  <div><span>Average Household Income: &nbsp<?php echo get_field('average_household_income'); ?></span></div>

<?php }
?>