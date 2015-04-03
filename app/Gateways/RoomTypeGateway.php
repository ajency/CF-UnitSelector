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

    public function __construct( RoomType $roomType ) {
        $this->roomType = $roomType;
    }

    public function getAllRoomTypes() {
        return $this->roomType->all();
    }

    public function getRoomTypeAttributes( $roomTypeId ) {
        return $this->roomType->attributes;
    }

    public function createNewRoomType( $roomName ) {
        $roomType = $this->roomType->newInstance();
        $roomType->name = $roomName;
        $roomType->save();
        return $roomType;
    }

}
