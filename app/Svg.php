<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Svg extends Model {

    public function getOtherDetailsAttribute( $value ) {
        return maybe_unserialize( $value );
    }

    public function setOtherDetailsAttribute( $value ) {
         $this->attributes['other_details'] = maybe_serialize( $value );
    }

}
