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
        $floorlevelData = $floor = [];
        $unitVariant = UnitVariant::find($variantId);
        $variantRooms = $unitVariant->variantRoomAttributes()->get()->toArray();
        $projectId = 0;
        foreach ($variantRooms as $rooms) {
            $roomType = RoomType::find($rooms['roomtype_id']);
            $roomTypename = $roomType->name;
            $projectId = $roomType->project_id;
            $atributes = unserialize($rooms['variant_room_attributes']);
            $atributeData = [];
            foreach ($atributes as $key => $attribute) {
                $atributeData[] = array('attribute_key' => $key, 'attribute_value' => $attribute);
            }

            $floor[$rooms['floorlevel']]['rooms_data'][] = array('room_id' => $rooms['roomtype_id'], 'room_name' => $roomTypename, 'atributes' => $atributeData);
        }

        $variantMeta = $unitVariant->variantMeta()->get()->toArray();

        foreach ($variantMeta as $meta) {
            $metakey = $meta['meta_key'];
            if ($metakey == 'gallery') {
                $metaValue = unserialize($meta['meta_value']);
                if (!empty($metaValue)) {
                    foreach ($metaValue as $mediaId) {
                        if (is_numeric($mediaId)) {
                            $imageName = Media::find($mediaId)->image_name;
                            $data['galleryurl'][$mediaId] = url() . "/projects/" . $projectId . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
                        }
                    }
                }
            } else {
                $metakeyData = explode("-", $metakey);
                $level = $metakeyData[0];
                $type = $metakeyData[1];
                $mediaId = $meta['meta_value'];
                if (is_numeric($mediaId)) {
                    $media = Media::find($mediaId);
                    $imageName = $media->image_name;

                    if ($level == 'external')
                        $data['external3durl'] = url() . "/projects/" . $projectId . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
                    else
                        $floor[$level]['url' . $type . 'layout_image'] = url() . "/projects/" . $projectId . "/variants/" . $meta['unit_variant_id'] . "/" . $imageName;
                }
            }
        }
        $data['floor'] = $floor;


        return $data;
    }

}
