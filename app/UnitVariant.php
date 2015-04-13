<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class UnitVariant extends Model {

    public function variantRoomAttributes() {
        return $this->hasMany('CommonFloor\VariantRoom');
    }
    
    public function toArray() {
      $data = parent::toArray();
      $data['variant_attributes']=  unserialize($data['variant_attributes']);
      return $data;
 }

}
