<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class UnitVariant extends Model {

    public function variantRoomAttributes() {
        return $this->hasMany('CommonFloor\VariantRoom');
    }

}
