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
Route::group( ['prefix' => 'admin', 'middleware' => ['auth','permission']], function() {
    Route::get( '/', 'Admin\AdminController@index' );
    Route::resource( 'project', 'Admin\ProjectController' );
    Route::resource( 'user', 'Admin\UserController' );
    Route::resource( 'role', 'Admin\RoleController' );
    Route::resource( 'project.media', 'Admin\ProjectMediaController' );
    Route::resource( 'variant.media', 'Admin\VariantMediaController' );
    Route::resource( 'building.media', 'Admin\BuildingMediaController' );
    Route::resource( 'project.unittype', 'Admin\ProjectUnitTypeController' );
    Route::resource( 'project.bunglow-variant', 'Admin\ProjectBunglowVariantController' );
    Route::resource( 'project.apartment-variant', 'Admin\ProjectApartmentVariantController' );
    Route::resource( 'project.plot-variant', 'Admin\ProjectPlotVariantController' );
    Route::resource( 'project.apartment-unit', 'Admin\ProjectApartmentUnitController' );
    Route::resource( 'project.bunglow-unit', 'Admin\ProjectBunglowUnitController' );
    Route::resource( 'project.plot-unit', 'Admin\ProjectPlotUnitController' );
    Route::resource( 'project.building', 'Admin\ProjectBuildingController' );
    Route::resource( 'project.floor-layout', 'Admin\ProjectFloorLayoutController' );
    Route::resource( 'project.svg-tool', 'Admin\SvgController' );
    Route::resource( 'phase', 'Admin\PhaseController' );
    Route::resource( 'project.roomtype', 'Admin\ProjectRoomTypeController' );
    Route::resource( 'floor-layout.position', 'Admin\FloorLayoutPositionController' );
    Route::resource( 'floor-layout.media', 'Admin\FloorLayoutMediaController' );
    Route::post( 'project/{project}/updateprojectstatus', 'Admin\ProjectController@updateProjectStatus' );
    Route::post( 'project/validateprojecttitle', 'Admin\ProjectController@validateProjectTitle' );
    Route::post( 'user/validateuserpassword', 'Admin\UserController@validateCurrentPassword' );
    Route::post( 'user/validateuseremail', 'Admin\UserController@validateEmail' );
    Route::get( 'user/{id}/changepassword', 'Admin\UserController@changePassword' );
    Route::get( 'project/{project}/svg', 'Admin\ProjectController@svg' );
    Route::get( 'project/{project}/summary', 'Admin\ProjectController@summary' );
    Route::get( 'project/{project}/getphasedata/{phase}', 'Admin\ProjectController@getPhaseData' );
    Route::get( 'project/{project}/validateprojectphase', 'Admin\ProjectController@validateProjectPhase' );
    Route::get( 'project/{project}/projectpublishdata', 'Admin\ProjectController@projectPublishData' );
    Route::get( 'project/{project}/cost', 'Admin\ProjectController@cost' );
    Route::post( 'project/{project}/costupdate', 'Admin\ProjectController@costUpdate' );
    Route::get( 'project/{project}/filters', 'Admin\ProjectController@filters' );
    Route::post( 'project/{project}/updatefilters', 'Admin\ProjectController@updateFilters' );
    Route::post( 'project/{project}/bunglow-variant/{id}/roomtypeattributes', 'Admin\ProjectBunglowVariantController@roomtypeAttributes' );
    Route::delete( 'project/{project}/roomtype/{id}/deleteroomtypeattributes', 'Admin\ProjectRoomTypeController@deleteRoomTypeAttribute' );
    Route::post( 'project/{project}/roomtype/{id}/getroomtypeattributes', 'Admin\ProjectRoomTypeController@getRoomTypeAttributes' );
    Route::post( 'project/{project}/building/{id}/getpositions', 'Admin\ProjectBuildingController@getPositions' );
    Route::post( 'project/{project}/floor-layout/{id}/getunittypevariants', 'Admin\ProjectFloorLayoutController@getUnitTypeVariant' );
    Route::post( 'project/{project}/media/updatebreakpoint', 'Admin\ProjectMediaController@updateBreakPoint' );
    Route::post( 'building/{id}/media/updatebreakpoint', 'Admin\BuildingMediaController@updateBreakPoint' );
    Route::post( 'project/{project}/apartment-variant/getpropertytypedata','Admin\ProjectApartmentVariantController@getPropertyTypeData' );
    Route::post( 'project/{project}/apartment-variant/getunittypevariants','Admin\ProjectApartmentVariantController@getUnitTypeVariants' );
    Route::post( 'project/{project}/apartment-unit/getavailableposition','Admin\ProjectApartmentUnitController@getAvailablePosition' );
    Route::get( 'project/{project}/attributes/addroomtype', 'Admin\ProjectRoomTypeController@addRoomType' );
    Route::delete( 'project/{project}/bunglow-variant/{id}/deletelevel', 'Admin\ProjectBunglowVariantController@deleteLevel' );
    Route::get( 'project/{projectid}/image/{imageid}', 'Admin\SvgController@show' );
    Route::post( 'project/{projectid}/image/{imageid}/downloadSvg', 'Admin\SvgController@downloadSvg' );
    Route::get( 'project/{id}/image/{imageid}/authoring-tool', 'Admin\ProjectController@loadMasterSvgTool' );

    
});


/**
 * REST API routes
 */
Route::group( ['prefix' => 'api/v1'], function() {
    Route::resource( 'project', 'Rest\ProjectController', ['only' => ['index', 'show']] );
    Route::get( 'project/{id}/step-two', 'Rest\ProjectController@stepTwo' );
    Route::get('buildings/{$id}/floor-layout', 'Rest\BuildingFloorLayoutController@getFloorLayoutForFloor');
    Route::get('project/{id}/update-response-table', 'Rest\ProjectController@updateResponseTable');
} );

/**
 * REST API routes
 */
Route::group( ['prefix' => 'api/v2'], function() {
    Route::post( 'project/{id}/unit/{unit_id}', 'Rest\ProjectController@updateUnit' );
    Route::get( 'project/{id}/unit/{unit_id}', 'Rest\ProjectController@getUnit' );
    Route::get( 'get-project-url', 'Rest\ProjectController@getCfProjectUrl' );
    Route::get( 'get-unit-status', 'Rest\ProjectController@getUnitStatus' );
} );

/**
 * Service bindings
 */
App::bind( 'CommonFloor\Gateways\ProjectGatewayInterface', 'CommonFloor\Gateways\ProjectGateway' );
App::bind( 'CommonFloor\Repositories\ProjectRepositoryInterface', 'CommonFloor\Repositories\ProjectRepository' );
