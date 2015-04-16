<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Building extends Model {

    public function setFloorsAttribute( $value ) {
        $this->attributes['floors'] = serialize( $value );
    }

    public function getFloorsAttribute( $value ) {
        return unserialize( $value );
    }

    public function setBuildingMasterAttribute( $value ) {
        $this->attributes['building_master'] = serialize( $value );
    }

    public function getBuildingMasterAttribute( $value ) {
        return unserialize( $value );
    }

}
