<?php

return [
    'client_id' => env('SMSTO_CLIENT_ID'),
    'client_secret' => env('SMSTO_CLIENT_SECRET'),
    'client_api_key' => env('SMSTO_CLIENT_API_KEY'),
    'username'=> env('SMSTO_EMAIL'),
    'password' => env('SMSTO_PASSWORD'),
    'scope' => '*',
    'sender_id' => env('SMSTO_SENDER_ID', 'SLOTMAIL'),
    'callback_url' => env('SMSTO_CALLBACK_URL'),
    'environment' => env('SMSTO_ENVIRONMENT'),
    'base_url' => env('SMSTO_BASE_URL', 'https://api.sms.to'),

    'smsto_limit' => env('SMSTO_LIMIT', 10),
    'smsto_time' => env('SMSTO_TIME', 5),

    'max_invites' =>  env('MAX_INVITES', 10),
];
