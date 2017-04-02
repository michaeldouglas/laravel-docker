<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Grupo de rotas: request
Route::group(['prefix' => 'request', 'as' => 'request.'], function () {
    Route::get('/get_locale/portal/pt_BR', ['uses' => 'RequestController@getLocale'])->name('locale');
    Route::get('/get_json/header', ['uses' => 'RequestController@getHeader'])->name('header');
    Route::get('/get_json/menu-mobile', ['uses' => 'RequestController@getMenuMobile'])->name('menumobile');
});