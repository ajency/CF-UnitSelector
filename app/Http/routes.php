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

/**
 * Home page route
 */
Route::get( '/', 'WelcomeController@index' );

/**
 * Auth and forgot password route
 */
Route::controllers( [
    'auth' => 'Auth\AuthController',
    'password' => 'Auth\PasswordController',
] );

/**
 * Single project unit selector route
 */
Route::get( 'project/{id}', 'ProjectController@show' )->where( 'id', '[0-9]+' );

/**
 * Backend Admin routes
 */
Route::group( ['prefix' => 'admin', 'middleware' => ['auth']], function() {
    Route::get( '/', 'Admin\AdminController@index' );
    Route::resource( 'project', 'Admin\ProjectController' );
    Route::resource( 'project.media', 'Admin\ProjectMediaController' );
    Route::resource( 'variant.media', 'Admin\VariantMediaController' );
    Route::resource( 'building.media', 'Admin\BuildingMediaController' );
    Route::resource( 'project.unittype', 'Admin\ProjectUnitTypeController' );
    Route::resource( 'project.bunglow-variant', 'Admin\ProjectBunglowVariantController' );
    Route::resource( 'project.apartment-variant', 'Admin\ProjectApartmentVariantController' );
    Route::resource( 'project.apartment-unit', 'Admin\ProjectApartmentUnitController' );
    Route::resource( 'project.bunglow-unit', 'Admin\ProjectBunglowUnitController' );
    Route::resource( 'project.building', 'Admin\ProjectBuildingController' );
    Route::resource( 'project.floor-layout', 'Admin\ProjectFloorLayoutController' );
    Route::resource( 'phase', 'Admin\PhaseController' );
    Route::resource( 'project.roomtype', 'Admin\ProjectRoomTypeController' );
    Route::resource( 'floor-layout.position', 'Admin\FloorLayoutPositionController' );
    Route::resource( 'floor-layout.media', 'Admin\FloorLayoutMediaController' );
    Route::get( 'project/{id}/svg', 'Admin\ProjectController@svg' );
    Route::post( 'project/{projectid}/bunglow-variant/{id}/roomtypeattributes', 'Admin\ProjectBunglowVariantController@roomtypeAttributes' );
    Route::delete( 'project/{projectid}/roomtype/{id}/deleteroomtypeattributes', 'Admin\ProjectRoomTypeController@deleteRoomTypeAttribute' );
    Route::post( 'project/{projectid}/bunglow-variant/{id}/getroomtypeattributes', 'Admin\ProjectBunglowVariantController@getRoomTypeAttributes' );
    Route::post( 'project/{projectid}/building/{id}/getpositions', 'Admin\ProjectBuildingController@getPositions' );
    Route::post( 'project/{projectid}/floor-layout/{id}/getunittypevariants', 'Admin\ProjectFloorLayoutController@getUnitTypeVariant' );
} );

/**
 * REST API routes
 */
Route::group( ['prefix' => 'api/v1'], function() {
    Route::resource( 'project', 'Rest\ProjectController', ['only' => ['index', 'show']] );
    Route::get( 'project/{id}/step-two', 'Rest\ProjectController@stepTwo' );
    Route::get('buildings/{$id}/floor-layout', 'Rest\BuildingFloorLayoutController@getFloorLayoutForFloor');
} );

/**
 * Service bindings
 */
App::bind( 'CommonFloor\Gateways\ProjectGatewayInterface', 'CommonFloor\Gateways\ProjectGateway' );
App::bind( 'CommonFloor\Repositories\ProjectRepositoryInterface', 'CommonFloor\Repositories\ProjectRepository' );
