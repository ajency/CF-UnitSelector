<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model {

    public function toArray() {
        $data = parent::toArray();
        $unitId = $data['id'];
        $unitPosition = $this->position;
        $floor = $this->floor;
        
        if ($data['unit_variant_id'] == 0) {
            $buildingId = $data['building_id'];
            $floorlayoutIds = Building::find( $buildingId )->floors;
            if (isset( $floorlayoutIds[$floor] )) {
                $layout = FloorLayout::find( $floorlayoutIds[$floor] );
                $position = $layout->positions()->where('position', $unitPosition)->first()->toArray();
                $data['unit_variant_id'] = $position['unit_variant_id'];
            }
        }

        return $data;
    }

}
