<?php

/**
 * Gallery
 *
 * @since      3.0.0
 * @package    realhomes
 * @subpackage modern
 * @version [.200901] ADD LANGUAGE TRANSLATE
 * @var global $language
 */

global $language;

use PIDHomes\PIDTerms;

/** *@since [.200901] Add load more @var AJAX_CALL */
?>
<script>
	var ajax_session = new Object(); // Prepare for paginator and loadmore javascript
</script>
<session class="rh_section rh_wrap--padding rh_wrap--topPadding pid_section__content pid_section--content_padding">
	<div class="rh_page">

		<div class="rh_page__head">

			<h2 class="rh_page__title pid_page_title">
				<?php $page_title = __('Explore Popular Greater Vancouver Neighborhoods', 'pidhomes'); ?>
				<p class="pid_page_title title"><?php echo esc_html($page_title); ?></p>
			</h2><!-- /.rh_page__title -->

			<div id="filter-by" class="rh_page__gallery_filters">
				<a href="<?php echo esc_url(site_url() . "/communities/"); ?>" data-filter="rh_gallery__item" class="active"><?php esc_html_e('All', 'framework'); ?></a>
				<?php
				// Named sub-meta queries and multiple orderby arguments
				$community_terms = PIDTerms::get_PIDTerms(
					array(
						'taxonomy' 		=> 'property-city',
						'parent' 			=> 0, // ONLY GET CITIES
						'meta_query'  => array(
							'relation' => 'AND',
							'featured' => array(
								'key'     => 'featured',
								'value' 	=> true,
								'compare' => '='
							),
							'sort_order' => array(
								'key' => 'sort_number',
								'value' => 0,
								'compare' => '>',
								'type' => 'NUMERIC'
							)
						),
						'orderby' => 'sort_order',
						'hide_empty' => false,
						'number' => 4 // LIMIT THE RETURN TERMS NUMBER
					)
				);

				if (!empty($community_terms) && is_array($community_terms)) {
					foreach ($community_terms as $community_term) {
						echo '<a href="' . esc_url(site_url() . "/communities/" . $community_term->slug) . '" data-filter="' . esc_attr($community_term->label) . '" title="' . sprintf(esc_html__('View all %s communities', 'pidhomes'), $community_term->label) . '">' . esc_html($community_term->label) . '</a>';
					}
				}
				?>
			</div><!-- /.rh_page__gallery_filters -->

		</div><!-- /.rh_page__head -->

		<?php
		$get_content_position = get_post_meta(get_the_ID(), 'REAL_HOMES_content_area_above_footer', true);
		global $gallery_name;
		$page = 1;
		if (get_query_var('page1')) {
			$page = get_query_var('page1'); // page1 for community posts
		} elseif (get_query_var('page')) { // if is static front page
			$page = get_query_var('page');
		}
		$session_id = 'pid_community_' . $page;
		?>
		<session class="pid_home_session" id='<?php echo $session_id ?>' post_type='<?php echo $post_type; ?>' name='<?php echo $session_id ?>'>
			<div class="pid_home_overlay"></div>
			<div class="rh_gallery">
				<div class="rh_gallery__wrap isotope">
					<?php

					// Gallery Query.
					$community_post_args = array(
						'post_type' => 'community',
						'paged'     => $paged,
						'posts_per_page' => 4,
						'meta_query' => array(
							'relation' => 'AND',
							'thumb_nail' => array(
								'key' => '_thumbnail_id'
							),
							'sort_number' => array(
								'key' => 'sort_number',
								'value' => 0,
								'compare' => '>',
								'type' => 'NUMERIC'
							)
						),
						'orderby' => 'sort_number',
						'order' => 'ASC'
					);

					?>
					<?php
					$community_query = new WP_Query($community_post_args);
					while ($community_query->have_posts()) :
						$community_query->the_post();

						// Getting list of property status terms.
						$term_list = $gallery_name;
						$terms     = get_the_terms(get_the_ID(), 'property-city');

						if (!empty($terms) && !is_wp_error($terms)) {
							foreach ($terms as $term) {
								/** *@since [.200901] @var TRANSLATOR */
								$term = pid_location_term_i18n($term, $language);
								$term_list .= ' ';
								$term_list .= $term->slug;
							}
						}

						if (has_post_thumbnail()) :
					?>
							<div class="rh_gallery__item isotope-item <?php echo esc_attr($session_id); ?>">
								<?php
								$image_id       = get_post_thumbnail_id();
								$full_image_url = wp_get_attachment_url($image_id);
								global $gallery_image_size;
								$featured_image = wp_get_attachment_image_src($image_id, $gallery_image_size);
								?>
								<figure>
									<div class="media_container">
										<a class="<?php echo esc_attr(get_lightbox_plugin_class()); ?> zoom" <?php echo generate_gallery_attribute(); ?> href="<?php echo esc_url($full_image_url); ?>" title="<?php the_title_attribute(); ?>">
											<img src="<?php echo esc_url(get_theme_file_uri(INSPIRY_THEME_ASSETS . '/images/icons/icon-zoom.svg')); ?>">
										</a>
										<a class="link" href="<?php the_permalink(); ?>">
											<img src="<?php echo esc_url(get_theme_file_uri(INSPIRY_THEME_ASSETS . '/images/icons/icon-link.svg')); ?>">
										</a>
									</div>
									<?php echo '<img class="img-border" src="' . esc_attr($featured_image[0]) . '" alt="' . the_title_attribute('echo=0') . '">'; ?>
								</figure>
								<h5 class="item-title entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
							</div>
					<?php
						endif;
					endwhile;
					?>
				</div><!-- /.rh_gallery__wrap isotope -->
			</div><!-- /.rh_gallery -->
			<?php
			/** 
			 *@since [.200901] Add load more 
			 *@var SET_AJAX_SESSION
			 */
			if ($community_query->max_num_pages > 1) {
			?><script>
					// var ajax_session = [];
					ajax_session["<?php echo $session_id ?>"] = ['<?php echo json_encode($community_query->query_vars) ?>',
						'<?php echo $community_query->max_num_pages ?>',
						'<?php echo $page ?>'
					];
					console.log(ajax_session);
				</script>
			<?php
				pid_home_paginator($community_query, $session_id);
			}
			wp_reset_postdata();
			?>
		</session>

	</div><!-- /.rh_page rh_page__main -->
</session>
<?php
if ('1' === $get_content_position) {

	if (have_posts()) {
		while (have_posts()) {
			the_post();
?>
			<div class="rh_content <?php if (get_the_content()) {
																echo esc_attr('rh_page__content');
															} ?>">
				<?php the_content(); ?>
			</div><!-- /.rh_content -->
<?php
		}
	}
}
?>
<!-- /.rh_section rh_wrap rh_wrap--padding -->