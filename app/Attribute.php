<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model {

    protected $fillable = ['label', 'control_type', 'object_type', 'object_id', 'defaults'];
     
    public function object() {
        return $this->morphTo();
    }
   
    public function getObjectTypeAttribute($value){
        return 'CommonFloor\'' . $value;
    }

}
