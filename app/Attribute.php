<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model {

    public function attributable() {
        return $this->morphTo();
    }

}
