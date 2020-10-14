<?php
require_once(dirname(dirname(__FILE__)) . '/pid-wp-db-config.php');

if (isset($_POST['areaCode'])) {
  $areaCode = $_POST['areaCode'];
} else {
  $areaCode = 'F20';
}
$mysqli = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);

$strSql = "SELECT ID, Subject_Address, Unit_No, City, Neighborhood FROM wp_pid_cma_subjects WHERE CMA_ACTION=1";
$mysqli->real_query($strSql);
$res = $mysqli->use_result();
$Subject_Properties = array();

while ($row = $res->fetch_assoc()) {
  array_push($Subject_Properties, $row);
}

echo json_encode($Subject_Properties);
