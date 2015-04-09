<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class UnitType extends Model {

    protected $table = 'unit_types';
    
    protected $fillable = ['unittype_name', 'project_property_type_id'];
    
    public $timestamps = false;

}
