<?php
// http://localhost/pidrealty4/wp-content/themes/realhomes-child-3/db/dbAddCMACriteria.php
if (isset($_POST["criteria_rules"])) {
  $criteria_rules = $_POST["criteria_rules"];
} else {
  $criteria_rules = array(
    array('item' => 'Sold', 'value' => '2020/02/03'),
    array('item' => 'Neighborhood', 'value' => 'F23')
  );
}

if (isset($_POST["cma_id"])) {
  $cma_id = $_POST["cma_id"];
} else {
  $cma_id = 43;
}

require_once(dirname(dirname(__FILE__)) . '/pid-wp-db-config.php');

$mysqli = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);
// Check connection
if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}

// Delete old cma data
$strSqlDeleteOldCMAData = "DELETE FROM wp_pid_cma_criteria WHERE cma_ID ='$cma_id'";
if ($mysqli->query($strSqlDeleteOldCMAData) === TRUE) {
  // echo "Record deleted successfully";
} else {
  echo "Error deleting record: " . $mysqli->error;
}
$thread = $mysqli->thread_id;
$mysqli->kill($thread);
$mysqli->close();

// PUSH cma criteria data to table wp_pid_cma_criteria
require_once('pdoConn.php');

$sql = "INSERT INTO " . PID_DB_NAME . ".wp_pid_cma_criteria
(
  item,
  value,
  cma_id
)
VALUES
(?,?,?)";

$stmt_insert_cma_criteria = $pdo->prepare($sql);
$names = '';

try {
  $pdo->beginTransaction();
  foreach ($criteria_rules as $criteria_rule) {
    $stmt_insert_cma_criteria->execute(
      array(
        $criteria_rule['item'],
        $criteria_rule['value'],
        $cma_id
      )
    );
    $names .= $criteria_rule['item'] . ',';
  }
  $pdo->commit();
} catch (Exception $e) {
  $pdo->rollback();
  echo '["PDO error"]';
  $stmt_insert_cma = null;
  $pdo = null;
  throw $e;
}
$stmt_insert_cma_criteria = null;
$names = "'" . rtrim($names, ",") . "'";

// try to sync the translation table
$mysqli = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);
if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}
$strSqlSearchTranslation = "SELECT `name`, `id` FROM wp_pid_cma_criteria_translation WHERE FIND_IN_SET(`name`, $names)";
$mysqli->real_query($strSqlSearchTranslation);
$res = $mysqli->use_result();
$names_array = [];
if ($res) {
  while ($row = $res->fetch_assoc()) {
    $names_array[] = $row['name'];
  }
}
// Delete old cma data
$sql2 = "INSERT INTO " . PID_DB_NAME . ".wp_pid_cma_criteria_translation
          (
            name
          )
          VALUES
          (?)";
$stmt_insert_cma_criteria_translation = $pdo->prepare($sql2);

try {
  $pdo->beginTransaction();
  foreach ($criteria_rules as $criteria_rule) {

    if (array_search($criteria_rule['item'], $names_array) !== false) {
      continue;
    }
    $stmt_insert_cma_criteria_translation->execute(
      array(
        $criteria_rule['item'],
      )
    );
  }
  $pdo->commit();
} catch (Exception $e) {
  $pdo->rollback();
  echo '["PDO error"]';
  $stmt_insert_cma = null;
  $pdo = null;
  throw $e;
}


$thread = $mysqli->thread_id;
$mysqli->kill($thread);
$mysqli->close();

$stmt_insert_cma_criteria_translation = null;
$pdo = null;

echo "DATA INSERTED OK";
