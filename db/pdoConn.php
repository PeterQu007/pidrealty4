<?php
require_once(dirname(dirname(__FILE__)) . '/pid-wp-db-config.php');

$host = PID_DB_HOST;
$db   = PID_DB_NAME;
$user = PID_DB_USER;
$pass = PID_DB_PASSWORD;
$charset = 'utf8mb4';

$options = [
     \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
     \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
     \PDO::ATTR_EMULATE_PREPARES   => false,
];
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
try {
     $pdo = new \PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
     throw new \PDOException($e->getMessage(), (int)$e->getCode());
}
//  $stmt = $pdo->query("SELECT * FROM view_check_term_level WHERE term_id=89")    ;
//  $level = $stmt->fetch();
//  var_dump($level);

// TEST para bind
// $qvar = 'surrey-1';
// $stmt_check_term_level = $pdo->prepare("SELECT term_id, slug, lvl level FROM view_check_term_level WHERE slug = :slug");
// $stmt_check_term_level->bindParam(':slug', $qvar , PDO::PARAM_STR);
// $stmt_check_term_level->execute();
// $level = $stmt_check_term_level->fetch();
// var_dump($level);
// $stmt_check_term_level = null;
// $pdo = null;

//Call procedure
// $qvar = 'surrey-1';
// $stmt_check_term_level = $pdo->prepare("CALL procedure_term_single_path_by_slug(?)");
// $stmt_check_term_level->bindParam(1, $qvar , PDO::PARAM_STR);
// $stmt_check_term_level->execute();
// $level = $stmt_check_term_level->fetch();
// var_dump($level);
// $level = $stmt_check_term_level->fetch();
// var_dump($level);
// $stmt_check_term_level = null;
// $pdo = null;

//Call procedure
// $qvar = 89;
// $stmt_check_term_level = $pdo->prepare("CALL procedure_term_single_path_by_term_id(?)");
// $stmt_check_term_level->bindParam(1, $qvar , PDO::PARAM_INT);
// $stmt_check_term_level->execute();
// $level = $stmt_check_term_level->fetch();
// var_dump($level);
// $level = $stmt_check_term_level->fetch();
// var_dump($level);
// $stmt_check_term_level = null;
// $pdo = null;
