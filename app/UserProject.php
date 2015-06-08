<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class UserProject extends Model {
    
    protected $table = 'user_project';
    public $timestamps = false;
     
    public function roleUser()
    { 
        return $this->belongsTo('CommonFloor\UserRole');
    }

}
