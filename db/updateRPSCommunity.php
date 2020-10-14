<?php
// my ajax call uri:
// http://localhost/pidrealty4/wp-content/themes/realhomes-child-3/db/updateRPSCommunity.php

if (isset($_POST["listingInfo"])) {
  $listings = json_decode($_POST["listingInfo"]);
  // echo 'try to update listing community and neighborhood';
} else {
  // $cmaData = array([
  // 'MLS' => 'R2476903',
  // 'Status' => 'A',
  // 'SubArea' => 'Guildford',
  // 'Price0' => '$380,000',
  // 'PrcSqft' => '394.19',
  // 'ListDate' => '7/16/2020',
  // 'CDOM' => '4',
  // 'Complex' => 'Lincolns Gate',
  // 'TotBR' => 2,
  // 'TotBath' => 2,
  // 'FlArTotFin' => '1006',
  // 'Age' => '40',
  // 'StratMtFee' => '273.12',
  // 'TypeDwel' => 'Townhouse',
  // 'LotSz' => 0,
  // 'LandValue' => '$298,000',
  // 'ImproveValue' => '$20,600',
  // 'BCAValue' => '$318,600',
  // 'ChangePercentage' => '19%',
  // 'PlanNum' => 'NWS1581',
  // 'Address2' => '10620 150 ST',
  // 'UnitNo' => '#1014',
  // 'City' => 'Surrey',
  // 'ListPrice' => '$380,000',
  // 'SP_Sqft' => '0',
  // 'YrBlt' => '1980',
  // 'TotFlArea' => '1006',
  // 'cma_ID' => 999
  // ]);

  $listings = array(array(
    'no' => 1,
    'mlsNo' => 'R2406875',
    'neighborhood' => 'Guildford',
    'communityName' => 'North Surrey',
    9999999
  ));
  $listingID = 9999999;
}


if (!function_exists('loop_multi')) {
  function loop_multi($result)
  {
    //use the global variable $conn in this function
    global $conn;
    //an array to store results and return at the end
    $returned = array("result" => array(), "error" => array());
    //if first query doesn't return errors
    if ($result) {
      //store results of first query in the $returned array
      $returned["result"][0] = mysqli_store_result($conn);
      //set a variable to loop and assign following results to the $returned array properly
      $count = 0;
      // start doing and keep trying until the while condition below is not met
      do {
        //increase the loop count by one
        $count++;
        //go to the next result
        mysqli_next_result($conn);
        //get mysqli stored result for this query
        $result = mysqli_store_result($conn);
        //if this query in the loop doesn't return errors
        if ($result) {
          //store results of this query in the $returned array
          $returned["result"][$count] = $result;
          //if this query in the loop returns errors
        } else {
          //store errors of this query in the $returned array
          $returned["error"][$count] = mysqli_error($conn);
        }
      }
      // stop if this is false
      while (mysqli_more_results($conn));
    } else {
      //if first query returns errors
      $returned["error"][0] = mysqli_error($conn);
    }
    //return the $returned array
    return $returned;
  }
}

require_once('../pid-wp-db-config.php');
$conn = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
//

$strSql = '';
$i = 1;
foreach ($listings as $listing) {
  try {
    $community_name = $listing->communityName; // Sub Area Column of paragon
    $neighborhood = $listing->neighborhood; // AREA column of paragon
    $listingID = $listing->mlsNo; // mls# of paragon
  } catch (\Exception $e) {
    break;
  }
  $i++;
  if ($community_name && $neighborhood && $listingID) {
    $strSql .= "UPDATE wp_rps_property SET CommunityName = '$community_name', Neighbourhood = '$neighborhood' WHERE DdfListingID='$listingID';";
  }
}

$res = mysqli_multi_query($conn, $strSql);
$outputs = loop_multi($res);

$res = $outputs['result'][0];
if ($res) {
  while ($row = $res->fetch_assoc()) {
  }
}


// Clear DB Connection
$thread = $conn->thread_id;
$conn->kill($thread);
$conn->close();
echo 'update done';

// unset($conn); //sometimes, mysqli gives lots of warnings
