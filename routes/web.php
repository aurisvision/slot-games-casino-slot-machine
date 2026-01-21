<?php

use Illuminate\Support\Facades\Route;								 
Route::namespace('Frontend')->middleware(['siteisclosed', 'checker'])->group(function () {
// Route::domain('www.'.config('app.domain'))->namespace('Frontend')->middleware(['siteisclosed', 'checker'])->group(function () {

    Route::get('login', [
        'as' => 'frontend.auth.login',
        'uses' => 'Auth\AuthController@getLogin'
    ]);

    Route::get('launcher/{game}/{token}','Auth\AuthController@apiLogin' );

    Route::get('refresh-csrf', function(){
        return csrf_token();
    });

    Route::post('login', [
        'as' => 'frontend.auth.login.post',
        'uses' => 'Auth\AuthController@postLogin'
    ]);

    Route::post('signup', [
        'as' => 'frontend.auth.signup.post',
        'uses' => 'Auth\AuthController@postSignup'
    ]);
    
    Route::get('logout', [
        'as' => 'frontend.auth.logout',
        'uses' => 'Auth\AuthController@getLogout'
    ]);

    Route::get('/specauth/{user}', [
        'as' => 'frontend.user.specauth',
        'uses' => 'Auth\AuthController@specauth',
    ]);

    // Allow registration routes only if registration is enabled.

    //if (settings('reg_enabled') || true) {

        Route::get('register', [
            'as' => 'frontend.register',
            'uses' => 'Auth\AuthController@getRegister'
        ]);

        Route::post('register', [
            'as' => 'frontend.register.post',
            'uses' => 'Auth\AuthController@postRegister'
        ]);



    //}

    Route::get('register/confirmation/{token}', [
        'as' => 'frontend.register.confirm-email',
        'uses' => 'Auth\AuthController@confirmEmail'
    ]);

    Route::get('password/change', [
        'as' => 'frontend.password.change',
        'uses' => 'Auth\PasswordController@changePassword'
    ]);

    Route::get('deleteuser', [
        'as' => 'frontend.user.delete',
        'uses' => 'Auth\PasswordController@deleteUser'
    ]);

    /*
        if (settings('forgot_password')) {

            Route::get('password/remind', [
                'as' => 'frontend.password.remind',
                'uses' => 'Auth\PasswordController@forgotPassword'
            ]);
            Route::post('password/remind', [
                'as' => 'frontend.password.remind.post',
                'uses' => 'Auth\PasswordController@sendPasswordReminder'
            ]);
            Route::get('password/reset/{token}', [
                'as' => 'frontend.password.reset',
                'uses' => 'Auth\PasswordController@getReset'
            ]);
            Route::post('password/reset', [
                'as' => 'frontend.password.reset.post',
                'uses' => 'Auth\PasswordController@postReset'
            ]);
        }
        */


    Route::get('new-license', [
        'as' => 'frontend.new_license',
        'uses' => 'PagesController@new_license'
    ]);

    Route::get('empty', [
        'as' => 'frontend.empty',
        'uses' => 'PagesController@empty'
    ]);

    Route::post('new-license', [
        'as' => 'frontend.new_license.post',
        'uses' => 'PagesController@new_license_post'
    ]);

    Route::get('license-error', [
        'as' => 'frontend.page.error_license',
        'uses' => 'PagesController@error_license'
    ]);

    Route::get('jpstv/{id?}', [
        'as' => 'frontend.jpstv',
        'uses' => 'PagesController@jpstv'
    ]);

    Route::get('jpstv.json', [
        'as' => 'frontend.jpstv_json',
        'uses' => 'PagesController@jpstv_json'
    ]);

    Route::get('collect_bonus', [
        'as' => 'frontend.collect_bonus',
        'uses' => 'PagesController@collect_bonus'
    ]);

    /**
     * Dashboard
     */

    /*
	Route::get('statistics', [
        'as' => 'frontend.statistics',
        'uses' => 'DashboardController@statistics'
    ]);
    */
    Route::get('subsession', [
        'as' => 'frontend.subsession',
        'uses' => 'GamesController@subsession'
    ]);

    /**
     * User Profile
     */

    Route::get('profile', [
        'as' => 'frontend.profile',
        'uses' => 'ProfileController@index'
    ]);
    Route::get('profile/activity', [
        'as' => 'frontend.profile.activity',
        'uses' => 'ProfileController@activity'
    ]);

    Route::post('profile/details/update', [
        'as' => 'frontend.profile.update.details',
        'uses' => 'ProfileController@updateDetails'
    ]);
    Route::post('profile/updatePhone', [
        'as' => 'frontend.profile.update.phone',
        'uses' => 'ProfileController@updatePhone'
    ]);
    Route::post('profile/password/update', [
        'as' => 'frontend.profile.update.password',
        'uses' => 'ProfileController@updatePassword'
    ]);
    Route::post('profile/password/updateNew', [
        'as' => 'frontend.profile.update.passwordNew',
        'uses' => 'ProfileController@updateNewPassword'
    ]);
    Route::post('profile/avatar/update', [
        'as' => 'frontend.profile.update.avatar',
        'uses' => 'ProfileController@updateAvatar'
    ]);
    Route::post('profile/avatar/update/external', [
        'as' => 'frontend.profile.update.avatar-external',
        'uses' => 'ProfileController@updateAvatarExternal'
    ]);

    Route::get('profile/clear_phone', [
        'as' => 'frontend.clear_phone',
        'uses' => 'ProfileController@clear_phone'
    ]);

    Route::post('profile/contact', [
        'as' => 'frontend.profile.contact',
        'uses' => 'ProfileController@contact_form'
    ]);

    Route::put('profile/login-details/update', [
        'as' => 'frontend.profile.update.login-details',
        'uses' => 'ProfileController@updateLoginDetails'
    ]);
    Route::post('profile/two-factor/enable', [
        'as' => 'frontend.profile.two-factor.enable',
        'uses' => 'ProfileController@enableTwoFactorAuth'
    ]);
    Route::post('profile/two-factor/disable', [
        'as' => 'frontend.profile.two-factor.disable',
        'uses' => 'ProfileController@disableTwoFactorAuth'
    ]);
    Route::get('profile/sessions', [
        'as' => 'frontend.profile.sessions',
        'uses' => 'ProfileController@sessions'
    ]);
    Route::delete('profile/sessions/{session}/invalidate', [
        'as' => 'frontend.profile.sessions.invalidate',
        'uses' => 'ProfileController@invalidateSession'
    ]);

    Route::get('profile/refunds', [
        'as' => 'frontend.profile.refunds',
        'uses' => 'ProfileController@refunds'
    ]);

    Route::get('profile/ajax', [
        'as' => 'frontend.profile.ajax',
        'uses' => 'ProfileController@ajax'
    ]);

    Route::get('profile/message', [
        'as' => 'frontend.profile.message',
        'uses' => 'ProfileController@message'
    ]);

    Route::get('profile/pincode', [
        'as' => 'frontend.profile.pincode',
        'uses' => 'ProfileController@pincode'
    ]);

    Route::get('profile/daily_entry', [
        'as' => 'frontend.profile.daily_entry',
        'uses' => 'ProfileController@daily_entry'
    ]);

    Route::get('profile/phone', [
        'as' => 'frontend.profile.phone',
        'uses' => 'ProfileController@phone'
    ]);

    Route::get('profile/code', [
        'as' => 'frontend.profile.code',
        'uses' => 'ProfileController@code'
    ]);

    Route::get('profile/agree', [
        'as' => 'frontend.profile.agree',
        'uses' => 'ProfileController@agree'
    ]);

    Route::get('profile/reward', [
        'as' => 'frontend.profile.reward',
        'uses' => 'ProfileController@reward'
    ]);

    Route::get('profile/sms', [
        'as' => 'frontend.profile.sms',
        'uses' => 'ProfileController@sms'
    ]);

    Route::get('setlang/{lang}', [
        'as' => 'frontend.setlang',
        'uses' => 'ProfileController@setlang'
    ]);


    /**
     * Games routes
     */

    Route::get('/', [
        'as' => 'frontend.game.list',
        'uses' => 'GamesController@index'
    ]);
    Route::get('/hub', [
        'as' => 'frontend.game.list',
        'uses' => 'GamesController@index_hub'
    ]);

    Route::get('/faq', [
        'as' => 'frontend.faq',
        'uses' => 'GamesController@faq',
    ]);

    Route::get('/bonuses', [
        'as' => 'frontend.bonuses',
        'uses' => 'GamesController@bonuses',
    ]);
    Route::get('/bonus-conditions', [
        'as' => 'frontend.bonus.conditions',
        'uses' => 'GamesController@bonus_conditions',
    ]);
    Route::get('/progress', [
        'as' => 'frontend.progress',
        'uses' => 'GamesController@progress',
    ]);
    Route::get('/search', [
        'as' => 'frontend.game.search',
        'uses' => 'GamesController@search'
    ]);
    Route::get('/search.json', [
        'as' => 'frontend.search.json',
        'uses' => 'GamesController@search_json'
    ]);
    Route::post('balance', [
        'as' => 'frontend.balance.post',
        'uses' => 'GamesController@balanceAdd'
    ]);


    /*
    Route::get('games', [
        'as' => 'frontend.game.list',
        'uses' => 'GamesController@index'
    ]);
    */

    Route::get('categories/{category1}', [
        'as' => 'frontend.game.list.category',
        'uses' => 'GamesController@index'
    ]);

    Route::get('categories/{category1}/{category2}', [
        'as' => 'frontend.game.list.category_level2',
        'uses' => 'GamesController@index'
    ]);

    Route::get('setpage.json', [
        'as' => 'frontend.category.setpage',
        'uses' => 'GamesController@setpage'
    ]);
    
    Route::get('game/{game}', [
        'as' => 'frontend.game.go',
        'uses' => 'GamesController@go'
    ]);    

    Route::get('game/open/{game}', [
        'as' => 'frontend.game.go',
        'uses' => 'GamesController@directopen'
    ]);
    
    Route::post('game/{game}/server', [
        'as' => 'frontend.game.server',
        'uses' => 'GamesController@server'
    ]);    
    
    Route::get('game/{game}/{prego}', [
        'as' => 'frontend.game.go.prego',
        'uses' => 'GamesController@go'
    ]);	

    Route::get('/game_stat', [
        'as' => 'frontend.game_stat',
        'uses' => 'GamesController@game_stat',
    ]);

    Route::get('/tournaments', [
        'as' => 'frontend.tournaments',
        'uses' => 'TournamentsController@index',
    ]);
    Route::get('/tournaments/{tournament}', [
        'as' => 'frontend.tournaments.view',
        'uses' => 'TournamentsController@view',
    ]);

    Route::prefix('payment')->group(function () {
        Route::post('/interkassa/result', [
            'as' => 'payment.interkassa.result',
            'uses' => 'Payment\InterkassaController@index'
        ]);
        Route::get('/interkassa/success', [
            'as' => 'payment.interkassa.success',
            'uses' => 'Payment\InterkassaController@success'
        ]);
        Route::get('/interkassa/fail', [
            'as' => 'payment.interkassa.fail',
            'uses' => 'Payment\InterkassaController@fail'
        ]);
        Route::get('/interkassa/wait', [
            'as' => 'payment.interkassa.wait',
            'uses' => 'Payment\InterkassaController@wait'
        ]);

        Route::post('/coinbase/result', [
            'as' => 'payment.coinbase.result',
            'uses' => 'Payment\CoinbaseController@index'
        ]);
        Route::get('/coinbase/success', [
            'as' => 'payment.coinbase.success',
            'uses' => 'Payment\CoinbaseController@success'
        ]);
        Route::get('/coinbase/fail', [
            'as' => 'payment.coinbase.fail',
            'uses' => 'Payment\CoinbaseController@fail'
        ]);

        Route::post('/btcpayserver/result', [
            'as' => 'payment.btcpayserver.result',
            'uses' => 'Payment\BtcPayServerController@index'
        ]);
        Route::get('/btcpayserver/redirect', [
            'as' => 'payment.btcpayserver.redirect',
            'uses' => 'Payment\BtcPayServerController@redirect'
        ]);

    });

    Route::post('/sms/callback', [
        'as' => 'sms.callback',
        'uses' => 'SMSController@index'
    ]);

    Route::get('/sms/send', [
        'as' => 'sms.send',
        'uses' => 'SMSController@sendSMS'
    ]);

    Route::get('/sms/verify', [
        'as' => 'sms.verify',
        'uses' => 'SMSController@verifySMS'
    ]);

    Route::get('/sms/referral', [
        'as' => 'sms.referral',
        'uses' => 'SMSController@verifyReferral'
    ]);

    Route::get('/gamelist', [
        'as' => 'gamelist',
        'uses' => 'GamesController@list'
    ]);
    Route::get('reward', 'PagesController@getReward');

    Route::get('/fav', [
        'as' => 'fav',
        'uses' => 'GamesController@fav'
    ]);

    Route::get('/give_info', [
        'as' => 'give_info',
        'uses' => 'PagesController@give_info'
    ]);

    Route::get('/help', [
        'as' => 'frontend.help',
        'uses' => 'PagesController@help'
    ]);
    Route::get('policy', [
        'as' => 'frontend.policy',
        'uses' => 'PagesController@policy'
    ]);
    Route::get('privacy', [
        'as' => 'frontend.privacy',
        'uses' => 'PagesController@privacy'
    ]);   
});



