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

}
