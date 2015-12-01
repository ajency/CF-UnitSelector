<?php
//property type defines
define('BUNGLOWID',  '1');
define('PLOTID',  '2');
define('APARTMENTID',  '3');
define('PENTHOUSEID',  '4');

// globals for cf api calls
define('CF_WEBSITE_URL', 'http://www.commonfloor.com');
define('GET_PROPERTY_API_URL', 'http://www.commonfloor.com/api/project-v2/full-details?property_id=');
define('GET_CITIES_API_URL', 'http://www.commonfloor.com/api/geo-local-v2/get-cities');
define('GET_PROPERTIES_BY_CITY_API_URL', 'http://www.commonfloor.com/api/project-v2/get-projects?city=');
define('GET_AREA_BY_CITY_API_URL', 'http://www.commonfloor.com/autosuggest.php?item=area&c=');
define('GET_PROPERTIES_BY_AREA_API_URL', 'http://www.commonfloor.com/api/project-v2/get-projects?page_size=200&project_location_filter[]=null_area_');
define('BOOKING_SERVER_URL', 'http://bookingcrm.cfunitselectortest.com/');
//define('BOOKING_SERVER_URL', 'http://127.0.0.1:8000/');
define('GET_BOOKING_AMOUNT', 'get_booking_amount/');
define('GET_SELLING_AMOUNT', 'get_total_sale_value/');
define('GET_UNIT_PRICE', 'unit_price_sheet/');
define('GET_UNIT_PAYMENT_PLAN', 'unit_payment_plan/');
define('GET_UNIT_PRICE_SHEET', 'unit_price_sheet/');
define('ADD_BOOKING_UNIT', 'addUnit/');
define('MAKE_BOOKING', 'makebooking/');
define('BOOKING_PORTAL_URL', 'http://bookingcrm.cfunitselectortest.com/book-your-property');
//define('BOOKING_PORTAL_URL', 'http://127.0.0.1:8000/book-your-property');
define('CF_API_KEY', 'nk8qh4vtri7l3hwotbsdtv2zl3p5u168');
define('unitSelectorAuthKey','117ce294ece0684f69ad92ae450ba370b1259f69');  
define('BOOKING_ENGINE_URL', 'http://booking.cfunitselectortest.com/');

/**BOOKING CONSTANT***/
define('EXPIREDURATION', 3);

define('PAYMENT_STATUS_INITIALIZED', "initialized");
define('PAYMENT_STATUS_SUCCESSFUL', "captured");
define('PAYMENT_STATUS_UNSUCCESSFUL', "unsuccessful");

define('PAYMENT_HISTORY_ACTIVE', "1");
define('PAYMENT_HISTORY_INACTIVE', "0");

define('BOOKING_HISTORY_STATUS_START_BOOKING', "----");
define('BOOKING_HISTORY_STATUS_BOOKING_INITIALIZED', "initialized");
define('BOOKING_HISTORY_STATUS_BOOKING_PROGRESS', "Booking in Progress");
define('BOOKING_HISTORY_STATUS_BOOKING_NEW', "New");
define('BOOKING_HISTORY_STATUS_BOOKING_BOOKED', "Booked");
define('BOOKING_HISTORY_STATUS_REFUND_INITIATED', "Refund Initiated");
define('BOOKING_HISTORY_STATUS_REFUND_COMPLETE', "Refunded");
define('BOOKING_HISTORY_STATUS_REFUND_ERROR', "Error while refund process");

define('BOOKING_HISTORY_COMMENT_BUYER_OPTION', "Buyer choose to buy");
define('BOOKING_HISTORY_COMMENT_PAYMENT_INITIALIZED', "Payment Initialized");
define('BOOKING_HISTORY_COMMENT_PAYMENT_SUCCESS', "Payment Success");


 
/**
 * 
 * @param type $type_id
 * @return string
 */
function get_property_type( $type_id ) {
    $types = [];
    $propertyTypes = CommonFloor\Defaults::where('type','property_types')->get()->toArray();
    foreach ($propertyTypes as $type) {
        $types[$type['id']] = $type['label'];
    }
    
    return $types[$type_id];
}    

function get_all_property_type() {
    $types = [];
    $propertyTypes = CommonFloor\Defaults::where('type','property_types')->get()->toArray(); 
    foreach ($propertyTypes as $type) {
        $types[$type['id']] = $type['label'];
    }

    return $types;
}

function get_all_unit_type() {
    $types = [];
    $propertyTypeIds = ["villa_unit_types"=>"1","plot_unit_types"=>"2","appartment_unit_types"=>"3","penthouse_unit_types"=>"4"];
    
    foreach ($propertyTypeIds as $key=>$value)
    {
        $unitTypes = CommonFloor\Defaults::where('type',$key)->get()->toArray();
        foreach ($unitTypes as $type) {
            $types[$value][$type['id']] = $type['label'];
        } 
    }

    return $types;
}

function project_property_types( $projectId ) {
    $propertyTypes = [];
    
    foreach (\CommonFloor\Project::find( $projectId )->projectPropertyTypes as $projectPropertyType) {
        $propertyTypes[$projectPropertyType->property_type_id]['NAME'] = get_property_type( $projectPropertyType->property_type_id );
        $propertyTypes[$projectPropertyType->property_type_id]['ID'] = $projectPropertyType->id;
    }
   
    return $propertyTypes;
}

