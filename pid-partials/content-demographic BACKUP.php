<!--
  PIDHomes:: Render the Demographic contents
  @parameter $communityID

-->

<?php
global $language;

$post_ID = get_the_ID();
$communityID = get_query_var('community');
$post_type_qvar = get_query_var('post_type');
$community = trim(get_query_var('property-city')); //query var is passed from url rewriting 
$page_nbh = get_query_var('page1', 1); //args[]:: string $var, mixed $default = ''
$page_school = get_query_var('page2', 1);
//************ */

?>
<div>
  <div id="demographic" class="wrapper" uid="<?php echo isset($GEO_UID) ? $GEO_UID : 'GEO_UID'; ?>">
    <?php

    if ($community == 'gva') {
      // Get All Demographic Data
    ?>
      <h2 class="wpdt-c loadmore2 pid_community_h1"><?php echo __('Greater Vancouver Demographic Information', 'pidhomes'); ?></h2>
      <?php
      echo do_shortcode("[wpdatatable id=10]"); //population
      echo do_shortcode("[wpdatatable id=9]"); //education 
      echo do_shortcode("[wpdatatable id=18]"); //immigration
    } else {
      //get the guid for demographics
      $mysqli = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);
      $strSql = "SELECT GEO_UID, c.City_Code, c.City_Full_Name, c.City_Chinese_Name FROM wp_pid_census_subdivision_bc
                      INNER JOIN wp_pid_cities c ON c.City_Code = wp_pid_census_subdivision_bc.City_Code 
                      WHERE GEO_Name_nom = '" . $community . "'";
      // $mysqli->real_query($strSql);
      // $res = $mysqli->use_result();

      $res = $mysqli->query($strSql);
      if ($res->num_rows > 0) {
        while ($row = $res->fetch_assoc()) {

          $GEO_UID = $row['GEO_UID'];
          $City_Code = $row['City_Code'];
          $City_Full_Name = $row['City_Full_Name'];
          $City_Chinese_Name = $row['City_Chinese_Name'];
          $City_Full_Name = $language == 'en' ? $City_Full_Name : $City_Chinese_Name;
      ?>
          <h2 class="wpdt-c loadmore2"> <?php echo $City_Full_Name . __(' Demographic Information', 'pidhomes') ?> </h2>
    <?php
          echo do_shortcode("[wpdatatable id=6 var1='" . $City_Code . "']"); //population
          echo do_shortcode("[wpdatatable id=7 var1='" . $City_Code . "']"); //education & income
          echo do_shortcode("[wpdatatable id=17 var1='" . $City_Code . "']"); //immigration & minority
        };
      }
    }
    ?>
  </div>
</div>