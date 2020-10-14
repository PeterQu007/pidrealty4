
<?php
/********************

 */
error_reporting(E_ALL);
ini_set('display_errors', 1);
$url = (isset($_GET['url'])) ? $_GET['url'] : false;
$lang = (isset($_GET['lang'])) ? $_GET['lang'] : 'E';
$dguid = (isset($_GET['dguid'])) ? $_GET['dguid'] : '2016A00055915025' /* Burnaby */;
if (isset($_GET['city_code'])) {
    $city_code = $_GET['City_Code'];
} else {
    $mysqli = new mysqli("localhost", "root", "root", "local");
    $sql_query = "SELECT City_Code FROM wp_pid_census_subdivision_bc WHERE GEO_UID='" . $dguid . "'";
    $mysqli->real_query($sql_query);
    $result = $mysqli->use_result();
    $city_code = $result->fetch_assoc()['City_Code'];
    $thread = $mysqli->thread_id;
    $mysqli->kill($thread);
    $mysqli->close();
}
$topic = (isset($_GET['topic'])) ? $_GET['topic'] : 0;
$referer_test = true;

// https://pidrealty.local/wp-content/themes/pidhomes-phaseI/db/demographicsData.php

$mysqli = new mysqli("localhost", "root", "root", "local");
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$sql_query = "SELECT p.*, c.City_Name FROM wp_pid_population p 
              INNER JOIN pid_cities c ON p.City_Code = c.City_Code
              ";
// -- WHERE p.City_Code='" . $city_code . "'";
printf($sql_query);
$mysqli->real_query($sql_query);
$res = $mysqli->use_result();
while ($row = $res->fetch_assoc()) {
    var_dump($row);
};

// echo $json;