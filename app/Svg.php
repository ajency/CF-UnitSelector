<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Svg extends Model {

	protected $table = 'svg';
	public $timestamps = false;

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
