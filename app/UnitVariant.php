<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;
use CommonFloor\Media;
use CommonFloor\RoomType;

class UnitVariant extends Model {

    public function variantRoomAttributes() {
        return $this->hasMany('CommonFloor\VariantRoom');
    }

    public function media() {
        return $this->morphMany('CommonFloor\Media', 'mediable');
    }

    public function variantMeta() {
        return $this->hasMany('CommonFloor\VariantMeta');
    }

    public function toArray() {
        $data = parent::toArray(); 
        $data['variant_attributes'] = unserialize($data['variant_attributes']);

        $variantId = $data['id'];
        $floorlevelData = $floor= [];
        $unitVariant = UnitVariant::find($variantId);
        $variantRooms = $unitVariant->variantRoomAttributes()->get()->toArray(); 
        $projectId = 0;
        foreach ($variantRooms as $rooms) {
            $roomType = RoomType::find($rooms['roomtype_id']);
            $roomTypename = $roomType->name;
            $projectId = $roomType->project_id;
            $atributes = unserialize($rooms['variant_room_attributes']);
 
            $floor[$rooms['floorlevel']]['rooms_data'][] = array('room_id' => $rooms['roomtype_id'], 'room_name' => $roomTypename, 'atributes'=>$atributes);
        }
 
        $variantMeta = $unitVariant->variantMeta()->get()->toArray();
         
        foreach ($variantMeta as $meta)
        {
            $metakey = explode("-", $meta['meta_key']);
            $level =   $metakey[0] ; 
            $type =   $metakey[1] ;  
            $mediaId = $meta['meta_value'];
            if( is_numeric($mediaId)){ 
               $media = Media::find($mediaId);
               $imageName = $media->image_name;
 
               $floor[$level]['url'.$type.'layout_image'] = url() . "/projects/" . $projectId . "/variants/" . $meta['unit_variant_id'] . "/". $imageName;

            }
        }
       $data['floor'] =  $floor; 
        
        
        return $data;
    }

}
