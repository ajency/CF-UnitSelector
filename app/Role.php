<?php

namespace CommonFloor;

use Zizaco\Entrust\EntrustRole;

class Role extends EntrustRole {

    public function permission() {
        return $this->hasMany('CommonFloor\PermissionRole');
    }

}
