<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Building extends Model {
    
    public function media() {
        return $this->morphMany( 'CommonFloor\Media', 'mediable' );
    }    

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
	
	 public function projectUnits() {
        return $this->hasMany( 'CommonFloor\Unit' );
    }

    public function toArray() {
        $data = parent::toArray();
        $data['breakpoints'] = (!empty($data['breakpoints']))?unserialize($data['breakpoints']):[];
        $buildingMasters = $data['building_master'];
        $buildingId = $data['id'];
        $phaseId = $data['phase_id'];
        $projectId = Phase::find( $phaseId )->project_id;
        $svgImages = [];
        
        ksort($buildingMasters);
        foreach ($buildingMasters as $key => $images) {
                if ($images != '' && is_numeric( $images )) {
                    $imageName = Media::find( $images )->image_name;
                    $svgImages[] = url() . "/projects/" . $projectId . "/buildings/" . $buildingId . "/" . $imageName;
                }
            
        }
        $data['building_master'] = $svgImages; 
        return $data;
    }

    public function getBuildingSVGs($buildingId) {
        $building = Building::find($buildingId);
        $projectmediaIds = $breakpoints = $mediaIds = [];
       
        $metaValue = $building->building_master;
        $breakpoints = $building->breakpoints; 
        $breakpoints = (!empty($breakpoints))?unserialize($breakpoints):[];
        foreach($metaValue as $position=> $projectmediaId)
        {
           if(in_array($position,$breakpoints))
           {
               $mediaIds[]=$projectmediaId;
           }
        }
       
        $path = [];
        foreach ($mediaIds as $key => $value) {
            $temp =  Svg::where( 'image_id', '=', $value )->first();
            
            if($temp != "")
                $path[$value] = $temp->svg_path;
            
        }
        return $path;
                
    }

}
