<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class FloorLayout extends Model {

    public function detailedSvg() {
        return $this->hasOne( 'CommonFloor\Media', 'id', 'detailed_svg' );
    }
    
    public function basicSvg() {
        return $this->hasOne( 'CommonFloor\Media', 'id', 'basic_svg' );
    }

    public function getDetailedSvgPath() {
        return $this->detailedSvg->getFullPath();
    }

    public function getBasicSvgPath() {
        return $this->basicSvg->getFullPath();
    }

}
