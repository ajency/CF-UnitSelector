<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Project extends Model {

    public function projectMeta() {
        return $this->hasMany( 'CommonFloor\ProjectMeta' );
    }

    public function creator() {
        return $this->hasOne( 'CommonFloor\User', 'id', 'created_by' );
    }

    public function updater() {
        return $this->hasOne( 'CommonFloor\User', 'id', 'updated_by' );
    }

}