function property_type_slug( $name ) {
    $name = $name === 'Villas/Bungalows' ? 'Bunglow' : $name;
    if ($name === 'Apartments') {
        $name = 'Apartment';
    }

    return Illuminate\Support\Str::slug( $name );
}

function get_rest_api_url() {
    return url( 'api/v1' );
}

function get_locale_frontend_to_json( $lang = "en-US" ) {
    $messages = [

        "en-US" => [
            "welcome" => "Welcome message",
            "know_your_neighbour" => "Know your neighborhood. The orange markers are important landmarks. 
                                    Click for more information.",
            "project_details"   => "Project Details",
            "project_by"        => "Project by",
            "explore"           => "Explore",
            "project_type"      => "Property Type",
            "starting_area"     => "Starting Area",
            "unit_types"        => "Unit Types",
            "available"         => "Available",
            "starting_price"    => "Starting Price"

        ]

    ];
    return json_encode( $messages[$lang] );
}

function getUserAssignedProject($userId)
{
    $userRoleId = \CommonFloor\User::find($userId)->userRole()->first()->id; 
    $project= CommonFloor\UserRole::find($userRoleId)->userProject()->where('project_id','!=','0')->get()->toArray();
 
    return $project;
}

/*function getDefaultRole($userId)
{
   $userRoles = \CommonFloor\User::find($userId)->userRole()->get();
   $defaultRoleId = [];
   foreach ($userRoles as $userRole)
   {
        $project = CommonFloor\UserRole::find($userRole['id'])->userProject()->first()->toArray();
         
        if(!$project['project_id'])
        {  
           $defaultRoleId = $userRole; 
           $defaultRoleId['PROJECT_ACCESS'] = \CommonFloor\Role::find($userRole['role_id'])->project_access; 
           break;
        }
    }
    return $defaultRoleId;
}*/

function getDefaultRole($userId)
{
   $userRole = \CommonFloor\User::find($userId)->userRole()->first(); 
   $roleId =  $userRole->role_id;    
   $defaultRoleId = $userRole; 
   $defaultRoleId['PROJECT_ACCESS'] = \CommonFloor\Role::find($roleId)->project_access;
   
    return $defaultRoleId;
}
 
function isAgent()
{
     if(Auth::user()->is_agent=='yes')
         $return = true;
    else
        $return = false;
    
    return $return;
}

function hasPermission($projectId, $userPermission)
{  
    $userId =  Auth::user()->id;
    $defaultRole = getDefaultRole($userId);  
    $userRoleId = $defaultRole->id;
    $roleId = $defaultRole->role_id;
 
    $flag = false;
    
    if($defaultRole['PROJECT_ACCESS']=='all')
       $projectId=0;

 
    $permissions =[];
 
    if($projectId)      //GET ROLES ONLY FOR THE PROJECT
    {
        $project = CommonFloor\UserRole::find($userRoleId)->userProject()->where('project_id',$projectId)->get()->toArray();
        if(!empty($project))
        {
            if(in_array('read_project', $userPermission))
               $permissions[$userRoleId]=['read_project'] ;
            else   
                $permissions[$userRoleId] = \CommonFloor\Role::find($roleId)->perms()->whereIn('name', $userPermission)->get()->toArray();//pass permission
        }
    }
    else
    {  
        if(in_array('read_project', $userPermission))
           $permissions[$userRoleId]=['read_project'] ;
        else 
           $permissions[$userRoleId] = \CommonFloor\Role::find($roleId)->perms()->whereIn('name', $userPermission)->get()->toArray();//pass permission
    }

    if(!empty($permissions[$userRoleId]))
    {
        $flag = true;
    }
    
     
    return $flag;
 
}

function hasUnitAccess($unitId)
{
    $flag = false;
    $userId =  Auth::user()->id;
    $userUnit = \CommonFloor\AgentUnit::where('user_id',$userId)->where('unit_id',$unitId)->get()->toArray(); 
    if(!empty($userUnit))
    {
        $flag = true;
    }
 
    return $flag;
}

function isValidUnit($projectId,$unitId)
{
    
    $variantId = \CommonFloor\Unit::find($unitId)->unit_variant_id;
    $unitTypeId = \CommonFloor\UnitVariant::find($variantId)->unitType()->first()->id;
    $project= \CommonFloor\UnitType::find($unitTypeId)->projectPropertyType()->where('project_id',$projectId)->first();  
    
    if($project==null)
    { 
        abort(404);
    }
}

function isValidVariant($projectId,$variantId)
{
    $unitTypeId = \CommonFloor\UnitVariant::find($variantId)->unitType()->first()->id;
    $project= \CommonFloor\UnitType::find($unitTypeId)->projectPropertyType()->where('project_id',$projectId)->first();
    
    if($project==null)
        abort(404);
 
}

function updateBlockedUnitsToAvailable()
{

    $dateTime = date("Y-m-d H:i:s", strtotime("-15 minutes"));  
    $units = \CommonFloor\Unit::whereIn('availability',['blocked','payment_in_progress'])->where('booking_id','!=','')->where('updated_at','<=',$dateTime)->get()->lists('id');
    $updateUnits = \CommonFloor\Unit::whereIn('id',  $units)->update(array('availability' => 'available')); 
    return true;
}

function isUnitBlocked($variantId)
{
   $units = \CommonFloor\Unit::whereIn('availability',['blocked','payment_in_progress'])->where('unit_variant_id',$variantId)->count();
 
   $return = false;
   if($units)
       $return = true;

   return $return;
}
