<?php
if (isset($_POST['cmaID'])) {
  $cma_id = $_POST["cmaID"];
} else {
  $cma_id = "36";
}

if (isset($_POST["address"])) {
  $address = $_POST["address"];
} else {
  $address = "7813 Garfield Dr";
}

if (isset($_POST["unitNo"])) {
  $unitNo = $_POST["unitNo"];
} else {
  $unitNo = "";
}
if (isset($_POST["age"])) {
  $age = $_POST["age"];
} else {
  $age = 35;
}

if (isset($_POST["landSize"])) {
  $landSize = $_POST["landSize"];
} else {
  $landSize = "10000";
}

if (isset($_POST["floorArea"])) {
  $floorArea = $_POST["floorArea"];
} else {
  $floorArea = "4000";
}

if (isset($_POST["bcAssessImprove"])) {
  $bcAssessImprove = $_POST["bcAssessImprove"];
} else {
  $bcAssessImprove = 1200000;
}

if (isset($_POST["bcAssessLand"])) {
  $bcAssessLand = $_POST["bcAssessLand"];
} else {
  $bcAssessLand = 1300000;
}

if (isset($_POST["bcAssessTotal"])) {
  $bcAssessTotal = $_POST["bcAssessTotal"];
} else {
  $bcAssessTotal = 2500000;
}

if (isset($_POST["subjectHouseType"])) {
  $subjectHouseType = $_POST["subjectHouseType"];
} else {
  $subjectHouseType = "Detached";
}

if (isset($_POST["maintenanceFee"])) {
  $maintenanceFee = $_POST["maintenanceFee"];
} else {
  $maintenanceFee = 200;
}

if (isset($_POST["city"])) {
  $city = $_POST["city"];
} else {
  $city = "Surrey";
}

if (isset($_POST["neighborhood"])) {
  $neighborhood = $_POST["neighborhood"];
} else {
  $neighborhood = "Guildford";
}

if (isset($_POST["listPrice"])) {
  $listPrice = $_POST["listPrice"];
} else {
  $listPrice = 900000;
}

if (isset($_POST["soldPrice"])) {
  $soldPrice = $_POST["soldPrice"];
} else {
  $soldPrice = 950000;
}

if (isset($_POST["bcaChange"])) {
  $bcaChange = $_POST["bcaChange"];
} else {
  $bcaChange = 0.05;
}

if (isset($_POST["updateSubject"])) {
  $updateSubject = $_POST["updateSubject"];
} else {
  $updateSubject = false;
}


$data = [
  'Subject_Address' => $address,
  'Unit_No' => $unitNo,
  'Age' => $age,
  'Land_Size' => (int)$landSize,
  'Floor_Area' => $floorArea,
  'BC_Assess_Land' => $bcAssessLand,
  'BC_Assess_Improve' => $bcAssessImprove,
  'BC_Assess_Total' => $bcAssessTotal,
  'Subject_Property_Type' => $subjectHouseType,
  'Maintenance_Fee' => $maintenanceFee,
  'City' => $city,
  'Neighborhood' => $neighborhood,
  'CMA_Action' => 1,
  'List_Price' => $listPrice,
  'Sold_Price' => $soldPrice,
  'BC_Assess_Change' => $bcaChange
];

print_r($data);

require_once(dirname(dirname(__FILE__)) . '/pid-wp-db-config.php');

$mysqli = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);

if ($updateSubject) {
  update_array($data, 'wp_pid_cma_subjects', $mysqli, " where id=$cma_id");
} else {
  store_array($data, 'wp_pid_cma_subjects', $mysqli);
}
$thread = $mysqli->thread_id;
$mysqli->kill($thread);
$mysqli->close();

function store_array(&$data, $table, $mysqli)
{
  $cols = implode(',', array_keys($data));
  foreach (array_values($data) as $value) {
    isset($vals) ? $vals .= ',' : $vals = '';
    $vals .= '\'' . $mysqli->real_escape_string($value) . '\'';
  }
  try {
    $mysqli->real_query('INSERT INTO ' . $table . ' (' . $cols . ') VALUES (' . $vals . ')');
  } catch (mysqli_sql_exception $e) {
    echo "Error Code <br>" . $e->getCode();
    echo "Error Message <br>" . $e->getMessage();
    echo "Strack Trace <br>" . nl2br($e->getTraceAsString());
  }
}

function update_array(&$data, $table, $mysqli, $where)
{
  // $cols = implode(',', array_keys($data));
  foreach (array_keys($data) as $key) {
    isset($sets) ? $sets .= ',' : $sets = 'set ';
    $sets .= "$key='" . $mysqli->real_escape_string($data[$key]) . '\'';
  }
  try {
    $mysqli->real_query("UPDATE $table $sets $where");
  } catch (mysqli_sql_exception $e) {
    echo "Error Code <br>" . $e->getCode();
    echo "Error Message <br>" . $e->getMessage();
    echo "Strack Trace <br>" . nl2br($e->getTraceAsString());
  }
}
