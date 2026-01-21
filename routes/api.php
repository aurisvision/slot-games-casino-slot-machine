<?php

use Illuminate\Support\Facades\Route;
use VanguardLTE\Http\Controllers\Api\V2\AtmController;

Route::group(['middleware' => ['ipcheck']], function () {
	Route::post('login', 'Auth\AuthController@login');	
});	
Route::post('logout', 'Auth\AuthController@logout');
Route::post('gamelist', 'Games\GamesController@gamelist');
Route::post('info', 'Jackpots\JackpotsController@jackpot_status');
Route::post('changePassword', 'Users\UsersController@changePassword');
Route::post('reward', 'Users\UsersController@getReward');
Route::post('signup', 'Users\UsersController@player_store');