<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Piastrix
    |--------------------------------------------------------------------------    
    */

    'piastrix' => [
        'id' => '',
		'key' => ''
    ],
	
    'interkassa' => [
        'fields' => ['shop_id', 'token'],
        'required' => ['shop_id', 'token'],
        'id' => '',
        'token' => ''
    ],

    'coinbase' => [
        'fields' => ['api_key', 'webhook_key'],
        'required' => ['api_key', 'webhook_key'],
        'api_key' => '',
        'webhook_key' => ''
    ],

    'btcpayserver' => [
        'fields' => ['server', 'store_id', 'api_token'],
        'required' => ['server', 'store_id', 'api_token'],
        'server' => '',
        'user' => '',
        'password' => '',
        'token' => '',
        'user_token' => '',
        'store_id' => ''
    ]

];
