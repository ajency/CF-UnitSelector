<?php

namespace CommonFloor\Repositories;

use CommonFloor\Attribute;

/**
 * Description of AttributeRepository
 *
 * @author surajair
 */
class AttributeRepository implements AttributesRepositoryInterface{

    private $attribute;

    public function __construct( Attribute $attribute ) {
        $this->attribute = $attribute;
    }
    
    public function getAttributesFor( $attributableType, $attributableId ) {
        
    }

}
