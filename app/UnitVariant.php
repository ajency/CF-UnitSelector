<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class UnitVariant extends Model {

    public function variantRoomAttributes() {
        return $this->hasMany('CommonFloor\VariantRoom');
    }
    
    public function media() {
        return $this->morphMany( 'CommonFloor\Media', 'mediable' );
    }
    
    public function variantMeta()
    {
        return $this->hasMany( 'CommonFloor\VariantMeta' );
    }

        public function toArray() {
      $data = parent::toArray();
      $data['variant_attributes']=  unserialize($data['variant_attributes']);
      return $data;
 }

}
