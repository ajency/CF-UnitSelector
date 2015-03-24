<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Project extends Model {
    
    
    public function creator(){
        return $this->hasOne('CommonFloor\User');
    }
    
}
