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

    public function getFullPath($projectId) {
        $path = '';
        if ($this->mediable_type === 'CommonFloor\FloorLayout') {
            $path = url() . '/projects/' . $projectId . '/floor-layouts/' . $this->mediable_id . '/' . $this->image_name;
        }
       
        return $path;
    }
}
