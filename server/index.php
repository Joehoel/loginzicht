<?php

// We'll be granting access to only the arunranga.com domain 
// which we think is safe to access this resource as application/xml

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
$data = json_decode(file_get_contents("php://input"));
var_dump($data);
