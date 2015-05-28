<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Phase extends Model {

    protected $table = 'phases';
    public $timestamps = false;
    protected $touches = ['project'];
    
    public function project()
    { 
        return $this->belongsTo('CommonFloor\Project');
    }
    
    public function projectUnits() {
        return $this->hasMany( 'CommonFloor\Unit' );
    }
    
    public function projectBuildings() {
        return $this->hasMany( 'CommonFloor\Building' );
    }

}
