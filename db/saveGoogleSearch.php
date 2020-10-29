<?php
// http://localhost/pidrealty4/wp-content/themes/realhomes-child-3/db/saveGoogleSearch.php
// http://investment.pidhome.ca/wp-content/themes/investment/db/saveGoogleSearch.php

require_once(dirname(dirname(__FILE__)) . '/pid-wp-db-config.php');


if (isset($_POST["search"])) {
  $search = $_POST["search"];
  echo $_POST;
} else {
  $search = "How to strip html tags";
};

$add_category = false;

if (isset($_POST['category'])) {
  $category = trim($_POST['category']);
  // if $category match /+/, then add category to table: wp_pid_search_category
  $pres = preg_match("/([a-z0-9]+)\+$/i", $category, $matches);
  if ($pres == 1) {
    $category = $matches[1];
    $add_category = true;
  }
} else {
  $category = 'PHP';
}

$mysqli = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);

$time_stamp = date('Y/m/d/ h:i:s', time());

if ($add_category) {
  $mysqli2 = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);
  $strSql = "Select COUNT(*) FROM wp_pid_search_category WHERE Category = '{$category}'";
  $res = $mysqli2->query($strSql);
  while ($row = $res->fetch_array()) {
    if ($row[0] == 0) {
      $strSql = "INSERT INTO wp_pid_search_category (category) VALUES('{$category}')";
      $res = $mysqli2->query($strSql);
    }
  }
}

$strSql = "Select COUNT(*) FROM wp_pid_google_search WHERE Category = '{$category}' AND Search = '{$search}'";
$res = $mysqli->query($strSql);
while ($row = $res->fetch_array()) {
  if ($row[0] > 0) {
    $res->free();
    $mysqli = null;
    die('Record exists');
  }
}

$strSql = "INSERT INTO wp_pid_google_search (`search`, `category`, `time_stamp`) VALUES ('$search', '$category', '$time_stamp')";
$res = $mysqli->query($strSql);

if ($res) {
  echo 'Succeed insert into mySQL query';
} else {
  echo 'error in mySQL query';
}
