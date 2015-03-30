<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class ProjectMeta extends Model {

    protected $table = 'project_meta';
    
    protected $fillable = ['meta_key', 'meta_value', 'project_id'];
    
    public $timestamps = false;

}
