<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class ProjectPropertyType extends Model {

    protected $fillable = ['property_type_id', 'project_id'];
     public $timestamps = false;
    
    public function attributes() {
        return $this->morphMany('CommonFloor\Attribute', 'object');
    }
    
    public function projectUnitType() {
        return $this->hasMany('CommonFloor\UnitType');
    }

}
