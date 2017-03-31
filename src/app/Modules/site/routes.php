<?php

Route::group(['namespace' => 'Modules\site\Controllers', 'middleware' => ['web']], function () {

    // Rotas do site
    Route::get('/', ['uses' => 'PortalController@index']);

});