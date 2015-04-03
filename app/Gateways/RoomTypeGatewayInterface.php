<?php

namespace CommonFloor\Gateways;

/**
 * RoomTypeGatewayInterface 
 * @author surajair
 */
interface RoomTypeGatewayInterface {

    public function getAllRoomTypes();

    public function getRoomTypeAttributes( $roomTypeId );
    
}
