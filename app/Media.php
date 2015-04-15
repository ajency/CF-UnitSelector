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

    public function getFullPath() {
        $path = '';
        if ($this->mediable_type === 'CommonFloor\FloorLayout') {
            $path = url() . '/projects/' . $projectId . '/floor-layouts/' . $this->mediable_id . '/';
        }

        return $path;
    }

    public function toArray() {
        $data = parent::toArray();
        $data['full_path'] = $this->getFullPath();
        return $data;
    }

}
