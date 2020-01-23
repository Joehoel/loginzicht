<?php
$url =
  'http://localhost:8000/images/joel/1.jpg';

$img = 'logo.jpg';

// Function to write image into file 
file_put_contents($img, file_get_contents($url));

echo "File downloaded!";
