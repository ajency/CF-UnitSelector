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

Route::get( 'project/{id}', 'ProjectController@show' )->where( 'id', '[0-9]+' );

Route::group( ['prefix' => 'admin', 'middleware' => ['auth']], function() {
    Route::get( '/', 'Admin\AdminController@index' );
    Route::resource( 'project', 'Admin\ProjectController' );
    Route::resource( 'project.media', 'Admin\ProjectMediaController' );
    Route::resource( 'project.unittype', 'Admin\ProjectUnitTypeController' );
    Route::resource( 'project.bunglow-variant', 'Admin\ProjectBunglowVariantController' );
    Route::resource( 'project.bunglow-unit', 'Admin\ProjectBunglowUnitController' );
    Route::resource( 'phase', 'Admin\PhaseController' );
    Route::resource( 'project.roomtype', 'Admin\ProjectRoomTypeController' );
    Route::get( 'project/{id}/svg', 'Admin\ProjectController@svg' );
} );

Route::group( ['prefix' => 'api/v1', 'middleware' => ['auth']], function() {
    Route::resource( 'project', 'Rest\ProjectController', ['only' => ['index', 'show']] );
} );

Route::resource( 'projects', 'ProjectController' );

App::bind( 'CommonFloor\Gateways\RoomTypeGatewayInterface', 'CommonFloor\Gateways\RoomTypeGateway' );
App::bind( 'CommonFloor\Repositories\AttributesRepositoryInterface', 'CommonFloor\Repositories\AttributeRepository' );