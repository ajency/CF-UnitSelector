<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class UnitType extends Model {

    protected $table = 'unit_types';
    
    protected $fillable = ['property_type', 'unittype_name', 'project_id'];
    
    public $timestamps = false;

}
