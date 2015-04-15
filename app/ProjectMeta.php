<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class ProjectMeta extends Model {

    protected $table = 'project_meta';
    protected $fillable = ['meta_key', 'meta_value', 'project_id'];
    public $timestamps = false;
    protected $touches = ['project'];
    
    public function project()
    { 
        return $this->belongsTo('CommonFloor\Project');
    }

    public function toArray() {
        $data = parent::toArray();
        if ($data['meta_key'] === 'cf')
            $data['meta_value'] = unserialize( $data['meta_value'] );
        return $data;
    }

}
