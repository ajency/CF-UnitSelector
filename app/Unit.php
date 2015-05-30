<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model {

    public function building() { 
        return $this->belongsTo( 'CommonFloor\Building' );
    }
    
    public function unitVariant() { 
        return $this->belongsTo( 'CommonFloor\UnitVariant' );
    }

    public function phase() {
        return $this->belongsTo( 'CommonFloor\Phase' );
    }
    
    public function toArray() {
        $data = parent::toArray();
        $data['views'] = unserialize($data['views']);

        $unitId = $data['id'];
        $unitPosition = $this->position;
        $floor = $this->floor;
        
        if ($data['unit_variant_id'] == 0) {
            $buildingId = $data['building_id'];
            $floorlayoutIds = Building::find( $buildingId )->floors;
            if (isset( $floorlayoutIds[$floor] )) {
                $layout = FloorLayout::find( $floorlayoutIds[$floor] );
                $positions = $layout->positions()->where('position', $unitPosition)->get()->toArray(); 
                if(!empty($positions))
                    $data['unit_variant_id'] = $positions[0]['unit_variant_id'];
            }
        }
        
        return $data;
    }

}
