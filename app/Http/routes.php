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
    Route::post( 'user/validateuserphone', 'Admin\UserController@validatePhone' );
    Route::post( 'user/{id}/changepassword', 'Admin\UserController@changePassword' );
    Route::get( 'user/{id}/profile', 'Admin\UserController@profile' );
    Route::put( 'user/{id}/profileupdate', 'Admin\UserController@profileUpdate' );
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
    Route::delete( 'project/{project}/roomtype/{id}/deleteattribute', 'Admin\ProjectRoomTypeController@deleteAttribute' );
    Route::delete( 'project/{project}/roomtype/{id}/deletevariantrroom', 'Admin\ProjectRoomTypeController@deleteVariantRoom' );
    Route::post( 'project/{project}/roomtype/{id}/getroomtypeattributes', 'Admin\ProjectRoomTypeController@getRoomTypeAttributes' );
    Route::post( 'project/{project}/building/{id}/getpositions', 'Admin\ProjectBuildingController@getPositions' );
    Route::post( 'building/validatebuildingname', 'Admin\ProjectBuildingController@validateBuildingName' );
    Route::post( 'project/{project}/floor-layout/{id}/getunittypevariants', 'Admin\ProjectFloorLayoutController@getUnitTypeVariant' );
    Route::post( 'project/{project}/media/updatebreakpoint', 'Admin\ProjectMediaController@updateBreakPoint' );
    Route::post( 'building/{id}/media/updatebreakpoint', 'Admin\BuildingMediaController@updateBreakPoint' );
    Route::post( 'project/{project}/apartment-variant/getpropertytypedata','Admin\ProjectApartmentVariantController@getPropertyTypeData' );
    Route::post( 'project/{project}/apartment-variant/getunittypevariants','Admin\ProjectApartmentVariantController@getUnitTypeVariants' );
    Route::post( 'project/{project}/apartment-unit/getavailableposition','Admin\ProjectApartmentUnitController@getAvailablePosition' );
    Route::post( 'project/{project}/apartment-unit/validatebuildingunitname','Admin\ProjectApartmentUnitController@validateBuildingUnitName' );
    Route::post( 'project/{project}/bunglow-unit/validateunitname','Admin\ProjectBunglowUnitController@validateUnitName' );
    Route::get( 'project/{project}/attributes/addroomtype', 'Admin\ProjectRoomTypeController@addRoomType' );
    Route::delete( 'project/{project}/bunglow-variant/{id}/deletelevel', 'Admin\ProjectBunglowVariantController@deleteLevel' );
    Route::get( 'project/{projectid}/image/{imageid}', 'Admin\SvgController@show' );
    Route::post( 'project/{projectid}/image/{imageid}/downloadSvg', 'Admin\SvgController@downloadSvg' );
    Route::get( 'project/{id}/image/{imageid}/authoring-tool', 'Admin\ProjectController@loadMasterSvgTool' );
    Route::post( 'project/{project}/apartment-unit/unitimport', 'Admin\ProjectApartmentUnitController@unitImport' );
    Route::get( 'project/{project}/unitexport/{id}', 'Admin\ProjectController@unitExport' );
    
});


/**
 * REST API routes
 */
Route::group( ['prefix' => 'api/v1'], function() {
    Route::resource( 'project', 'Rest\ProjectController', ['only' => ['index', 'show']] );
    Route::get( 'project/{id}/step-two', 'Rest\ProjectController@stepTwo' );
    Route::get('buildings/{$id}/floor-layout', 'Rest\BuildingFloorLayoutController@getFloorLayoutForFloor');
    Route::get('project/{id}/update-response-table', 'Rest\ProjectController@updateResponseTable');
    Route::get( 'get-cities', 'Rest\ProjectController@getAPICities' );
    Route::get( 'get-areas-by-city', 'Rest\ProjectController@getAPIAreaByCity' );
    Route::get( 'get-projects-by-area', 'Rest\ProjectController@getProjectsByArea' );
    Route::get( 'get-builder-image-url', 'Rest\ProjectController@builderImageUrl' );
    Route::get( 'get-booking-amount', 'Rest\ProjectController@getBookingAmount' );
    Route::get( 'get-selling-amount', 'Rest\ProjectController@getSellingAmount' );
    Route::get( 'get-unit-payment-plan', 'Rest\ProjectController@getUnitPaymentPlan' );
    Route::get( 'get-unit-price-sheet', 'Rest\ProjectController@getUnitPriceSheet' );
} );

/**
 * REST API routes
 */
Route::group( ['prefix' => 'api/v2', 'middleware' => ['whitelistip']], function() {
    Route::post( 'unit/{unit_id}', 'Rest\UnitController@updateUnit' );
    Route::get( 'unit/{unit_id}', 'Rest\UnitController@getUnit' );
    Route::get( 'get-project-url', 'Rest\UnitController@getCfProjectUrl' );
    Route::get( 'get-unit-status', 'Rest\UnitController@getUnitStatus' );
} );

/**
 * Service bindings
 */
App::bind( 'CommonFloor\Gateways\ProjectGatewayInterface', 'CommonFloor\Gateways\ProjectGateway' );
App::bind( 'CommonFloor\Repositories\ProjectRepositoryInterface', 'CommonFloor\Repositories\ProjectRepository' );
