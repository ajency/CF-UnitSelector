<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class UnitVariant extends Model {

    public function variantRoomAttributes() {
        return $this->hasMany('CommonFloor\VariantRoom');
    }
    
    public function toArray() {
      $data = parent::toArray();
      $attributeData= $data['variant_attributes'];
      $attributeDataArr = explode("||",$attributeData);
      $attributeDataArr=array_filter($attributeDataArr);
      $variantAttributes =[];
       
      foreach ($attributeDataArr as $attributes)
               $attributes = explode(':', $attributes);
              $variantAttributes[$attributes[0]] =$attributes[1];
      
      $data['variant_attributes']=$variantAttributes;
      return $data;
 }

}
