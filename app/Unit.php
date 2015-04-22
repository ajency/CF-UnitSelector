<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model {

    public function toArray() {
        $data = parent::toArray();
        $unitId = $data['id'];
        if ($data['unit_variant_id'] == 0) {
            $buildingId = $data['building_id'];
            $floorlayoutIds = Building::find( $buildingId )->floors;
            if (isset( $floorlayoutIds[1] )) {
                $layout = FloorLayout::find( $floorlayoutIds[1] );
                $positions = $layout->positions()->get()->first()->toArray();
                $data['unit_variant_id'] = $positions['unit_variant_id'];
            }
        }

        return $data;
    }

}
