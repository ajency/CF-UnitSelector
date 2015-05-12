<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class UserProject extends Model {
     public function userRole()
    { 
        return $this->belongsTo('CommonFloor\Project');
    }

}
