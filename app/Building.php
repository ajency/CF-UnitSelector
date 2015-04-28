<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Building extends Model {

    public function setFloorsAttribute( $value ) {
        $this->attributes['floors'] = serialize( $value );
    }

    public function getFloorsAttribute( $value ) {
        return unserialize( $value );
    }

    public function setBuildingMasterAttribute( $value ) {
        $this->attributes['building_master'] = serialize( $value );
    }

    public function getBuildingMasterAttribute( $value ) {
        return unserialize( $value );
    }

    public function setBreakpointsAttribute( $value ) {
        $this->attributes['breakpoints'] = serialize( $value );
    }

    public function getBreakpointsAttribute( $value ) { 
        return unserialize( $value );
    }

    public function phase() {
        return $this->belongsTo( 'CommonFloor\Phase' );
    }

    public function toArray() {
        $data = parent::toArray();
        $data['breakpoints'] = (!empty($data['breakpoints']))?unserialize($data['breakpoints']):[];
        $buildingMasters = $data['building_master'];
        $buildingId = $data['id'];
        $phaseId = $data['phase_id'];
        $projectId = Phase::find( $phaseId )->project_id;
        $svgImages = [];

        foreach ($buildingMasters as $key => $images) {
                if ($images != '' && is_numeric( $images )) {
                    $imageName = Media::find( $images )->image_name;
                    $svgImages[] = url() . "/projects/" . $projectId . "/buildings/" . $buildingId . "/" . $imageName;
                }
            
        }
        $data['building_master'] = $svgImages; 
        return $data;
    }

}
