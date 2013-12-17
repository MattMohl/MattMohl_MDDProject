<?php

// require('twilio-php-latest/Services/Twilio.php');

$results = file_get_contents('http://api.remix.bestbuy.com/v1/products/2878503.json?apiKey=kqwq2utctj7tpjur4jgq36k2');
$json = json_decode($results);

var_dump($json);

if($json) {
	$account_sid = 'AC85ba637a17ab68c168436bd96589523b';
	$auth_token = 'f599886545d6a914cdf53af5d9b6c5bb';
	$client = new Services_Twilio($account_sid, $auth_token);
	 
	$client->account->messages->create(array( 
		'To' => "4405063052", 
		'From' => "+13303917511", 
		'Body' => "test message",   
	));
}

?>
