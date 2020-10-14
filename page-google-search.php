<?php
// echo "google search";

require_once(get_stylesheet_directory() . '/pid-wp-db-config.php');

// get the category records
$mysqli = new mysqli(PID_DB_HOST, PID_DB_USER, PID_DB_PASSWORD, PID_DB_NAME);
$sql = "Select Category, Search From wp_pid_google_search";
$res = $mysqli->query($sql);
$categories = [];
$searches = [];
while ($row = $res->fetch_assoc()) {
  $searches[$row['Category']][] = $row['Search'];
}
ksort($searches);

$res->free();
$mysqli = null;
$categories = array_keys($searches);

get_header();
?>
<div>
  <?php
  // var_dump($searches);
  foreach ($categories as $cat) {
  ?>
    <details>
      <summary><?php echo $cat; ?> </summary>
      <?php
      $questions = $searches[$cat];
      foreach ($questions as $q) {
        $question = $q;
        $query = str_replace(" ", "+", $question);
        $google_search_link = "https://www.google.com/search?q=" . $query;
      ?>
        <div class="content">
          <a href=<?php echo $google_search_link; ?> target="#"><?php echo $q; ?></a>
        </div>
      <?php
      }
      ?>
    </details>
  <?php
  }
  ?>
</div>
<?php
get_footer();
