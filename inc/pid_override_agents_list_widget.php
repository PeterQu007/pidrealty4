<?php

/**
 * @version [.200830] OVERRIDE REAL HOMES AGENTS_LIST_WIDGET
 * @var OVERRIDE
 */
if (!class_exists('Agents_List_Widget')) {

  /**
   * Class: Widget class for Agents List
   */
  class Agents_List_Widget extends WP_Widget
  {

    /**
     * Method: Constructor
     */
    function __construct()
    {
      $widget_ops = array(
        'classname'                   => 'agents_list_widget',
        'description'                 => esc_html__('This widget displays agents list.', 'easy-real-estate'),
        'customize_selective_refresh' => true,
      );
      parent::__construct('Agents_List_Widget', esc_html__('RealHomes - Agents', 'easy-real-estate'), $widget_ops);
    }

    /**
     * Method: Widget's Display
     */
    function widget($args, $instance)
    {

      // PIDHomes: remove title
      /**
       * @version [.200830] CHANGE THE AGENT CARD WIDGET TITLE
       */
      // ORIGINAL title:
      // $title = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__('Agents', 'easy-real-estate' );

      global $language;
      $title = $language == "cn" ? '专、诚、勤房地产经纪:' : 'PID REALTOR';

      /** This filter is documented in wp-includes/widgets/class-wp-widget-pages.php */
      $title = apply_filters('widget_title', $title, $instance, $this->id_base);

      $agent_args = array(
        'post_type'      => 'agent',
        'posts_per_page' => !empty($instance['count']) ? intval($instance['count']) : 3
      );

      wp_reset_query();
      wp_reset_postdata();

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
      try {
        // COMPLETELY BYPASS ORGINAL WP_Query CLASS, IGNORE THE ERROR LINE
        // line 1797: 	do_action_ref_array('pre_get_posts', array(&$this));
        // CHANGE 1797 TO : @do_action_ref_array('pre_get_posts', array(&$this));
        $agents_query = new PID_WP_Query(apply_filters('ere_agents_widget', $agent_args));
        echo $args['before_widget'];

        if ($title) {
          echo $args['before_title'] . $title . $args['after_title'];
        }

        if ($agents_query->have_posts()) : ?>
          <div class="agents-list-widget">
            <?php
            while ($agents_query->have_posts()) : $agents_query->the_post(); ?>
              <article class="agent-list-item clearfix">
                <?php if (has_post_thumbnail()) : ?>
                  <figure class="agent-thumbnail">
                    <a title="<?php the_title(); ?>" href="<?php the_permalink(); ?>">
                      <?php the_post_thumbnail('agent-image'); ?>
                    </a>
                  </figure>
                <?php endif; ?>
                <?php
                $pid_pro = $language == "cn" ? "专业 Professionalism" : "Professionalism";
                $pid_int = $language == "cn" ? "诚信 Diligence" : "Integrity";
                $pid_dil = $language == "cn" ? "勤勉 Diligence" : "Diligence";
                $pid_cn_class = $language == "cn" ? "pid_cn_class" : "";
                ?>
                <div class="agent-widget-content <?php echo has_post_thumbnail() ? '' : esc_attr('no-agent-thumbnail'); ?>">
                  <?php
                  if ($language == 'cn') {
                  ?>
                    <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap" rel="stylesheet">
                  <?php
                  }
                  ?>
                  <h4 class="agent-name"><a href="<?php the_permalink(); ?>"><strong class="<?php echo $pid_cn_class; ?>"><?php the_title(); ?></strong></a>
                  </h4>
                  <h3 id='pid_pro' style='color: #B22025; margin: 1px'><?php echo $pid_pro; ?></h3>
                  <h3 id='pid_int' style='color: #B22025; margin: 1px'><?php echo $pid_int; ?></h3>
                  <h3 id='pid_dil' style='color: #B22025; margin: 1px'><?php echo $pid_dil; ?></h3>
                  <hr style='height:2px;border-width:0;color:gray;background-color:gray;padding: 0, 3px' />
                  <?php
                  $agent_contact_number = null;
                  $agent_email          = get_post_meta(get_the_ID(), 'REAL_HOMES_agent_email', true);
                  $agent_mobile_number  = get_post_meta(get_the_ID(), 'REAL_HOMES_mobile_number', true);
                  $agent_office_number  = get_post_meta(get_the_ID(), 'REAL_HOMES_office_number', true);

                  if (!empty($agent_mobile_number)) {
                    $agent_contact_number = $agent_mobile_number;
                  } elseif (!empty($agent_office_number)) {
                    $agent_contact_number = $agent_office_number;
                  }

                  if (is_email($agent_email)) : ?>
                    <a class="agent-contact-email" href="mailto:<?php echo antispambot($agent_email); ?>"><?php echo antispambot($agent_email); ?></a>
                  <?php endif;

                  if (!empty($agent_contact_number)) : ?>
                    <div class="agent-contact-number">
                      <a href="tel://<?php echo esc_url($agent_contact_number); ?>"><?php echo esc_html($agent_contact_number); ?></a>
                    </div>
                  <?php endif; ?>
                </div>
              </article>
            <?php endwhile; ?>
          </div>
        <?php
          wp_reset_postdata();
        else :
        ?>
          <div class="agents-list-widget">
            <article class="agent-list-item">
              <?php echo '<h4>' . esc_html__('No Agent Found!', 'easy-real-estate') . '</h4>'; ?>
            </article>
          </div>
      <?php
        endif;

        echo $args['after_widget'];
      } catch (\Exception $e) {
        $error = $e;
      }

      restore_error_handler();
    }

    /**
     * Method: Update Widget Options
     */
    function form($instance)
    {
      $instance = wp_parse_args(
        (array) $instance,
        array(
          'title' => esc_html__('Agents', 'easy-real-estate'),
          'count' => 3
        )
      );

      $title = sanitize_text_field($instance['title']);
      $count = $instance['count'];
      ?>
      <p>
        <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php esc_html_e('Widget Title', 'easy-real-estate'); ?></label>
        <input class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" type="text" value="<?php echo esc_attr($title); ?>" />
      </p>
      <p>
        <label for="<?php echo esc_attr($this->get_field_id('count')); ?>"><?php esc_html_e('Number of Agents', 'easy-real-estate'); ?></label>
        <input id="<?php echo esc_attr($this->get_field_id('count')); ?>" name="<?php echo esc_attr($this->get_field_name('count')); ?>" type="text" value="<?php echo esc_attr($count); ?>" size="3" />
      </p>
<?php
    }

    /**
     * Method: Update Widget Options
     */
    function update($new_instance, $old_instance)
    {
      $instance          = $old_instance;
      $instance['title'] = sanitize_text_field($new_instance['title']);
      $instance['count'] = $new_instance['count'];

      return $instance;
    }
  }
}
