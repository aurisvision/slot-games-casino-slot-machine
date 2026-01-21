<?php

  return [
    /*
    * @required: true
    * Create an acount and het Api Key on this site https://www.coinpayments.net
    */
    'public_key' => env('COIN_PAYMENT_PUBLIC_KEY', '5bbc98b8c8403791715809fb77e4ed0e64e46b1bc141c86a49c5276aa0cffe69'),
    'private_key' => env('COIN_PAYMENT_PRIVATE_KEY', '525a4B4D6dE14063d965e3E172647E8d0a8Ab16eDcE192743cf2dB01cd927339'),

    /*
    * IPN Configuration
    */
    'coinpayment_merchant_id' => env('COIN_PAYMENT_MARCHANT_ID', '3ea57eec46e9dcebcaf417c418b33fac'),
    'coinpayment_ipn_secret' => env('COIN_PAYMENT_IPN_SECRET', 'SFYA3VY6T2B0WVE8UWLNM15U0TC6WT0K6PJUN10G07NDF4XLCH'),
    'coinpayment_ipn_debug_email' => env('COIN_PAYMENT_IPN_DEBIG_EMAIL', 'test@ya.ru'),

	'add_min' => env('MIN_ADD'),
	'add_max' => env('MAX_ADD'),

    /*
    * Supported currencies
    * @currecies : USD, CAD, EUR, ARS, AUD, AZN, BGN, BRL, BYN, CHF, CLP, CNY, COP, CZK
    * DKK, GBP, GIP, HKD, HUF, IDR, ILS, INR, IRR, IRT, ISK, JPY, KRW, LAK, MKD, MXN, ZAR,
    * MYR, NGN, NOK, NZD, PEN, PHP, PKR, PLN, RON, RUB, SEK, SGD, THB, TRY, TWD, UAH, VND,
    */

    'default_currency' => 'USD',

    /*
    * Header config
    */
    'header_type' => 'logo', // @option-value: logo|text
      'header_logo' => '/coinpayment.logo.png', // this is a Path Assets file
      'header_text' => 'Your Payment Summary',

    /*
    * menu in histori transaction page
    */
    'menus' => [
      'Home' => [
        'url' => '/', // only link path
        'class_icon' => 'fa fa-home'
      ],
      // 'Foo' => [
      //   'url' => '/foo',
      //   'class_icon' => 'fa fa-home'
      // ]
    ]
  ];
