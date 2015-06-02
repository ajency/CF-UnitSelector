<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class SvgElement extends Model {

    public $timestamps = false;

    public function svg() {
        return $this->belongsTo( 'CommonFloor\Svg' );
    }

    public function getOtherDetailsAttribute( $value ) {
        return unserialize( $value );
    }

    public function setOtherDetailsAttribute( $value ) {
         $this->attributes['other_details'] = serialize( $value );
    }

    public function getPointsAttribute( $value ) {
        return unserialize( $value );
    }

    public function setPointsAttribute( $value ) {
         $this->attributes['points'] = serialize( $value );
    }    

}