/**
 *******************************************************************************************************
 *******************************************************************************************************
 *******************************************************************************************************
 ******************************************* BACKEND ***************************************************
 *******************************************************************************************************
 *******************************************************************************************************
 *******************************************************************************************************
 */

Route::domain('admin.'.config('app.domain'))->middleware(['checker'])->group(function () {

    Route::namespace('Backend')->group(function () {        
        Route::get('login', [
            'as' => 'backend.auth.login',
            'uses' => 'Auth\AuthController@getLogin'
        ]);
        Route::post('login', [
            'as' => 'backend.auth.login.post',
            'uses' => 'Auth\AuthController@postLogin'
        ]);
    });
});

Route::domain('admin.'.config('app.domain'))->middleware(['auth', 'checker'])->group(function () {
    Route::namespace('Backend')->group(function () {

        Route::get('logout', [
            'as' => 'backend.auth.logout',
            'uses' => 'Auth\AuthController@getLogout'
        ]);

        /**
         * Dashboard
         */
		 
    // TERMINAL
        Route::get('/terminal', 'TerminalController@index');
        Route::post('/terminal/create', 'TerminalController@craeteTerminal');
        Route::get('/terminal/details/{id}', 'TerminalController@detailsTerminal');
        Route::post('/terminal/details/{id}', 'TerminalController@terminalUpdate');
        Route::post('/terminal/balance/add', 'TerminalController@balanceAdd');
        Route::post('/terminal/balance/out', 'TerminalController@balanceOut');
        Route::post('/terminal/ajax/pay-tickets', 'TerminalController@ajaxPayTickets');
        
    
        // ATM
        Route::get('/atm', 'AtmController@index');
        Route::get('/atm/create', 'AtmController@createNewAtm');
        Route::get('/atm/reset', 'AtmController@resetAtm');
        Route::get('/atm/status/{status}', 'AtmController@statusUpdate');
        Route::get('/atm/newkey/{api_id}', 'AtmController@newApiKey');
        Route::get('/atm/delete/{id}/{api_id}', 'AtmController@deleteATM');		 
		 
        Route::get('netpos', [
            'as' => 'netpos',
            'uses' => 'DashboardController@shopIndex',
        ]);
        // Route::get('/new/user', [
        //     'as' => 'netpos.user.new',
        //     'uses' => 'UsersController@netposCreate',
        //     'middleware' => 'permission:users.add'
        // ]);
        // Route::put('/update/profile/{user}', [
        //     'as' => 'netpos.user.update',
        //     'uses' => 'UsersController@updateUserDetails',
        //     'middleware' => 'permission:users.add'
        // ]);

        // Route::get('/shop/transactions', [
        //     'as' => 'netpos.transactionsApi',
        //     'uses' => 'DashboardController@shopTransactions',
        //     //
        // ]);
        // Route::get('/transactions', [
        //     'as' => 'netpos.transactions',
        //     'uses' => 'DashboardController@transactions',
        //     //
        // ]);
        // Route::get('/cashiers/profile', [
        //     'as' => 'netpos.cashier.profile',
        //     'uses' => 'DashboardController@cashierProfile',
        //     //
        // ]);
        // Route::get('/jackpot', [
        //     'as' => 'netpos.jackpot',
        //     'uses' => 'DashboardController@jackpots',
        //     //
        // ]);
        // Route::get('get/logs', [
        //     'as' => 'netpos.logs',
        //     'uses' => 'DashboardController@logs',
        //     //
        // ]);
        

        Route::get('/search', [
            'as' => 'backend.search',
            'uses' => 'DashboardController@search',
        ]);

        Route::get('/', [
            'as' => 'backend.dashboard',
            'uses' => 'DashboardController@index',
            //
        ]);
        Route::get('/game_stat', [
            'as' => 'backend.game_stat',
            'uses' => 'DashboardController@game_stat',
            'middleware' => 'permission:stats.game',
        ]);


        Route::get('/shift_stat', [
            'as' => 'backend.shift_stat',
            'uses' => 'DashboardController@shift_stat',
            'middleware' => 'permission:stats.shift',
        ]);

        Route::get('/transactions', [
            'as' => 'backend.transactions',
            'uses' => 'DashboardController@transactions',
            'middleware' => 'permission:stats.pay',
        ]);


        Route::get('/start_shift', [
            'as' => 'backend.start_shift',
            'uses' => 'DashboardController@start_shift'
        ]);

        Route::get('/start_shift/print', [
            'as' => 'backend.start_shift.print',
            'uses' => 'DashboardController@start_shift_print'
        ]);



        Route::get('/invite', [
            'as' => 'backend.invites',
            'uses' => 'DashboardController@invites',
            'middleware' => ['permission:invite.manage', 'shopzero'],
        ]);
        Route::get('invite/status/{status}', [
            'as' => 'backend.invite.status',
            'uses' => 'DashboardController@invite_status',
            'middleware' =>  ['permission:invite.edit', 'shopzero'],
        ]);

        Route::post('/invite', [
            'as' => 'backend.invites.update',
            'uses' => 'DashboardController@invite_update',
            'middleware' =>  ['permission:invite.edit', 'shopzero'],
        ]);

        Route::get('/wheelfortune', [
            'as' => 'backend.wheelfortune',
            'uses' => 'DashboardController@wheelfortune',
            'middleware' => ['permission:wheelfortune.manage', 'shopzero'],
        ]);
        Route::get('wheelfortune/status/{status}', [
            'as' => 'backend.wheelfortune.status',
            'uses' => 'DashboardController@wheelfortune_status',
            'middleware' =>  ['permission:wheelfortune.manage', 'shopzero'],
        ]);

        Route::post('/wheelfortune', [
            'as' => 'backend.wheelfortune.update',
            'uses' => 'DashboardController@wheelfortune_update',
            'middleware' =>  ['permission:wheelfortune.manage', 'shopzero'],
        ]);

        Route::get('/banks', [
            'as' => 'backend.banks',
            'uses' => 'DashboardController@banks',
            'middleware' => ['shopzero', 'only_for_admin'],
        ]);

        Route::post('/banks', [
            'as' => 'backend.banks.update',
            'uses' => 'DashboardController@banks_update',
            'middleware' => 'only_for_admin'
        ]);

        Route::post('/banks/update', [
            'as' => 'backend.banks.update.do',
            'uses' => 'DashboardController@do_banks_update',
            'middleware' => 'only_for_admin'
        ]);

        /**
         * User Profile
         */

        Route::get('profile', [
            'as' => 'backend.profile',
            'uses' => 'ProfileController@index'
        ]);
        Route::get('balance', [
            'as' => 'backend.balance',
            'uses' => 'ProfileController@balance'
        ]);

        Route::get('profile/activity', [
            'as' => 'backend.profile.activity',
            'uses' => 'ProfileController@activity'
        ]);
        Route::put('profile/details/update', [
            'as' => 'backend.profile.update.details',
            'uses' => 'ProfileController@updateDetails'
        ]);
        Route::post('profile/avatar/update', [
            'as' => 'backend.profile.update.avatar',
            'uses' => 'ProfileController@updateAvatar'
        ]);
        Route::post('profile/avatar/update/external', [
            'as' => 'backend.profile.update.avatar-external',
            'uses' => 'ProfileController@updateAvatarExternal'
        ]);
        Route::put('profile/login-details/update', [
            'as' => 'backend.profile.update.login-details',
            'uses' => 'ProfileController@updateLoginDetails'
        ]);
        Route::post('profile/two-factor/enable', [
            'as' => 'backend.profile.two-factor.enable',
            'uses' => 'ProfileController@enableTwoFactorAuth'
        ]);
        Route::post('profile/two-factor/disable', [
            'as' => 'backend.profile.two-factor.disable',
            'uses' => 'ProfileController@disableTwoFactorAuth'
        ]);
        Route::get('profile/sessions', [
            'as' => 'backend.profile.sessions',
            'uses' => 'ProfileController@sessions'
        ]);
        Route::delete('profile/sessions/{session}/invalidate', [
            'as' => 'backend.profile.sessions.invalidate',
            'uses' => 'ProfileController@invalidateSession'
        ]);
        Route::match(['get','post'], 'profile/setshop', [
            'as' => 'backend.profile.setshop',
            'uses' => 'ProfileController@setshop'
        ]);

        /**
         * User Management
         */

        Route::get('user', [
            'as' => 'backend.user.list',
            'uses' => 'UsersController@index',
            'middleware' => 'permission:users.manage'
        ]);        

        Route::get('search_user/', [
            'as' => 'backend.user.search',
            'uses' => 'UsersController@search',
            'middleware' => 'permission:users.manage'
        ]);

        Route::post('search_user/', [
            'as' => 'backend.user.search',
            'uses' => 'UsersController@searchup',
            'middleware' => 'permission:users.manage'
        ]);

        Route::get('tree', [
            'as' => 'backend.user.tree',
            'uses' => 'UsersController@tree',
            'middleware' => 'permission:users.tree'
        ]);
        /*
        Route::get('statistics', [
            'as' => 'backend.statistics',
            'uses' => 'DashboardController@statistics',
            'middleware' => 'permission:stats.pay',
        ]);
        */
        
        Route::get('changePassword', [
            'uses' => 'UsersController@changePassword',
            'as' => 'backend.user.changepassword',
        ]);

        Route::post('changePassword', [
            'uses' => 'UsersController@update_password',
            'as' => 'backend.user.changepassword',
        ]);

        Route::post('user/updateprofile', [
            'uses' => 'UsersController@update_profile',
            'as' => 'backend.user.updateprofile',
        ]);

        Route::get('user/balances', [
            'uses' => 'UsersController@get_balance',
            'as' => 'backend.user.balance.get',
        ]);

        Route::post('profile/balance/update', [
            'uses' => 'UsersController@updateBalance',
            'as' => 'backend.user.balance.update',
        ]);
        Route::post('profile/limit/update', [
            'uses' => 'UsersController@updateLimit',
            'as' => 'backend.user.limit.update',
        ]);
        Route::get('user/cashier_create', [
            'as' => 'backend.user.cashier_create',
            'uses' => 'UsersController@cashier_create',
            'middleware' => 'permission:users.add'
        ]);
        Route::get('user/cashier_edit/{user}', [
            'as' => 'backend.user.cashier_edit',
            'uses' => 'UsersController@cashier_edit',
            'middleware' => 'permission:users.add'
        ]);
        Route::post('user/cashier_update/{user}', [
            'as' => 'backend.user.cashier_update',
            'uses' => 'UsersController@cashier_update',
            'middleware' => 'permission:users.add'
        ]);

        Route::get('user/player_create', [
            'as' => 'backend.user.player_create',
            'uses' => 'UsersController@player_create',
            'middleware' => 'permission:users.add'
        ]);

        Route::post('user/player_table', [
            'as' => 'backend.user.player_table',
            'uses' => 'UsersController@player_table',
            'middleware' => 'permission:users.add'
        ]);

        Route::post('user/player_create', [
            'as' => 'backend.user.player_store',
            'uses' => 'UsersController@player_store',
            'middleware' => 'permission:users.add'
        ]);

        Route::get('user/history', [
            'as' => 'backend.user.player_history',
            'uses' => 'UsersController@player_history',            
        ]);

        Route::get('user/gamelogs', [
            'as' => 'backend.user.gamelogs',
            'uses' => 'UsersController@gamelogs',            
        ]);

        Route::get('user/transactions', [
            'as' => 'backend.user.transactions',
            'uses' => 'UsersController@transactions',            
        ]);

        Route::get('user/statistics', [
            'as' => 'backend.user.statistics',
            'uses' => 'UsersController@statistics',            
        ]);

        Route::get('jpg/jackpot_history', [
            'as' => 'backend.jpg.jackpot_history',
            'uses' => 'JPGController@jackpot_history',            
        ]);

        Route::get('user/game_report', [
            'as' => 'backend.user.game_report',
            'uses' => 'UsersController@game_report',
        ]);

        Route::get('user/report', [
            'as' => 'backend.user.report',
            'uses' => 'UsersController@report',            
        ]);

        Route::get('user/daily_report', [
            'as' => 'backend.user.daily_report',
            'uses' => 'UsersController@daily_report',            
        ]);

        Route::get('user/create', [
            'as' => 'backend.user.create',
            'uses' => 'UsersController@create',
            'middleware' => 'permission:users.add'
        ]);
        Route::post('user/create', [
            'as' => 'backend.user.store',
            'uses' => 'UsersController@store',
            'middleware' => 'permission:users.add'
        ]);
        Route::get('user/{user}/stat', [
            'as' => 'backend.user.stat',
            'uses' => 'UsersController@statistics'
        ]);
        Route::get('/user/{user}/specauth', [
            'as' => 'backend.user.specauth',
            'uses' => 'UsersController@specauth',
        ]);
        Route::get('/user/back_login', [
            'as' => 'backend.user.back_login',
            'uses' => 'UsersController@back_login',
        ]);
        Route::get('/user/send_phone_code', [
            'as' => 'backend.profile.send_phone_code',
            'uses' => 'UsersController@send_phone_code',
        ]);

        Route::post('user/mass', [
            'as' => 'backend.user.massadd',
            'uses' => 'UsersController@massadd',
            'middleware' => 'permission:users.add'
        ]);
        Route::get('user/{user}/show', [
            'as' => 'backend.user.show',
            'uses' => 'UsersController@view'
        ]);
        Route::get('user/{user}/profile', [
            'as' => 'backend.user.edit',
            'uses' => 'UsersController@edit',
            'middleware' => 'permission:users.edit'
        ]);
        // Route::put('user/{user}/update/details', [
        //     'as' => 'backend.user.update.details',
        //     'uses' => 'UsersController@updateDetails',
        //     'middleware' => 'permission:users.edit'
        // ]);
        Route::post('user/{user}/update/details', [
                'as' => 'backend.user.update',
                'uses' => 'UsersController@update',
                'middleware' => 'permission:users.edit'
            ]);
        Route::put('user/{user}/update/login-details', [
            'as' => 'backend.user.update.login-details',
            'uses' => 'UsersController@updateLoginDetails',
            'middleware' => 'permission:users.edit'
        ]);
        Route::delete('user/{user}/delete', [
            'as' => 'backend.user.delete',
            'uses' => 'UsersController@delete',
            'middleware' => 'permission:users.delete'
        ]);
        Route::delete('user/{user}/hard_delete', [
            'as' => 'backend.user.hard_delete',
            'uses' => 'UsersController@hard_delete',
            'middleware' => 'permission:users.delete'
        ]);
        Route::post('user/{user}/update/avatar', [
            'as' => 'backend.user.update.avatar',
            'uses' => 'UsersController@updateAvatar'
        ]);
        Route::post('user/{user}/update/avatar/external', [
            'as' => 'backend.user.update.avatar.external',
            'uses' => 'UsersController@updateAvatarExternal'
        ]);
        Route::get('user/{user}/sessions', [
            'as' => 'backend.user.sessions',
            'uses' => 'UsersController@sessions'
        ]);
        Route::delete('user/{user}/sessions/{session}/invalidate', [
            'as' => 'backend.user.sessions.invalidate',
            'uses' => 'UsersController@invalidateSession'
        ]);
        Route::post('user/{user}/two-factor/enable', [
            'as' => 'backend.user.two-factor.enable',
            'uses' => 'UsersController@enableTwoFactorAuth'
        ]);
        Route::post('user/{user}/two-factor/disable', [
            'as' => 'backend.user.two-factor.disable',
            'uses' => 'UsersController@disableTwoFactorAuth'
        ]);

        Route::delete('user/action/{action}', [
            'as' => 'backend.user.action',
            'uses' => 'UsersController@action',
        ]);

        Route::post('user/toggle/{user}', [
            'as' => 'backend.user.toggle',
            'uses' => 'UsersController@toggle'
        ]);

        Route::post('user/delete/{user}', [
            'as' => 'backend.user.delete',
            'uses' => 'UsersController@delete'
        ]);

        Route::post('user/kickout/{user}', [
            'as' => 'backend.user.kickout',
            'uses' => 'UsersController@kickout'
        ]);

        Route::get('/user/timezone', [
            'as' => 'backend.user.timezone',
            'uses' => 'UsersController@timezone',
        ]);

        Route::get('/user/isconnected', [
            'as' => 'backend.user.isconnected',
            'uses' => 'UsersController@isconnected',
        ]);

        Route::get('/user/onlineusers', [
            'as' => 'backend.user.onlineusers',
            'uses' => 'UsersController@onlineusers',
        ]);

        /**
         * Games routes
         */

        Route::get('game', [
            'as' => 'backend.game.list',
            'uses' => 'GamesController@index',
            'middleware' => 'permission:games.manage'
        ]);
        Route::get('games.json', [
            'as' => 'backend.game.list.json',
            'uses' => 'GamesController@index_json'
        ]);
        Route::get('game/create', [
            'as' => 'backend.game.create',
            'uses' => 'GamesController@create',
        ]);
        Route::post('game/create', [
            'as' => 'backend.game.store',
            'uses' => 'GamesController@store',
        ]);
        Route::get('game/{game}/show', [
            'as' => 'backend.game.show',
            'uses' => 'GamesController@view',
        ]);
        Route::get('game/{game}', [
            'as' => 'backend.game.go',
            'uses' => 'GamesController@go'
        ]);
        Route::post('/game/{game}/server', [
            'as' => 'backend.game.server',
            'uses' => 'GamesController@server'
        ]);
        Route::get('game/{game}/edit', [
            'as' => 'backend.game.edit',
            'uses' => 'GamesController@edit',
        ]);
        Route::post('game/{game}/update', [
            'as' => 'backend.game.update',
            'uses' => 'GamesController@update',
        ]);
        Route::delete('game/{game}/delete', [
            'as' => 'backend.game.delete',
            'uses' => 'GamesController@delete',
        ]);
        Route::post('game/categories', [
            'as' => 'backend.game.categories',
            'uses' => 'GamesController@categories',
        ]);
        Route::post('game/update/mass', [
            'as' => 'backend.game.mass',
            'uses' => 'GamesController@mass',
        ]);
        Route::post('game/setting/savetemplate', [
            'as' => 'backend.game.savetemplate',
            'uses' => 'GamesController@savetemplate',
        ]);
        Route::post('game/setting/loadtemplate', [
            'as' => 'backend.game.loadtemplate',
            'uses' => 'GamesController@loadtemplate',
        ]);
        Route::post('game/update/view', [
            'as' => 'backend.game.view',
            'uses' => 'GamesController@views',
        ]);
        Route::put('game/clear', [
            'as' => 'backend.game.clear',
            'uses' => 'GamesController@clear_games',
        ]);

        Route::get('game_setting', [
            'as' => 'backend.game.setting',
            'uses' => 'GamesController@get_game_settings',
        ]);

        Route::get('game_win_setting/{game}', [
            'as' => 'backend.game.win_setting',
            'uses' => 'GamesController@get_game_win_settings',
        ]);

        Route::post('game_win_setting', [
            'as' => 'backend.game.store_win_setting',
            'uses' => 'GamesController@update_game_win_settings',
        ]);

        Route::post('game/{game}/switch', [
            'as' => 'backend.game.switch',
            'uses' => 'GamesController@switch',
        ]);
        
        /**
         * Categories routes
         */

        Route::get('category', [
            'as' => 'backend.category.list',
            'uses' => 'CategoriesController@index',
            'middleware' => 'only_for_admin'
        ]);
        Route::get('category/create', [
            'as' => 'backend.category.create',
            'uses' => 'CategoriesController@create',
            'middleware' => 'only_for_admin'
        ]);
        Route::post('category/create', [
            'as' => 'backend.category.store',
            'uses' => 'CategoriesController@store',
            'middleware' => 'only_for_admin'
        ]);
        Route::get('category/{category}/edit', [
            'as' => 'backend.category.edit',
            'uses' => 'CategoriesController@edit',
            'middleware' => 'only_for_admin'
        ]);
        Route::post('category/{category}/update', [
            'as' => 'backend.category.update',
            'uses' => 'CategoriesController@update',
            'middleware' => 'only_for_admin'
        ]);
        Route::delete('category/{category}/delete', [
            'as' => 'backend.category.delete',
            'uses' => 'CategoriesController@delete',
            'middleware' => 'only_for_admin'
        ]);

        /**
         * Categories routes
         */

        Route::get('shops', [
            'as' => 'backend.shop.list',
            'uses' => 'ShopsController@index',
            'middleware' => 'permission:shops.manage'
        ]);
        Route::get('shops/create', [
            'as' => 'backend.shop.create',
            'uses' => 'ShopsController@create',
            'middleware' => 'permission:shops.add'
        ]);
        Route::post('shops/create', [
            'as' => 'backend.shop.store',
            'uses' => 'ShopsController@store',
            'middleware' => 'permission:shops.add'
        ]);

        Route::get('shops/admin/create', [
            'as' => 'backend.shop.admin_create',
            'uses' => 'ShopsController@admin_create',
            'middleware' => 'permission:shops.manage'
        ]);
        Route::post('shops/admin/create', [
            'as' => 'backend.shop.admin_store',
            'uses' => 'ShopsController@admin_store',
            'middleware' => 'permission:shops.manage'
        ]);
        Route::get('shops/get_demo', [
            'as' => 'backend.shop.get_demo',
            'uses' => 'ShopsController@get_demo',
            'middleware' => 'permission:shops.free_demo'
        ]);

        Route::get('shops/fast_shop', [
            'as' => 'backend.shop.fast_shop',
            'uses' => 'ShopsController@fast_shop',
            'middleware' => 'permission:shops.manage'
        ]);

        Route::get('shops/danger', [
            'as' => 'backend.shop.danger',
            'uses' => 'ShopsController@danger',
            'middleware' => 'permission:shops.manage'
        ]);

        Route::get('shops/{shop}/edit', [
            'as' => 'backend.shop.edit',
            'uses' => 'ShopsController@edit',
            'middleware' => 'permission:shops.manage'
        ]);
        Route::post('shops/{shop}/update', [
            'as' => 'backend.shop.update',
            'uses' => 'ShopsController@update',
            'middleware' => 'permission:shops.manage'
        ]);
        Route::post('shops/balance', [
            'as' => 'backend.shop.balance',
            'uses' => 'ShopsController@balance',
            'middleware' => 'permission:shops.manage'
        ]);
        Route::delete('shops/{shop}/delete', [
            'as' => 'backend.shop.delete',
            'uses' => 'ShopsController@delete',
            'middleware' => 'permission:shops.delete'
        ]);
        Route::delete('shops/{shop}/hard_delete', [
            'as' => 'backend.shop.hard_delete',
            'uses' => 'ShopsController@hard_delete',
            'middleware' => 'permission:shops.hard_delete'
        ]);
        Route::delete('shops/{shop}/action/{action}', [
            'as' => 'backend.shop.action',
            'uses' => 'ShopsController@action',
            'middleware' => 'permission:shops.manage'
        ]);
        Route::post('shops/{shop}/regenerate_jp', [
            'as' => 'backend.shop.regenerate_jp',
            'uses' => 'ShopsController@regenerate_jp',
            'middleware' => 'permission:shops.manage'
        ]);

        /**
         * Happyhours routes
         */

        Route::get('happyhours', [
            'as' => 'backend.happyhour.list',
            'uses' => 'HappyHourController@index',
            'middleware' => 'permission:happyhours.manage'
        ]);
        Route::get('happyhours/create', [
            'as' => 'backend.happyhour.create',
            'uses' => 'HappyHourController@create',
            'middleware' => 'permission:happyhours.add'
        ]);
        Route::post('happyhours/create', [
            'as' => 'backend.happyhour.store',
            'uses' => 'HappyHourController@store',
            'middleware' => 'permission:happyhours.add'
        ]);
        Route::get('happyhours/{happyhour}/edit', [
            'as' => 'backend.happyhour.edit',
            'uses' => 'HappyHourController@edit',
        ]);
        Route::post('happyhours/{happyhour}/update', [
            'as' => 'backend.happyhour.update',
            'uses' => 'HappyHourController@update',
        ]);
        Route::delete('happyhours/{happyhour}/delete', [
            'as' => 'backend.happyhour.delete',
            'uses' => 'HappyHourController@delete',
            'middleware' => 'permission:happyhours.delete'
        ]);
        Route::get('happyhours/status/{status}', [
            'as' => 'backend.happyhour.status',
            'uses' => 'HappyHourController@status',
        ]);

        /**
         * Happyhours routes
         */

        Route::get('welcome_bonuses', [
            'as' => 'backend.welcome_bonus.list',
            'uses' => 'WelcomeBonusController@index',
            'middleware' => 'permission:welcome_bonuses.manage'
        ]);
        Route::get('welcome_bonuses/{welcome_bonus}/edit', [
            'as' => 'backend.welcome_bonus.edit',
            'uses' => 'WelcomeBonusController@edit',
            'middleware' => 'permission:welcome_bonuses.edit'
        ]);
        Route::post('welcome_bonuses/{welcome_bonus}/update', [
            'as' => 'backend.welcome_bonus.update',
            'uses' => 'WelcomeBonusController@update',
            'middleware' => 'permission:welcome_bonuses.edit'
        ]);
        Route::get('welcome_bonuses/status/{status}', [
            'as' => 'backend.welcome_bonus.status',
            'uses' => 'WelcomeBonusController@status',
        ]);
        

        /**
         * Info routes
         */

        Route::get('api', [
            'as' => 'backend.api.list',
            'uses' => 'ApiController@index',
            'middleware' => 'permission:api.manage'
        ]);
        Route::get('api/create', [
            'as' => 'backend.api.create',
            'uses' => 'ApiController@create',
            'middleware' => 'permission:api.add',
        ]);
        Route::post('api/create', [
            'as' => 'backend.api.store',
            'uses' => 'ApiController@store',
            'middleware' => 'permission:api.add',
        ]);
        Route::get('api/generate', [
            'as' => 'backend.api.generate',
            'uses' => 'ApiController@generate',
        ]);
        Route::get('api/json', [
            'as' => 'backend.api.json',
            'uses' => 'ApiController@json',
        ]);
        Route::get('api/{api}/edit', [
            'as' => 'backend.api.edit',
            'uses' => 'ApiController@edit',
            'middleware' => 'permission:api.edit'
        ]);
        Route::post('api/{api}/update', [
            'as' => 'backend.api.update',
            'uses' => 'ApiController@update',
            'middleware' => 'permission:api.edit'
        ]);
        Route::post('api/balance', [
            'as' => 'backend.api.balance',
            'uses' => 'ApiController@balance',
        ]);
        Route::delete('api/{api}/delete', [
            'as' => 'backend.api.delete',
            'uses' => 'ApiController@delete',
            'middleware' => 'permission:api.delete',
        ]);

        /**
         * Articles routes
         */

        Route::get('articles', [
            'as' => 'backend.article.list',
            'uses' => 'ArticlesController@index',
            'middleware' => 'only_for_admin',
        ]);
        Route::get('articles/create', [
            'as' => 'backend.article.create',
            'uses' => 'ArticlesController@create',
            'middleware' => 'only_for_admin',
        ]);
        Route::post('articles/create', [
            'as' => 'backend.article.store',
            'uses' => 'ArticlesController@store',
            'middleware' => 'only_for_admin',
        ]);
        Route::get('articles/{article}/edit', [
            'as' => 'backend.article.edit',
            'uses' => 'ArticlesController@edit',
            'middleware' => 'only_for_admin',
        ]);
        Route::post('articles/{article}/update', [
            'as' => 'backend.article.update',
            'uses' => 'ArticlesController@update',
            'middleware' => 'only_for_admin',
        ]);
        Route::delete('articles/{article}/delete', [
            'as' => 'backend.article.delete',
            'uses' => 'ArticlesController@delete',
            'middleware' => 'only_for_admin',
        ]);


        /**
         * Rules routes
         */

        Route::get('rules', [
            'as' => 'backend.rule.list',
            'uses' => 'RulesController@index',
            'middleware' => 'only_for_admin',
        ]);
        Route::get('rules/{rule}/edit', [
            'as' => 'backend.rule.edit',
            'uses' => 'RulesController@edit',
            'middleware' => 'only_for_admin',
        ]);
        Route::post('rules/{rule}/update', [
            'as' => 'backend.rule.update',
            'uses' => 'RulesController@update',
            'middleware' => 'only_for_admin',
        ]);


        /**
         * Jackpot Controller
         */
        Route::get('jp_edit', [
            'as' => 'backend.jp.edit',
            'uses' => 'JPGController@editjp',
        ]);

        Route::post('jp/updatejp', [
            'as' => 'backend.jp.update',
            'uses' => 'JPGController@updatejp',
            'middleware' => 'permission:jpgame.edit'
        ]);

        Route::post('jp/regenerate', [
            'as' => 'backend.jp.regenerate',
            'uses' => 'JPGController@regenerate',
            'middleware' => 'permission:jpgame.edit'
        ]);

        Route::get('jpgame', [
            'as' => 'backend.jpgame.list',
            'uses' => 'JPGController@index',
        ]);

        Route::get('jpgame/{jackpot}/edit', [
            'as' => 'backend.jpgame.edit',
            'uses' => 'JPGController@edit',
            'middleware' => 'permission:jpgame.manage'
        ]);
        Route::post('jpgame/{jackpot}/update', [
            'as' => 'backend.jpgame.update',
            'uses' => 'JPGController@update',
            'middleware' => 'permission:jpgame.edit'
        ]);

        Route::post('jpgame/global', [
            'as' => 'backend.jpgame.global',
            'uses' => 'JPGController@global',
        ]);
        Route::post('jpgame/global_update', [
            'as' => 'backend.jpgame.global_update',
            'uses' => 'JPGController@global_update',
        ]);



        /*
         *
         * ProgressController
         *
         * */

        Route::get('progress', [
            'as' => 'backend.progress.list',
            'uses' => 'ProgressController@index',
            'middleware' => 'permission:progress.manage'
        ]);

        Route::get('progress/{progress}/edit', [
            'as' => 'backend.progress.edit',
            'uses' => 'ProgressController@edit',
            'middleware' => 'permission:progress.edit'
        ]);
        Route::post('progress/{progress}/update', [
            'as' => 'backend.progress.update',
            'uses' => 'ProgressController@update',
            'middleware' => 'permission:progress.edit'
        ]);

        Route::get('progress/status/{status}', [
            'as' => 'backend.progress.status',
            'uses' => 'ProgressController@status',
            'middleware' => 'permission:progress.manage'
        ]);


        /**
         * Roles & Permissions
         */

        Route::get('role', [
            'as' => 'backend.role.index',
            'uses' => 'RolesController@index',
        ]);
        Route::get('role/create', [
            'as' => 'backend.role.create',
            'uses' => 'RolesController@create'
        ]);
        Route::post('role/store', [
            'as' => 'backend.role.store',
            'uses' => 'RolesController@store'
        ]);
        Route::get('role/{role}/edit', [
            'as' => 'backend.role.edit',
            'uses' => 'RolesController@edit'
        ]);
        Route::put('role/{role}/update', [
            'as' => 'backend.role.update',
            'uses' => 'RolesController@update'
        ]);
        Route::delete('role/{role}/delete', [
            'as' => 'backend.role.delete',
            'uses' => 'RolesController@delete'
        ]);



        /**
         * Permissions
         */

        Route::get('permission', [
            'as' => 'backend.permission.index',
            'uses' => 'PermissionsController@index',
            'middleware' => 'only_for_admin'
        ]);
        Route::post('permission/save', [
            'as' => 'backend.permission.save',
            'uses' => 'PermissionsController@saveRolePermissions',
            'middleware' => 'only_for_admin'
        ]);


        /**
         * Settings
         */


        Route::get('settings/{tab}', [
            'as' => 'backend.settings.list',
            'uses' => 'SettingsController@general',
        ]);

        Route::post('settings/{tab}', [
            'as' => 'backend.settings.list.update',
            'uses' => 'SettingsController@update',
        ]);


        Route::get('securities', [
            'as' => 'backend.securities',
            'uses' => 'DashboardController@securities',
            'middleware' => 'only_for_admin'
        ]);
        Route::put('securities/{item}/block', [
            'as' => 'backend.securities.block',
            'uses' => 'DashboardController@securities_block',
            'middleware' => 'only_for_admin'
        ]);
        Route::delete('securities/{item}/delete', [
            'as' => 'backend.securities.delete',
            'uses' => 'DashboardController@securities_delete',
            'middleware' => 'only_for_admin'
        ]);
        Route::get('generator', [
            'as' => 'backend.settings.generator',
            'uses' => 'DashboardController@generator',
        ]);
        Route::post('generator', [
            'as' => 'backend.settings.generator.post',
            'uses' => 'DashboardController@generator',
        ]);
        Route::put('shops/block', [
            'as' => 'backend.settings.shop_block',
            'uses' => 'SettingsController@shop_block',
            'middleware' => 'permission:shops.block'
        ]);
        Route::put('shops/unblock', [
            'as' => 'backend.settings.shop_unblock',
            'uses' => 'SettingsController@shop_unblock',
            'middleware' => 'permission:shops.unblock'
        ]);
        Route::put('settings/sync', [
            'as' => 'backend.settings.sync',
            'uses' => 'SettingsController@sync'
        ]);

        Route::put('settings/delete/stat/game', [
            'as' => 'backend.settings.gelete_stat',
            'uses' => 'SettingsController@gelete_stat',
            'middleware' => 'only_for_admin'
        ]);

        Route::put('settings/delete/log/game', [
            'as' => 'backend.settings.gelete_log',
            'uses' => 'SettingsController@gelete_log',
            'middleware' => 'only_for_admin'
        ]);

        Route::get('post/poster',[
            'as' => 'backend.post.poster',
            'uses' => 'PostController@poster'
        ]);

        Route::get('post/video',[
            'as' => 'backend.post.video',
            'uses' => 'PostController@video'
        ]);

        Route::get('post/news',[
            'as' => 'backend.post.news',
            'uses' => 'PostController@news'
        ]);

        Route::get('post/notification',[
            'as' => 'backend.post.notification',
            'uses' => 'PostController@notification'
        ]);

        Route::post('post/addposter',[
            'as' => 'backend.post.addposter',
            'uses' => 'PostController@addposter'
        ]);

        Route::post('post/addvideo',[
            'as' => 'backend.post.addvideo',
            'uses' => 'PostController@addvideo'
        ]);

        Route::post('post/addnews',[
            'as' => 'backend.post.addnews',
            'uses' => 'PostController@addnews'
        ]);

        Route::post('post/addnotification',[
            'as' => 'backend.post.addnotification',
            'uses' => 'PostController@addnotification'
        ]);

        Route::post('post/delete',[
            'as' => 'backend.post.delete',
            'uses' => 'PostController@delete'
        ]);

        Route::get('bonus/setting',[
            'as' => 'backend.bonus.setting',
            'uses' => 'DashboardController@bonus_setting'
        ]);

        Route::get('bonus/logs',[
            'as' => 'backend.bonus.logs',
            'uses' => 'DashboardController@bonus_logs'
        ]);

        Route::post('bonus/update',[
            'as' => 'backend.bonus.update',
            'uses' => 'DashboardController@bonus_update'
        ]);

        Route::get('bonus/gamebonus',[
            'as' => 'backend.bonus.game',
            'uses' => 'DashboardController@gamebonus'
        ]);

        Route::get('setting',[
            'as' => 'backend.system.setting',
            'uses' => 'DashboardController@setting'
        ]);

        Route::post('setting/update',[
            'as' => 'backend.settings.update',
            'uses' => 'DashboardController@store_setting'
        ]);

        Route::post('bonus/update_game',[
            'as' => 'backend.bonus.update_game',
            'uses' => 'DashboardController@bonus_update_game'
        ]);
    });
});

