<?php
header('Accepts: image/*');
header('Content-Type: image/jpeg');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');

$input = file_get_contents("php://input");
$data = json_decode($input);
if ($data) {
  foreach ($data as $key => $value) {
    list($type, $value) = explode(';', $value);
    list(, $value)      = explode(',', $value);
    $value = base64_decode($value);

    file_put_contents('./images/Joel/2.jpg', $value);
  };
}
