<?php

/**
 * 
 * @param type $type_id
 * @return string
 */
function get_property_type( $type_id ) {
    $types = [];
    $propertyTypes = \CommonFloor\PropertyType::all()->toArray();
    foreach ($propertyTypes as $type) {
        $types[$type['id']] = $type['name'];
    }

    return $types[$type_id];
}    

function project_property_types( $projectId ) {
    $propertyTypes = [];
    foreach (\CommonFloor\Project::find( $projectId )->projectPropertyTypes as $projectPropertyType) {
        $propertyTypes[$projectPropertyType->property_type_id] = \CommonFloor\PropertyType::find( $projectPropertyType->property_type_id );
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
