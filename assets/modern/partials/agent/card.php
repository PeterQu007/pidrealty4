<?php
/**
 * View: Agent Card
 *
 * Agent card for agent listing.
 *
 * @since 	3.0.0
 * @package RH/modern
 */

global $post;
$agent_id 	= get_the_ID();

$facebook_url 		= get_post_meta( $agent_id, 'REAL_HOMES_facebook_url', true );
$twitter_url 		= get_post_meta( $agent_id, 'REAL_HOMES_twitter_url', true );
$linked_in_url 		= get_post_meta( $agent_id, 'REAL_HOMES_linked_in_url', true );
$instagram_url 		= get_post_meta( $agent_id, 'inspiry_instagram_url',true );

/* Agent Contact Info */
$agent_mobile 		= get_post_meta( $agent_id, 'REAL_HOMES_mobile_number', true );
$agent_whatsapp		= get_post_meta( $agent_id, 'REAL_HOMES_whatsapp_number', true );
$agent_office_phone = get_post_meta( $agent_id, 'REAL_HOMES_office_number', true );
$agent_office_fax 	= get_post_meta( $agent_id, 'REAL_HOMES_fax_number', true );
$agent_email		= get_post_meta( $agent_id, 'REAL_HOMES_agent_email', true );
$agent_website      = get_post_meta( $agent_id, 'REAL_HOMES_website', true );

$listed_properties	= 0;
if ( function_exists( 'ere_get_agent_properties_count' ) ) {
	$listed_properties	= ere_get_agent_properties_count( $agent_id );
}
?>

<article class="rh_agent_card">

	<div class="rh_agent_card__wrap">

		<div class="rh_agent_card__head">

			<?php if ( has_post_thumbnail( $agent_id ) ) : ?>
				<figure class="rh_agent_card__dp">
					<a title="<?php echo esc_attr( get_the_title( $agent_id ) ); ?>" href="<?php echo get_permalink( $agent_id ); ?>">
		                <?php echo get_the_post_thumbnail( $agent_id, 'agent-image' ); ?>
		            </a>
				</figure>
				<!-- /.rh_agent_card__dp -->
			<?php endif; ?>

			<div class="rh_agent_card__name">

				<h4 class="name"><a href="<?php echo get_permalink( $agent_id ); ?>"><?php echo get_the_title( $agent_id ); ?></a></h4>
				<!-- /.name -->

				<div class="social">
					<?php
					if ( ! empty( $facebook_url ) ) {
		                ?>
		                <a target="_blank" href="<?php echo esc_url( $facebook_url ); ?>"><i class="fa fa-facebook-official fa-lg"></i></a>
		                <?php
		            }

		            if ( ! empty( $twitter_url ) ) {
		                ?>
		                <a target="_blank" href="<?php echo esc_url( $twitter_url ); ?>" ><i class="fa fa-twitter fa-lg"></i></a>
		                <?php
		            }

		            if ( ! empty( $linked_in_url ) ) {
		                ?>
		                <a target="_blank" href="<?php echo esc_url( $linked_in_url ); ?>"><i class="fa fa-linkedin-square fa-lg"></i></a>
		                <?php
		            }

		            if ( ! empty( $instagram_url ) ) {
		                ?>
		                <a target="_blank" href="<?php echo esc_url( $instagram_url ); ?>"><i class="fa fa-instagram fa-lg"></i></a>
		                <?php
		            }

					if ( ! empty( $agent_website ) ) {
						?>
                        <a target="_blank" href="<?php echo esc_url( $agent_website ); ?>"><i class="fa fa-globe fa-lg"></i></a>
                        <?php
					}
					?>
				</div>
				<!-- /.social -->

			</div>
			<!-- /.rh_agent_card__name -->

			<div class="rh_agent_card__listings">
				<p class="head"><?php ( 1 === $listed_properties ) ? esc_html_e( 'Listed Property', 'framework' ) : esc_html_e( 'Listed Properties', 'framework' ); ?></p>
				<!-- /.head -->
				<p class="count"><?php echo ( ! empty( $listed_properties ) ) ? esc_html( $listed_properties ) : 0; ?></p>
				<!-- /.count -->
			</div>
			<!-- /.rh_agent_card__listings -->

		</div>
		<!-- /.rh_agent_card__head -->

		<div class="rh_agent_card__details">

			<p class="content"><?php framework_excerpt( 45 ); ?></p>
			<!-- /.content -->

			<div class="rh_agent_card__contact">

				<div class="rh_agent_card__contact_wrap">
					<?php
					if ( ! empty( $agent_office_phone ) ) {
	                    ?><p class="contact office"><?php esc_html_e( 'Office', 'framework' ); ?>: <a href="tel:<?php echo esc_attr( $agent_office_phone ); ?>"><?php echo esc_html( $agent_office_phone ); ?></a></p><?php
	                }
	                if ( ! empty( $agent_mobile ) ) {
	                    ?><p class="contact mobile"><?php esc_html_e( 'Mobile', 'framework' ); ?>: <a href="tel:<?php echo esc_attr( $agent_mobile ); ?>"><?php echo esc_html( $agent_mobile ); ?></a></p><?php
	                }
	                if ( ! empty( $agent_office_fax ) ) {
	                    ?><p class="contact fax"><?php esc_html_e( 'Fax', 'framework' ); ?>: <a href="tel:<?php echo esc_attr( $agent_office_fax ); ?>"><?php echo esc_html( $agent_office_fax ); ?></a></p><?php
	                }
					if ( ! empty( $agent_whatsapp ) ) {
						?><p class="contact whatsapp"><?php esc_html_e( 'WhatsApp', 'framework' ); ?>: <a href="tel:<?php echo esc_attr( $agent_whatsapp ); ?>"><?php echo esc_html( $agent_whatsapp ); ?></a></p><?php
					}
					if ( ! empty( $agent_email ) ) {
	                    ?><p class="contact email"><?php esc_html_e( 'Email', 'framework' ); ?>: <a href="mailto:<?php echo esc_attr( antispambot( $agent_email ) ); ?>"><?php echo esc_html( antispambot( $agent_email ) ); ?></a></p><?php
	                }
					?>
				</div>
				<!-- /.rh_agent_card__contact_wrap -->
				<a href="<?php the_permalink(); ?>" class="rh_agent_card__link">
					<span><?php esc_html_e( 'View My Listings', 'framework' ); ?></span>
					<i class="fa fa-angle-right"></i>
				</a>
				<!-- /.rh_agent_card__link -->

			</div>
			<!-- /.rh_agent_card__contact -->

		</div>
		<!-- /.rh_agent_card__details -->

	</div>
	<!-- /.rh_agent_card__wrap -->

</article>
<!-- /.rh_agent_card -->