// Alternative backend routes for localhost (without domain routing)
Route::prefix('backend')->namespace('Backend')->middleware(['checker'])->group(function () {
    Route::get('login', [
        'as' => 'backend.auth.login',
        'uses' => 'Auth\AuthController@getLogin'
    ]);
    Route::post('login', [
        'as' => 'backend.auth.login.post',
        'uses' => 'Auth\AuthController@postLogin'
    ]);
});

Route::prefix('backend')->namespace('Backend')->middleware(['auth', 'checker'])->group(function () {
    Route::get('logout', [
        'as' => 'backend.auth.logout',
        'uses' => 'Auth\AuthController@getLogout'
    ]);

    Route::get('/', [
        'as' => 'backend.dashboard',
        'uses' => 'DashboardController@index',
    ]);

    Route::get('/terminal', 'TerminalController@index');
    Route::post('/terminal/create', 'TerminalController@craeteTerminal');
    Route::get('/terminal/details/{id}', 'TerminalController@detailsTerminal');
    Route::post('/terminal/details/{id}', 'TerminalController@terminalUpdate');
    Route::post('/terminal/balance/add', 'TerminalController@balanceAdd');
    Route::post('/terminal/balance/out', 'TerminalController@balanceOut');
    Route::post('/terminal/ajax/pay-tickets', 'TerminalController@ajaxPayTickets');
    
    Route::get('/atm', 'AtmController@index');
    Route::get('/atm/create', 'AtmController@createNewAtm');
    Route::get('/atm/reset', 'AtmController@resetAtm');
    Route::get('/atm/status/{status}', 'AtmController@statusUpdate');
    Route::get('/atm/newkey/{api_id}', 'AtmController@newApiKey');
    Route::get('/atm/delete/{id}/{api_id}', 'AtmController@deleteATM');
    
    Route::get('netpos', [
        'as' => 'netpos',
        'uses' => 'DashboardController@shopIndex',
    ]);

    Route::get('/search', [
        'as' => 'backend.search',
        'uses' => 'DashboardController@search',
    ]);

    Route::get('game_stat', [
        'as' => 'backend.game_stat',
        'uses' => 'DashboardController@game_stat',
    ]);

    Route::get('shift_stat', [
        'as' => 'backend.shift_stat',
        'uses' => 'DashboardController@shift_stat',
    ]);

    Route::get('transactions', [
        'as' => 'backend.transactions',
        'uses' => 'DashboardController@transactions',
    ]);

    Route::post('start_shift', [
        'as' => 'backend.start_shift',
        'uses' => 'DashboardController@start_shift',
    ]);

    Route::get('start_shift/print', [
        'as' => 'backend.start_shift.print',
        'uses' => 'DashboardController@start_shift_print',
    ]);

    Route::get('invites', [
        'as' => 'backend.invites',
        'uses' => 'DashboardController@invites',
    ]);

    Route::put('invite/status', [
        'as' => 'backend.invite.status',
        'uses' => 'DashboardController@invite_status',
    ]);

    Route::put('invites/update', [
        'as' => 'backend.invites.update',
        'uses' => 'DashboardController@invites_update',
    ]);

    Route::get('wheelfortune', [
        'as' => 'backend.wheelfortune',
        'uses' => 'DashboardController@wheelfortune',
    ]);

    Route::put('wheelfortune/status', [
        'as' => 'backend.wheelfortune.status',
        'uses' => 'DashboardController@wheelfortune_status',
    ]);

    Route::put('wheelfortune/update', [
        'as' => 'backend.wheelfortune.update',
        'uses' => 'DashboardController@wheelfortune_update',
    ]);

    Route::get('banks', [
        'as' => 'backend.banks',
        'uses' => 'DashboardController@banks',
        'middleware' => ['shopzero', 'only_for_admin'],
    ]);

    Route::put('banks/update', [
        'as' => 'backend.banks.update',
        'uses' => 'DashboardController@banks_update',
        'middleware' => 'only_for_admin'
    ]);

    Route::post('banks/update', [
        'as' => 'backend.banks.update.do',
        'uses' => 'DashboardController@banks_update_do',
        'middleware' => 'only_for_admin'
    ]);

    Route::get('profile', [
        'as' => 'backend.profile',
        'uses' => 'ProfileController@index',
    ]);

    Route::get('balance', [
        'as' => 'backend.balance',
        'uses' => 'ProfileController@balance',
    ]);

    Route::get('profile/activity', [
        'as' => 'backend.profile.activity',
        'uses' => 'ProfileController@activity',
    ]);

    Route::put('profile/update/details', [
        'as' => 'backend.profile.update.details',
        'uses' => 'ProfileController@updateDetails',
    ]);

    Route::post('profile/update/avatar', [
        'as' => 'backend.profile.update.avatar',
        'uses' => 'ProfileController@updateAvatar',
    ]);

    Route::post('profile/update/avatar-external', [
        'as' => 'backend.profile.update.avatar-external',
        'uses' => 'ProfileController@updateAvatarExternal',
    ]);

    Route::put('profile/update/login-details', [
        'as' => 'backend.profile.update.login-details',
        'uses' => 'ProfileController@updateLoginDetails',
    ]);

    Route::post('profile/two-factor/enable', [
        'as' => 'backend.profile.two-factor.enable',
        'uses' => 'ProfileController@enableTwoFactorAuth',
    ]);

    Route::post('profile/two-factor/disable', [
        'as' => 'backend.profile.two-factor.disable',
        'uses' => 'ProfileController@disableTwoFactorAuth',
    ]);

    Route::get('profile/sessions', [
        'as' => 'backend.profile.sessions',
        'uses' => 'ProfileController@sessions',
    ]);

    Route::delete('profile/sessions/{session}', [
        'as' => 'backend.profile.sessions.invalidate',
        'uses' => 'ProfileController@invalidateSession',
    ]);

    Route::post('profile/setshop', [
        'as' => 'backend.profile.setshop',
        'uses' => 'ProfileController@setshop',
    ]);

    Route::get('users', [
        'as' => 'backend.user.list',
        'uses' => 'UsersController@index',
    ]);

    Route::get('user/search', [
        'as' => 'backend.user.search',
        'uses' => 'UsersController@search',
    ]);

    Route::post('user/search', [
        'as' => 'backend.user.search',
        'uses' => 'UsersController@search',
    ]);

    Route::get('user/tree', [
        'as' => 'backend.user.tree',
        'uses' => 'UsersController@tree',
    ]);

    Route::get('statistics', [
        'as' => 'backend.statistics',
        'uses' => 'UsersController@statistics',
    ]);

    Route::get('user/changepassword', [
        'as' => 'backend.user.changepassword',
        'uses' => 'UsersController@changepassword',
    ]);

    Route::post('user/changepassword', [
        'as' => 'backend.user.changepassword',
        'uses' => 'UsersController@changepassword',
    ]);

    Route::put('user/updateprofile', [
        'as' => 'backend.user.updateprofile',
        'uses' => 'UsersController@updateprofile',
    ]);

    Route::get('user/balance/get', [
        'as' => 'backend.user.balance.get',
        'uses' => 'UsersController@balance_get',
    ]);

    Route::put('user/balance/update', [
        'as' => 'backend.user.balance.update',
        'uses' => 'UsersController@balance_update',
    ]);

    Route::put('user/limit/update', [
        'as' => 'backend.user.limit.update',
        'uses' => 'UsersController@limit_update',
    ]);

    Route::get('user/cashier_create', [
        'as' => 'backend.user.cashier_create',
        'uses' => 'UsersController@cashier_create',
    ]);

    Route::get('user/cashier_edit', [
        'as' => 'backend.user.cashier_edit',
        'uses' => 'UsersController@cashier_edit',
    ]);

    Route::put('user/cashier_update', [
        'as' => 'backend.user.cashier_update',
        'uses' => 'UsersController@cashier_update',
    ]);

    Route::get('user/player_create', [
        'as' => 'backend.user.player_create',
        'uses' => 'UsersController@player_create',
    ]);

    Route::get('user/player_table', [
        'as' => 'backend.user.player_table',
        'uses' => 'UsersController@player_table',
    ]);

    Route::post('user/player_store', [
        'as' => 'backend.user.player_store',
        'uses' => 'UsersController@player_store',
    ]);

    Route::get('user/player_history', [
        'as' => 'backend.user.player_history',
        'uses' => 'UsersController@player_history',
    ]);

    Route::get('user/gamelogs', [
        'as' => 'backend.user.gamelogs',
        'uses' => 'UsersController@gamelogs',
    ]);

    Route::get('user/transactions', [
        'as' => 'backend.user.transactions',
        'uses' => 'UsersController@transactions',
    ]);

    Route::get('user/statistics', [
        'as' => 'backend.user.statistics',
        'uses' => 'UsersController@statistics',
    ]);

    Route::get('jpg/jackpot_history', [
        'as' => 'backend.jpg.jackpot_history',
        'uses' => 'UsersController@jackpot_history',
    ]);

    Route::get('user/game_report', [
        'as' => 'backend.user.game_report',
        'uses' => 'UsersController@game_report',
    ]);

    Route::get('user/report', [
        'as' => 'backend.user.report',
        'uses' => 'UsersController@report',
    ]);

    Route::get('user/daily_report', [
        'as' => 'backend.user.daily_report',
        'uses' => 'UsersController@daily_report',
    ]);

    Route::get('user/create', [
        'as' => 'backend.user.create',
        'uses' => 'UsersController@create',
    ]);

    Route::post('user/store', [
        'as' => 'backend.user.store',
        'uses' => 'UsersController@store',
    ]);

    Route::get('user/stat', [
        'as' => 'backend.user.stat',
        'uses' => 'UsersController@stat',
    ]);

    Route::get('user/specauth', [
        'as' => 'backend.user.specauth',
        'uses' => 'UsersController@specauth',
    ]);

    Route::get('user/back_login', [
        'as' => 'backend.user.back_login',
        'uses' => 'UsersController@back_login',
    ]);

    Route::post('profile/send_phone_code', [
        'as' => 'backend.profile.send_phone_code',
        'uses' => 'ProfileController@send_phone_code',
    ]);

    Route::post('user/massadd', [
        'as' => 'backend.user.massadd',
        'uses' => 'UsersController@massadd',
    ]);

    // These routes must come before user/{user} routes to avoid route conflicts
    Route::get('user/timezone', [
        'as' => 'backend.user.timezone',
        'uses' => 'UsersController@timezone',
    ]);

    Route::get('user/isconnected', [
        'as' => 'backend.user.isconnected',
        'uses' => 'UsersController@isconnected',
    ]);

    Route::get('user/onlineusers', [
        'as' => 'backend.user.onlineusers',
        'uses' => 'UsersController@onlineusers',
    ]);

    Route::get('user/{user}', [
        'as' => 'backend.user.show',
        'uses' => 'UsersController@show',
    ]);

    Route::get('user/{user}/edit', [
        'as' => 'backend.user.edit',
        'uses' => 'UsersController@edit',
    ]);

    Route::put('user/{user}', [
        'as' => 'backend.user.update',
        'uses' => 'UsersController@update',
    ]);

    Route::put('user/{user}/login-details', [
        'as' => 'backend.user.update.login-details',
        'uses' => 'UsersController@updateLoginDetails',
    ]);

    Route::delete('user/{user}', [
        'as' => 'backend.user.delete',
        'uses' => 'UsersController@destroy',
    ]);

    Route::delete('user/{user}/hard', [
        'as' => 'backend.user.hard_delete',
        'uses' => 'UsersController@hard_delete',
    ]);

    Route::post('user/{user}/avatar', [
        'as' => 'backend.user.update.avatar',
        'uses' => 'UsersController@updateAvatar',
    ]);

    Route::post('user/{user}/avatar/external', [
        'as' => 'backend.user.update.avatar.external',
        'uses' => 'UsersController@updateAvatarExternal',
    ]);

    Route::get('user/{user}/sessions', [
        'as' => 'backend.user.sessions',
        'uses' => 'UsersController@sessions',
    ]);

    Route::delete('user/{user}/sessions/{session}', [
        'as' => 'backend.user.sessions.invalidate',
        'uses' => 'UsersController@invalidateSession',
    ]);

    Route::post('user/{user}/two-factor/enable', [
        'as' => 'backend.user.two-factor.enable',
        'uses' => 'UsersController@enableTwoFactorAuth',
    ]);

    Route::post('user/{user}/two-factor/disable', [
        'as' => 'backend.user.two-factor.disable',
        'uses' => 'UsersController@disableTwoFactorAuth',
    ]);

    Route::post('user/{user}/action', [
        'as' => 'backend.user.action',
        'uses' => 'UsersController@action',
    ]);

    Route::post('user/{user}/toggle', [
        'as' => 'backend.user.toggle',
        'uses' => 'UsersController@toggle',
    ]);

    Route::delete('user/{user}', [
        'as' => 'backend.user.delete',
        'uses' => 'UsersController@destroy',
    ]);

    Route::post('user/{user}/kickout', [
        'as' => 'backend.user.kickout',
        'uses' => 'UsersController@kickout',
    ]);

    Route::get('game', [
        'as' => 'backend.game.list',
        'uses' => 'GamesController@index',
    ]);

    Route::get('games.json', [
        'as' => 'backend.game.list.json',
        'uses' => 'GamesController@index_json',
    ]);

    Route::get('game/create', [
        'as' => 'backend.game.create',
        'uses' => 'GamesController@create',
    ]);

    Route::post('game/create', [
        'as' => 'backend.game.store',
        'uses' => 'GamesController@store',
    ]);

    Route::get('game/setting', [
        'as' => 'backend.game.setting',
        'uses' => 'GamesController@get_game_settings',
    ]);

    Route::get('game/{game}/show', [
        'as' => 'backend.game.show',
        'uses' => 'GamesController@view',
    ]);

    Route::get('game/{game}', [
        'as' => 'backend.game.go',
        'uses' => 'GamesController@go',
    ]);

    Route::post('game/{game}/server', [
        'as' => 'backend.game.server',
        'uses' => 'GamesController@server',
    ]);

    Route::get('game/{game}/edit', [
        'as' => 'backend.game.edit',
        'uses' => 'GamesController@edit',
    ]);

    Route::post('game/{game}/update', [
        'as' => 'backend.game.update',
        'uses' => 'GamesController@update',
    ]);

    Route::delete('game/{game}', [
        'as' => 'backend.game.delete',
        'uses' => 'GamesController@delete',
    ]);

    Route::post('game/categories', [
        'as' => 'backend.game.categories',
        'uses' => 'GamesController@categories',
    ]);

    Route::post('game/update/mass', [
        'as' => 'backend.game.mass',
        'uses' => 'GamesController@mass',
    ]);

    Route::post('game/setting/savetemplate', [
        'as' => 'backend.game.savetemplate',
        'uses' => 'GamesController@savetemplate',
    ]);

    Route::post('game/setting/loadtemplate', [
        'as' => 'backend.game.loadtemplate',
        'uses' => 'GamesController@loadtemplate',
    ]);

    Route::post('game/update/view', [
        'as' => 'backend.game.view',
        'uses' => 'GamesController@views',
    ]);

    Route::post('game/clear', [
        'as' => 'backend.game.clear',
        'uses' => 'GamesController@clear_games',
    ]);

    Route::get('game/win_setting/{game}', [
        'as' => 'backend.game.win_setting',
        'uses' => 'GamesController@get_game_win_settings',
    ]);

    Route::post('game/store_win_setting', [
        'as' => 'backend.game.store_win_setting',
        'uses' => 'GamesController@update_game_win_settings',
    ]);

    Route::post('game/{game}/switch', [
        'as' => 'backend.game.switch',
        'uses' => 'GamesController@switch',
    ]);

    Route::get('categories', [
        'as' => 'backend.category.list',
        'uses' => 'CategoriesController@index',
        'middleware' => 'only_for_admin'
    ]);

    Route::get('category/create', [
        'as' => 'backend.category.create',
        'uses' => 'CategoriesController@create',
        'middleware' => 'only_for_admin'
    ]);

    Route::post('category/store', [
        'as' => 'backend.category.store',
        'uses' => 'CategoriesController@store',
        'middleware' => 'only_for_admin'
    ]);

    Route::get('category/{category}/edit', [
        'as' => 'backend.category.edit',
        'uses' => 'CategoriesController@edit',
        'middleware' => 'only_for_admin'
    ]);

    Route::put('category/{category}', [
        'as' => 'backend.category.update',
        'uses' => 'CategoriesController@update',
        'middleware' => 'only_for_admin'
    ]);

    Route::delete('category/{category}', [
        'as' => 'backend.category.delete',
        'uses' => 'CategoriesController@destroy',
        'middleware' => 'only_for_admin'
    ]);

    Route::get('shops', [
        'as' => 'backend.shop.list',
        'uses' => 'ShopsController@index',
    ]);

    Route::get('shop/create', [
        'as' => 'backend.shop.create',
        'uses' => 'ShopsController@create',
    ]);

    Route::post('shop/store', [
        'as' => 'backend.shop.store',
        'uses' => 'ShopsController@store',
    ]);

    Route::get('shops/admin/create', [
        'as' => 'backend.shop.admin_create',
        'uses' => 'ShopsController@admin_create',
    ]);

    Route::post('shops/admin/create', [
        'as' => 'backend.shop.admin_store',
        'uses' => 'ShopsController@admin_store',
    ]);

    Route::get('shop/get_demo', [
        'as' => 'backend.shop.get_demo',
        'uses' => 'ShopsController@get_demo',
    ]);

    Route::post('shop/fast_shop', [
        'as' => 'backend.shop.fast_shop',
        'uses' => 'ShopsController@fast_shop',
    ]);

    Route::post('shop/danger', [
        'as' => 'backend.shop.danger',
        'uses' => 'ShopsController@danger',
    ]);

    Route::get('shop/{shop}/edit', [
        'as' => 'backend.shop.edit',
        'uses' => 'ShopsController@edit',
    ]);

    Route::put('shop/{shop}', [
        'as' => 'backend.shop.update',
        'uses' => 'ShopsController@update',
    ]);

    Route::post('shops/balance', [
        'as' => 'backend.shop.balance',
        'uses' => 'ShopsController@balance',
    ]);

    Route::delete('shop/{shop}', [
        'as' => 'backend.shop.delete',
        'uses' => 'ShopsController@destroy',
    ]);

    Route::delete('shop/{shop}/hard', [
        'as' => 'backend.shop.hard_delete',
        'uses' => 'ShopsController@hard_delete',
    ]);

    Route::post('shop/{shop}/action', [
        'as' => 'backend.shop.action',
        'uses' => 'ShopsController@action',
    ]);

    Route::post('shop/{shop}/regenerate_jp', [
        'as' => 'backend.shop.regenerate_jp',
        'uses' => 'ShopsController@regenerate_jp',
    ]);

    Route::get('happyhours', [
        'as' => 'backend.happyhour.list',
        'uses' => 'HappyhoursController@index',
    ]);

    Route::get('happyhour/create', [
        'as' => 'backend.happyhour.create',
        'uses' => 'HappyhoursController@create',
    ]);

    Route::post('happyhour/store', [
        'as' => 'backend.happyhour.store',
        'uses' => 'HappyhoursController@store',
    ]);

    Route::get('happyhour/{happyhour}/edit', [
        'as' => 'backend.happyhour.edit',
        'uses' => 'HappyhoursController@edit',
    ]);

    Route::put('happyhour/{happyhour}', [
        'as' => 'backend.happyhour.update',
        'uses' => 'HappyhoursController@update',
    ]);

    Route::delete('happyhour/{happyhour}', [
        'as' => 'backend.happyhour.delete',
        'uses' => 'HappyhoursController@destroy',
    ]);

    Route::put('happyhour/{happyhour}/status', [
        'as' => 'backend.happyhour.status',
        'uses' => 'HappyhoursController@status',
    ]);

    Route::get('welcome_bonus', [
        'as' => 'backend.welcome_bonus.list',
        'uses' => 'WelcomeBonusController@index',
    ]);

    Route::get('welcome_bonus/{welcome_bonus}/edit', [
        'as' => 'backend.welcome_bonus.edit',
        'uses' => 'WelcomeBonusController@edit',
    ]);

    Route::put('welcome_bonus/{welcome_bonus}', [
        'as' => 'backend.welcome_bonus.update',
        'uses' => 'WelcomeBonusController@update',
    ]);

    Route::put('welcome_bonus/{welcome_bonus}/status', [
        'as' => 'backend.welcome_bonus.status',
        'uses' => 'WelcomeBonusController@status',
    ]);

    Route::get('apis', [
        'as' => 'backend.api.list',
        'uses' => 'ApisController@index',
    ]);

    Route::get('api/create', [
        'as' => 'backend.api.create',
        'uses' => 'ApisController@create',
    ]);

    Route::post('api/store', [
        'as' => 'backend.api.store',
        'uses' => 'ApisController@store',
    ]);

    Route::post('api/generate', [
        'as' => 'backend.api.generate',
        'uses' => 'ApisController@generate',
    ]);

    Route::get('api/json', [
        'as' => 'backend.api.json',
        'uses' => 'ApisController@json',
    ]);

    Route::get('api/{api}/edit', [
        'as' => 'backend.api.edit',
        'uses' => 'ApisController@edit',
    ]);

    Route::put('api/{api}', [
        'as' => 'backend.api.update',
        'uses' => 'ApisController@update',
    ]);

    Route::get('api/{api}/balance', [
        'as' => 'backend.api.balance',
        'uses' => 'ApisController@balance',
    ]);

    Route::delete('api/{api}', [
        'as' => 'backend.api.delete',
        'uses' => 'ApisController@destroy',
    ]);

    Route::get('articles', [
        'as' => 'backend.article.list',
        'uses' => 'ArticlesController@index',
        'middleware' => 'only_for_admin',
    ]);

    Route::get('article/create', [
        'as' => 'backend.article.create',
        'uses' => 'ArticlesController@create',
        'middleware' => 'only_for_admin',
    ]);

    Route::post('article/store', [
        'as' => 'backend.article.store',
        'uses' => 'ArticlesController@store',
        'middleware' => 'only_for_admin',
    ]);

    Route::get('article/{article}/edit', [
        'as' => 'backend.article.edit',
        'uses' => 'ArticlesController@edit',
        'middleware' => 'only_for_admin',
    ]);

    Route::put('article/{article}', [
        'as' => 'backend.article.update',
        'uses' => 'ArticlesController@update',
        'middleware' => 'only_for_admin',
    ]);

    Route::delete('article/{article}', [
        'as' => 'backend.article.delete',
        'uses' => 'ArticlesController@destroy',
        'middleware' => 'only_for_admin',
    ]);

    Route::get('rules', [
        'as' => 'backend.rule.list',
        'uses' => 'RulesController@index',
        'middleware' => 'only_for_admin',
    ]);

    Route::get('rule/{rule}/edit', [
        'as' => 'backend.rule.edit',
        'uses' => 'RulesController@edit',
        'middleware' => 'only_for_admin',
    ]);

    Route::put('rule/{rule}', [
        'as' => 'backend.rule.update',
        'uses' => 'RulesController@update',
        'middleware' => 'only_for_admin',
    ]);

    Route::get('jp/edit', [
        'as' => 'backend.jp.edit',
        'uses' => 'JackpotsController@edit',
    ]);

    Route::put('jp', [
        'as' => 'backend.jp.update',
        'uses' => 'JackpotsController@update',
    ]);

    Route::post('jp/regenerate', [
        'as' => 'backend.jp.regenerate',
        'uses' => 'JackpotsController@regenerate',
    ]);

    Route::get('jpgame', [
        'as' => 'backend.jpgame.list',
        'uses' => 'JackpotGamesController@index',
    ]);

    Route::get('jpgame/{jpgame}/edit', [
        'as' => 'backend.jpgame.edit',
        'uses' => 'JackpotGamesController@edit',
    ]);

    Route::put('jpgame/{jpgame}', [
        'as' => 'backend.jpgame.update',
        'uses' => 'JackpotGamesController@update',
    ]);

    Route::get('jpgame/global', [
        'as' => 'backend.jpgame.global',
        'uses' => 'JackpotGamesController@global',
    ]);

    Route::put('jpgame/global', [
        'as' => 'backend.jpgame.global_update',
        'uses' => 'JackpotGamesController@global_update',
    ]);

    Route::get('progress', [
        'as' => 'backend.progress.list',
        'uses' => 'ProgressController@index',
    ]);

    Route::get('progress/{progress}/edit', [
        'as' => 'backend.progress.edit',
        'uses' => 'ProgressController@edit',
    ]);

    Route::put('progress/{progress}', [
        'as' => 'backend.progress.update',
        'uses' => 'ProgressController@update',
    ]);

    Route::put('progress/{progress}/status', [
        'as' => 'backend.progress.status',
        'uses' => 'ProgressController@status',
    ]);

    Route::get('roles', [
        'as' => 'backend.role.index',
        'uses' => 'RolesController@index',
    ]);

    Route::get('role/create', [
        'as' => 'backend.role.create',
        'uses' => 'RolesController@create',
    ]);

    Route::post('role/store', [
        'as' => 'backend.role.store',
        'uses' => 'RolesController@store',
    ]);

    Route::get('role/{role}/edit', [
        'as' => 'backend.role.edit',
        'uses' => 'RolesController@edit',
    ]);

    Route::put('role/{role}', [
        'as' => 'backend.role.update',
        'uses' => 'RolesController@update',
    ]);

    Route::delete('role/{role}', [
        'as' => 'backend.role.delete',
        'uses' => 'RolesController@destroy',
    ]);

    Route::get('permissions', [
        'as' => 'backend.permission.index',
        'uses' => 'PermissionsController@index',
    ]);

    Route::get('permission/{permission}/edit', [
        'as' => 'backend.permission.edit',
        'uses' => 'PermissionsController@edit',
    ]);

    Route::put('permission/{permission}', [
        'as' => 'backend.permission.update',
        'uses' => 'PermissionsController@update',
    ]);

    Route::get('settings', [
        'as' => 'backend.settings.index',
        'uses' => 'SettingsController@index',
    ]);

    Route::put('settings', [
        'as' => 'backend.settings.update',
        'uses' => 'SettingsController@update',
    ]);

    Route::get('settings/generator', [
        'as' => 'backend.settings.generator',
        'uses' => 'DashboardController@generator',
    ]);

    Route::post('settings/generator', [
        'as' => 'backend.settings.generator.post',
        'uses' => 'DashboardController@generator',
    ]);

    Route::put('shops/block', [
        'as' => 'backend.settings.shop_block',
        'uses' => 'SettingsController@shop_block',
        'middleware' => 'permission:shops.block'
    ]);

    Route::put('shops/unblock', [
        'as' => 'backend.settings.shop_unblock',
        'uses' => 'SettingsController@shop_unblock',
        'middleware' => 'permission:shops.unblock'
    ]);

    Route::put('settings/sync', [
        'as' => 'backend.settings.sync',
        'uses' => 'SettingsController@sync'
    ]);

    Route::put('settings/delete/stat/game', [
        'as' => 'backend.settings.gelete_stat',
        'uses' => 'SettingsController@gelete_stat',
        'middleware' => 'only_for_admin'
    ]);

    Route::put('settings/delete/log/game', [
        'as' => 'backend.settings.gelete_log',
        'uses' => 'SettingsController@gelete_log',
        'middleware' => 'only_for_admin'
    ]);

    Route::get('post/poster', [
        'as' => 'backend.post.poster',
        'uses' => 'PostController@poster'
    ]);

    Route::get('post/video', [
        'as' => 'backend.post.video',
        'uses' => 'PostController@video'
    ]);

    Route::get('post/news', [
        'as' => 'backend.post.news',
        'uses' => 'PostController@news'
    ]);

    Route::get('post/notification', [
        'as' => 'backend.post.notification',
        'uses' => 'PostController@notification'
    ]);

    Route::post('post/addposter', [
        'as' => 'backend.post.addposter',
        'uses' => 'PostController@addposter'
    ]);

    Route::post('post/addvideo', [
        'as' => 'backend.post.addvideo',
        'uses' => 'PostController@addvideo'
    ]);

    Route::post('post/addnews', [
        'as' => 'backend.post.addnews',
        'uses' => 'PostController@addnews'
    ]);

    Route::post('post/addnotification', [
        'as' => 'backend.post.addnotification',
        'uses' => 'PostController@addnotification'
    ]);

    Route::post('post/delete', [
        'as' => 'backend.post.delete',
        'uses' => 'PostController@delete'
    ]);

    Route::get('bonus/setting', [
        'as' => 'backend.bonus.setting',
        'uses' => 'DashboardController@bonus_setting'
    ]);

    Route::get('bonus/logs', [
        'as' => 'backend.bonus.logs',
        'uses' => 'DashboardController@bonus_logs'
    ]);

    Route::post('bonus/update', [
        'as' => 'backend.bonus.update',
        'uses' => 'DashboardController@bonus_update'
    ]);

    Route::get('bonus/gamebonus', [
        'as' => 'backend.bonus.game',
        'uses' => 'DashboardController@gamebonus'
    ]);

    Route::get('setting', [
        'as' => 'backend.system.setting',
        'uses' => 'DashboardController@setting'
    ]);

    Route::post('setting/update', [
        'as' => 'backend.settings.update',
        'uses' => 'DashboardController@store_setting'
    ]);

    Route::post('bonus/update_game', [
        'as' => 'backend.bonus.update_game',
        'uses' => 'DashboardController@bonus_update_game'
    ]);
});

Route::domain('www.slotgame.games')->namespace('Frontend')->group(function () {    
// Route::domain('www.'.config('app.domain'))->namespace('Frontend')->group(function () {    
	// Route::get('/', [
    //     'as' => 'frontend.help',
    //     'uses' => 'PagesController@help'
    // ]);
    Route::get('/', [
        'as' => 'frontend.notify',
        'uses' => 'PagesController@notify'
    ]);

    Route::get('policy', [
        'as' => 'frontend.policy',
        'uses' => 'PagesController@policy'
    ]);
    Route::get('privacy', [
        'as' => 'frontend.privacy',
        'uses' => 'PagesController@privacy'
    ]);   
});