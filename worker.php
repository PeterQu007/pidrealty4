<?php

//parse input from receiver.php
$postData = json_decode(file_get_contents('php://input'), true);
$postID = $postData['postID'];
//TODO: validate $postData.

// If data is valid, set below to 'OK' to accept the job
$acceptJob = 'OK'; //replace with an error message to reject the job
ob_start(); //start the buffer
echo $acceptJob; //this is what receiver.php will see
// set headers for the response to receiver.php
// header("Content-Encoding: none");
// header('Connection: close');
// header('Content-Length: ' . ob_get_length());
ob_end_flush();
ob_flush();
flush();

require_once("../../../../wp-load.php");
if (!function_exists('wp_crop_image')) {
  include(ABSPATH . 'wp-admin/includes/image.php');
}

/**
 * Snippet Name: Disable auto creating of image sizes
 * Snippet URL: http://www.wpcustoms.net/snippets/disable-auto-creating-image-sizes/
 */
function wpc_unset_imagesizes($sizes)
{
  unset($sizes['thumbnail']);
  unset($sizes['medium']);
  unset($sizes['medium_large']);
  unset($sizes['large']);
}
add_filter('intermediate_image_sizes_advanced', 'wpc_unset_imagesizes');

$filename = $postData["fileToUpload"]["name"];
$chart_params = json_decode(stripslashes($postData['chartParams']));
/* Location */
$location = wp_upload_dir()['path'] . "/$filename";
$uploadOk = 1;
$imageFileType = pathinfo($location, PATHINFO_EXTENSION);

/* Valid Extensions */
$valid_extensions = array("jpg", "jpeg", "png");
/* Check file extension */
if (!in_array(strtolower($imageFileType), $valid_extensions)) {
  $uploadOk = 0;
}

##################### START THE JOB HERE #####################
set_time_limit(60); //only needed if you expect job to last more than 30 secs

$attachment = array(
  'post_mime_type' => "image/$imageFileType",  // file type
  'post_title' => sanitize_file_name($filename),  // sanitize and use image name as file name
  'post_content' => '',  // could use the image description here as the content
  'post_status' => 'inherit'
);

// insert and return attachment id
$attachmentId = wp_insert_attachment($attachment, $location, $postID);

// insert and return attachment metadata
$attachmentData = wp_generate_attachment_metadata($attachmentId, $location);

// update and return attachment metadata
wp_update_attachment_metadata($attachmentId, $attachmentData);

// finally, associate attachment id to post id
$success = set_post_thumbnail($postID, $attachmentId);

// was featured image associated with post?
if ($success) {
  $message = $IMGFileName . ' has been added as featured image to post.';
} else {
  $message = $IMGFileName . ' has NOT been added as featured image to post.';
}
