<?php 
$apiKey = "0zS0ftbUTfv7o1KOlBSoTgKbkYg1ft5u";
$apiSecret =  "DVCymhTIoHwLSxqBM9E8riDIxifCQCOS";
$host = 'https://api-cn.faceplusplus.com';

include_once 'FppClient.php';

use Fpp\FppClient;


$client = new FppClient($apiKey, $apiSecret, $host);

$data = array(
    'image_url' => "https://www.faceplusplus.com.cn/scripts/demoScript/images/demo-pic10.jpg",
    'return_landmark' => '2',
    'return_attributes' => 'age,headpose'
);

$resp = $client->detectFace($data);
var_dump($resp);
?>
