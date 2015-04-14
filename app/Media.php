<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Media extends Model {

    protected $touches = ['project'];

    public function project() {
        return $this->belongsTo( 'CommonFloor\Project' );
    }

    public function mediable() {
        return $this->morphTo();
    }

    public function getFullPath(){
        
    }
    
}
