<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It's a breeze. Simply tell Laravel the URIs it should respond to
  | and give it the controller to call when that URI is requested.
  |
 */

Route::get( '/', 'WelcomeController@index' );

Route::controllers( [
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
] );


Route::group( ['prefix' => 'admin', 'middleware' => ['auth']], function() {
    Route::get( '/', 'Admin\AdminController@index' );
    Route::resource( 'project', 'Admin\ProjectController' );
    Route::get( 'project/{id}/svg', 'Admin\ProjectController@svg' );
} );

