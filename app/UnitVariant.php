<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class UnitVariant extends Model {

    public function variantFloorlevel() {
        return $this->hasMany('CommonFloor\VariantFloorLevel');
    }

}
