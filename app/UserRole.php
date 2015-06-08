<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;
use CommonFloor\UserProject;

class UserRole extends Model {
    
     protected $table = 'role_user';
     public $timestamps = false;
      
     public function userProject() {
         return $this->hasOne('CommonFloor\UserProject','role_user_id');
    }

}
