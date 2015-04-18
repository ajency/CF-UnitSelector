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
    
    public function toArray() {
        $data = parent::toArray();
        $buildingMasters = $data['building_master'];
        $buildingId = $data['id'];
        $phaseId = $data['phase_id'];
        $projectId = Phase::find($phaseId)->project_id;
        $svgImages = [];
        
        foreach ($buildingMasters as $key => $images) {
            if (is_array( $images )) {
                $transitionImages = [];
                foreach ($images as $image) {
                    $imageName = Media::find( $image )->image_name;
                    $transitionImages[] = url() . "/projects/" . $projectId . "/buildings/". $buildingId ."/" . $imageName;
                }
                $svgImages[$key] = $transitionImages;
            } else {
                $svgImages[$key] ="";
                if ($images!='' && is_numeric( $images )) {
                    $imageName = Media::find( $images )->image_name;
                    $svgImages[$key] = url() . "/projects/" . $projectId . "/buildings/". $buildingId ."/" . $imageName;
                }
            }
        }
        $data['building_master']=$svgImages;
        
        return $data;
    }

}
