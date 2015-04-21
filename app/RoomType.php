<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class RoomType extends Model {

    public $timestamps = false;

    public function attributes() {
        return $this->morphMany( 'CommonFloor\Attribute', 'object' );
    }

}
