<?php

namespace CommonFloor\Gateways;

use CommonFloor\RoomType;
use CommonFloor\Repositories\AttributeRepository;

/**
 * Description of RoomTypeGateway
 *
 * @author surajair
 */
class RoomTypeGateway implements RoomTypeGatewayInterface {

    private $roomType;
    private $attributeRepository;

    public function __construct( RoomType $roomType, AttributeRepository $attributeRepository ) {
        $this->roomType = $roomType;
        $this->attributeRepository = $attributeRepository;
    }

    public function getAllRoomTypes() {
        return $this->roomType->all();
    }

    public function getRoomTypeAttributes( $roomTypeId ) {
        return $this->roomType->attributes;
    }

}
