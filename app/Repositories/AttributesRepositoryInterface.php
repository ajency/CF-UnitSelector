<?php

namespace CommonFloor\Repositories;

/**
 * AttributesRepositoryInterface 
 * @author surajair
 */
interface AttributesRepositoryInterface {
    public function getAttributesFor( $attributableType, $attributableId );
}
