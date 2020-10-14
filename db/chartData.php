
<?php

// http://localhost/pidrealty4/wp-content/themes/realhomes-child-3/db/chartData.php

require_once(dirname(dirname(__FILE__)) . '/pid-wp-db-config.php');

if (isset($_GET["Neighborhood_IDs"])) {
  $Neighborhood_IDs = $_GET["Neighborhood_IDs"];
  // echo $title;
  // echo " is your tab title";
  // echo $Neighborhood_ID;
} else {
  $Neighborhood_IDs = 'VBU, VBN, VBS, VBE';
  //echo "<p>no Neighborhood_ID supplied</p>";
}

if (isset($_GET["Years"])) {
  $Years = json_decode($_GET["Years"]);
} else {
  $Years = [2019, 2020];
}

if (isset($_GET["Month"])) {
  $Month = json_decode($_GET["Month"]);
} else {
  $Month = 1;
}

if (isset($_GET["Property_Types"])) {
  $Property_Types = $_GET["Property_Types"];
  // echo $title;
  // echo " is your tab title";
  // echo $Neighborhood_ID;
} else {
  $Property_Types = 'All, Detached, Townhouse, Apartment';
  //echo "<p>no Neighborhood_ID supplied</p>";
}

if (isset($_GET["Start_Date"])) {
  $Start_Date = $_GET["Start_Date"];
  // echo $title;
  // echo " is your tab title";
  // echo $Neighborhood_ID;
} else {
  $Start_Date = join('-', [$Years[0], $Month, '01']);
  //echo "<p>no Neighborhood_ID supplied</p>";
}

// Get Config Settings: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
$mysqli = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);
// $mysqli = new mysqli('localhost', 'root', '', 'pidrealty');
// include "dbConn.php";

$return_arr = array();

// $strSql = "SELECT `Date`, HPI FROM pid_market WHERE Neighborhood_ID='" . $Neighborhood_ID . "' AND Date >= '2017-01-01'";
// create Neighborhood_ID string
$nbr_ids = explode(",", $Neighborhood_IDs);
$nbr_string = "";
$pt_types = explode(",", $Property_Types);
$pt_string = "";

$chartDataSets = [];

foreach ($nbr_ids as $nbr_id) {
  $nbr_string .= "'" . trim($nbr_id) . "',"; //query string for nbr codes
};

foreach ($pt_types as $pt_type) {
  $pt_string .= "'" . trim($pt_type) . "',"; //query string for property types
  foreach ($nbr_ids as $nbr_id) {
    $chartDataSets[] = array(
      'property_Type' => trim($pt_type),
      'nbr_ID' => trim($nbr_id),
      'nbr_Data' => []
    );
  }
}
$nbr_string = rtrim($nbr_string, ",");
$pt_string = rtrim($pt_string, ",");
$wherein_years = '"' . implode('","', $Years) . '"';
// echo $nbr_string;
// echo $pt_string;
// var_dump( $chartDataSets);
// echo '<hr/>';

$strSql = "SELECT `Date`, Property_Type, Neighborhood_ID, HPI FROM wp_pid_market 
           WHERE Neighborhood_ID IN (" . $nbr_string . ") 
           AND 
           Property_Type IN(" . $pt_string . ")
           AND 
           Year IN (" . $wherein_years . ") 
           AND
           `Date` >= '$Start_Date' 
           AND HPI > 0";
//echo $strSql . "<br/>";

$mysqli->real_query($strSql);
$res = $mysqli->use_result();

while ($row = $res->fetch_assoc()) {
  $xDate = $row['Date'];
  // echo $xDate;
  $xValue = $row['HPI'];
  // echo $xValue;
  $xID = trim($row['Neighborhood_ID']);
  // echo $xID . "<br/>";
  $xProperty_Type = trim($row['Property_Type']);

  foreach ($chartDataSets as &$chartDataSet) {
    // echo $chartDataSet['nbr_ID'] . "<br/>";
    if ($xID == trim($chartDataSet['nbr_ID']) and $xProperty_Type == trim($chartDataSet['property_Type'])) {
      // echo "right ID<br/>";
      // array_push($return_arr, array(
      // 'x' => $xDate,
      // 'y' => (int)$xValue
      // ));
      array_push($chartDataSet['nbr_Data'], array(
        'x' => $xDate,
        'y' => (int) $xValue
      ));
      // var_dump($chartDataSet['nbr_Data']);
    } else {
      // echo "wrong ID<br/>";
    }
  }

  // $return_arr[]=array(
  //   'x' => $xdate,
  //   'y' => (int)$xvalue
  // );
  // var_dump($return_arr);
}

// var_dump($chartDataSets);
// print_r($chartDataSets);

// while ($row = $res->fetch_array(MYSQLI_ASSOC)){
//   print_r($row);
//   echo '<br/>' ;
//   echo $row['HPI'] . '<br/>' ;
// }

// var_dump($return_arr);
//print_r($return_arr);
// echo json_encode($return_arr);
$return_arr = json_encode($chartDataSets);
echo $return_arr;
// echo '<br/>';
// echo '<hr/>';
// var_dump($return_arr[0]); $return_arr is a string now!
// echo json_encode(array("x"=>$Neighborhood_ID));
