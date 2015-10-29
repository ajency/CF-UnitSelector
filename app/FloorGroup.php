<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class FloorGroup extends Model {

	public $timestamps = false;

	public function setFloorsAttribute( $value ) {
        $this->attributes['floors'] = serialize( $value );
    }

    public function getFloorsAttribute( $value ) {
        return unserialize( $value );
    }

}
