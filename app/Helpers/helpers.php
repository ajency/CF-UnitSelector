<?php

/**
 * 
 * @param type $type_id
 * @return string
 */
define('BUNGLOWID',  '1');
define('PLOTID',  '2');
define('APARTMENTID',  '3');
define('PENTHOUSEID',  '4');

// globals for cf api calls
define('GET_PROPERTY_API_URL', 'http://www.commonfloor.com/api/project-v2/full-details?property_id=');
define('GET_CITIES_API_URL', 'http://www.commonfloor.com/api/geo-local-v2/get-cities');
define('GET_PROPERTIES_BY_CITY_API_URL', 'http://www.commonfloor.com/api/project-v2/get-projects?city=');
define('GET_AREA_BY_CITY_API_URL', 'http://www.commonfloor.com/autosuggest.php?item=area&c=');
define('GET_PROPERTIES_BY_AREA_API_URL', 'http://www.commonfloor.com/api/project-v2/get-projects?page_size=200&project_location_filter[]=null_area_');
define('BOOKING_SERVER_URL', 'http://stage.bookingcrm.commonfloor.com/');
define('GET_BOOKING_AMOUNT', 'get_booking_amount/');
define('GET_SELLING_AMOUNT', 'get_total_sale_value/');
define('GET_UNIT_PAYMENT_PLAN', 'unit_payment_plan/');
define('GET_UNIT_PRICE_SHEET', 'unit_price_sheet/');
define('BOOKING_PORTAL_URL', 'http://dev.commonfloor.com/book-your-property');
define('CF_API_KEY', 'nk8qh4vtri7l3hwotbsdtv2zl3p5u168');
 

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
        $propertyTypes[$projectPropertyType->property_type_id] = get_property_type( $projectPropertyType->property_type_id );
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

function getUserAssignedProject()
{
    $userId =  Auth::user()->id;
    $userRoles = \CommonFloor\User::find($userId)->userRole()->get(); 
    $project =[];
    
    foreach ($userRoles as $userRole)
    {
      $project[] = CommonFloor\UserRole::find($userRole['id'])->userProject()->where('project_id',$projectId)->get()->toArray();
    }
    return $project;
}

function getDefaultRole($userId)
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
}
 


function hasPermission($projectId, $userPermission)
{  
    $userId =  Auth::user()->id;
    $defaultRole = getDefaultRole($userId); 
 
    $flag = false;
    
    if($defaultRole['PROJECT_ACCESS']=='all')
    {
       $userRoles = \CommonFloor\User::find($userId)->userRole()->get()->toArray();       //GET ALL USER ROLES  
       $projectId=0;
    }
    else
    {
       $defaultRoleID = getDefaultRole($userId);
       $userRoles = \CommonFloor\User::find($userId)->userRole()->where('id','!=',$defaultRole['id'])->get()->toArray();       //GET ALL USER ROLES EXCEPT DEFAULT  
    }   
    
    $permissions =[];
  
    foreach ($userRoles as $userRole)
    {
        if($projectId)      //GET ROLES ONLY FOR THE PROJECT
        {
            $project = CommonFloor\UserRole::find($userRole['id'])->userProject()->where('project_id',$projectId)->get()->toArray();
            if(!empty($project))
            {
                if(in_array('read_project', $userPermission))
                   $permissions[$userRole['role_id']]=['read_project'] ;
                else   
                    $permissions[$userRole['role_id']] = \CommonFloor\Role::find($userRole['role_id'])->perms()->whereIn('name', $userPermission)->get()->toArray();//pass permission
            }
        }
        else
        {
            if(in_array('read_project', $userPermission))
               $permissions[$userRole['role_id']]=['read_project'] ;
            else 
               $permissions[$userRole['role_id']] = \CommonFloor\Role::find($userRole['role_id'])->perms()->whereIn('name', $userPermission)->get()->toArray();//pass permission
        }
        
        if(!empty($permissions[$userRole['role_id']]))
        {
            $flag = true;
            break;
        }
    }
     
    return $flag;
 
}
