<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class FloorLayout extends Model {

    public function svgs() {
        return $this->morphMany( 'CommonFloor\Media', 'mediable' );
    }

    public function projectPropertyType() {
        return $this->belongsTo( 'CommonFloor\ProjectPropertyType' );
    }

    public function detailedSvg() {
        return $this->hasOne( 'CommonFloor\Media', 'id', 'detailed_svg' );
    }

    public function basicSvg() {
        return $this->hasOne( 'CommonFloor\Media', 'id', 'basic_svg' );
    }

    public function getDetailedSvgPath() {
        return $this->detailedSvg->getFullPath( $this->projectPropertyType->project_id );
    }

    public function getBasicSvgPath() {
        return $this->basicSvg->getFullPath( $this->projectPropertyType->project_id );
    }

    public function hasDetailedSvg() {
        return 0 != $this->detailed_svg;
    }

    public function hasBasicSvg() {
        return 0 != $this->basic_svg;
    }
    
    public function positions() {
        return $this->hasMany('CommonFloor\FloorLayoutPosition');
    }
    
    public function toArray() {
        $data = parent::toArray();
        
        $layoutId= $data['id'];
        $layout = FloorLayout::find($layoutId);
        $positions = $layout->positions()->get()->toArray();         
        $data['position_data'] =$positions;
        
        return $data;
        
    }

}
