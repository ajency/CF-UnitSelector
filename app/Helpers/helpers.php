<?php

/**
 * 
 * @param type $type_id
 * @return string
 */
function get_property_type( $type_id ) {
    $types = [
        '1' => 'Apartments',
        '2' => 'Bunglows/Villas',
        '3' => 'Penthouse',
        '4' => 'Land'
    ];

    return $types[$type_id];
}

function get_rest_api_url() {
    return url( 'api/v1' );
}

function get_locale_frontend_to_json() {
    $messages = [
        "welcome" => "Welcome message"
    ];
    return json_encode( $messages );
}
