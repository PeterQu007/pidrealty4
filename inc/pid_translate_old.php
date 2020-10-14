<?php

/**
 * @version [.208030] LANGUAGE MODULE: 标题和标签的中英文转换
 * @param $lang: en, cn
 * @param $options[]: [location, property_type] OR 2 for simple translation
 * @return $lang_set[]: [titles, labels] in specific language
 */
// language translation function
if (!function_exists('pid_translate')) {
  function pid_translate($lang, $options)
  {

    if ($options === 2) {
      switch ($lang) {
        case 'cn':
          $lang_set = array(
            'all' => '所有类别&nbsp',
            'townhouse' => '联排别墅/城市屋&nbsp',
            'detached' => '别墅/独立屋&nbsp',
            'condo' => '公寓&nbsp',
            'groupbynbh' => '按照社区分组',
            'select_property_type' => '选择居住类别:&nbsp',
            'select_year' => '选择数据年份:&nbsp',
            'select_month' => '选择起始月份:&nbsp',
            'select_chart' => '选择图表类型:&nbsp',
            'chart_dollar' => '基准房屋价格',
            'chart_percentage' => '房价涨跌幅度%&nbsp',
            'section_more_charts' => '选择其他社区的房地产价格走势图表'
          );
          break;
        case 'hk':
          $lang_set = array(
            'all' => '所有类别&nbsp',
            'townhouse' => '联排别墅/城市屋&nbsp',
            'detached' => '别墅/独立屋&nbsp',
            'condo' => '公寓&nbsp',
            'groupbynbh' => '按照社区分组',
            'select_property_type' => '选择居住类别:&nbsp',
            'select_year' => '选择数据年份:&nbsp',
            'select_month' => '选择月份:&nbsp',
            'select_chart' => '选择图表类型:&nbsp',
            'chart_dollar' => '基准房屋价格',
            'chart_percentage' => '房价涨跌幅度%&nbsp',
            'section_more_charts' => '选择其他社区的房地产价格走势图表'
          );
          break;
        default: // english
          $lang_set = array(
            'all' => 'All Types&nbsp',
            'townhouse' => 'Townhouse&nbsp',
            'detached' => 'Single House&nbsp',
            'condo' => 'Apartment&nbsp',
            'groupbynbh' => 'By Hoods',
            'select_property_type' => 'Property Type:&nbsp',
            'select_year' => 'Years:&nbsp',
            'select_month' => 'Start Month:&nbsp',
            'select_chart' => 'Chart Type:&nbsp',
            'chart_dollar' => 'HPI Price $ $&nbsp',
            'chart_percentage' => 'HPI $ Change %&nbsp',
            'section_more_charts' => 'More Community Market Charts:'
          );
          break;
      }
      return $lang_set;
    }
    // Search Chinese City Name or other language
    $term = get_term_by('slug', $options['location'], 'property-city');
    $location2 = $term->name;
    switch ($lang) {
      case 'cn':
      case 'hk':
        //$city_chinese_name = get_field('chinese_title', get_queried_object());
        $city_chinese_name = get_field('chinese_title', 'property-city_' . $term->term_id);
        $location = $city_chinese_name == '' ? $term->name : $city_chinese_name;
        break;
      default:
        $location = $term->name;
        break;
    }

    $dwelling_type = "";
    switch ($lang) {
      case 'cn':
      case 'hk':
        switch ($options['property_type']) {
          case 'detached':
            $dwelling_type = "独立屋/别墅";
            break;
          case 'townhouse':
            $dwelling_type = "城市屋/联排别墅";
            break;
          case 'condo':
            $dwelling_type = "公寓";
            break;
          default:
            $dwelling_type = "";
            break;
        }
        break;
      default:
        switch ($options['property_type']) {
          case 'all':
            $dwelling_type = '';
            break;
          default:
            $dwelling_type = $options['property_type'];
            break;
        }
        break;
    }
    $dwelling_type = ucfirst($dwelling_type);

    switch ($lang) {
      case 'cn':
        $lang_set = array(
          'locale' => 'zh_CN',
          'title' => "{$location}房价走势 | Peter Qu | {$location}房地产经纪 | PIDHOMES.ca",
          'city' => "$location",
          'section_title' => "{$location}房地产{$dwelling_type}基准房价走势和市场报告",
          'section_content' => "[使用方法] 点击选择您感兴趣的城市, 显示该城市的所有社区列表, 继续点击需要查看房价走势的社区标签, 即可显示出该社区的过去两年的房价走势. 点击多个社区标签, 可以比较不同社区的房价走势. X按钮是复位按钮. 清除社区标签后, 可以重新开始选择需要了解的社区, 查看社区房价走势图. 比如说, 对{$location}的房价走势感兴趣, 则首先点击{$location2}, 然后选择社区在{$location2}板块下选择几个不同的社区, 即可比较这些社区的房价走势了.",
          'HPI_table_title' => "{$location}房地产本月基准房价",
          'this_month_label' => '[' . date('Y m') . ']',
          'active_listings_label' => "{$location}待售房源",
          'section_more_charts' => '选择其他社区的房地产价格走势图表'
        );
        break;
      case 'hk':
        $lang_set = array(
          'locale' => 'zh_HK',
          'title' => "{$location}房价走势 | Peter Qu | {$location}房地产经纪 | PIDHOMES.ca",
          'city' => '大温',
          'section_title' => "{$location}房地产{$dwelling_type}基准房价走势和市场报告",
          'section_content' => '[使用方法] 点击选择您感兴趣的城市, 显示该城市的所有社区列表, 继续点击需要查看房价走势的社区标签, 即可显示出该社区的过去两年的房价走势. 点击多个社区标签, 可以比较不同社区的房价走势. X按钮是复位按钮. 清除社区标签后, 可以重新开始选择需要了解的社区, 查看社区房价走势图. 比如说, 对素里的房价走势感兴趣, 则首先点击Surrey, 然后选择社区, 例如Fleetwood和Fraser Heights, 即可比较这两个社区的房价走势了. ',
          'HPI_table_title' => '大温房地产本月基准房价',
          'this_month_label' => '[' . date('Y m') . ']',
          'active_listings_label' => '待售房源',
          'section_more_charts' => '选择其他社区的房地产价格走势图表'
        );
        break;
      default:
        $lang_set = array(
          'locale' => 'en_US',
          'title' => "$location Housing Market Chart and Report | Peter Qu | $location REALTOR | PIDHOMES.ca",
          'city' => "$location",
          'section_title' => "$location Real Estate $dwelling_type HPI Home Price Chart",
          'section_content' => "[<strong>How</strong> to use] Select a Greater Vancouver City/District, the communities of the City will be display under the main panel. Select one or more communities to show or compare the HPI House Price Trend Line. Press X to reset and start over. For Example, if you want to check the $location Communities House Price Trend, first click $location Label, then you can select any community from the sub panel, and the Trend Line will be displayed according to your selection.",
          'HPI_table_title' => "$location Real Estate Monthly House HPI",
          'this_month_label' => '[' . date('F Y') . ']',
          'active_listings_label' => "$location Active Listings",
          'section_more_charts' => 'More Community Market Charts:'
        );
        break;
    }

    return $lang_set;
  }
}
