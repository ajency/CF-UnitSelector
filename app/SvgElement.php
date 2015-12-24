<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;
use CommonFloor\Building;
use CommonFloor\FloorGroup;
use CommonFloor\Unit;

class SvgElement extends Model {

    public $timestamps = false;

    public function svg() {
        return $this->belongsTo( 'CommonFloor\Svg' );
    }

    public function getOtherDetailsAttribute( $value ) {
        return unserialize( $value );
    }

    public function setOtherDetailsAttribute( $value ) {
         $this->attributes['other_details'] = serialize( $value );
    }

    public function getPointsAttribute( $value ) {
        return unserialize( $value );
    }

    public function setPointsAttribute( $value ) {
         $this->attributes['points'] = serialize( $value );
    }

    public function toArray() {
        $data = parent::toArray();
        $objectId = $data['object_id'];
        $objectType = $data['object_type'];
        $object_types = array('villa','apartment','plot','building');
        $objectName ='';
        if($objectId)
        {
            if($objectType=='building')
            {
                $building = Building::find( $objectId ); 
                $objectName = ($building === null)? '':$building->building_name;
                
            }
            elseif($objectType=='floor_group')
            {
                $floorGroup = FloorGroup::find( $objectId ); 
                $objectName = ($floorGroup === null)? '':$floorGroup->name;
            }
            elseif(in_array($objectType, $object_types))
            {  
                $unit = Unit::find($objectId); 
                $objectName = ($unit === null)? '':$unit->unit_name;
            }
            else
                $objectName='';
        }
        

        $data['object_name'] = $objectName;

        return $data;
    }  

}
