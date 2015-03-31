<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Project extends Model {

    public function projectMeta() {
        return $this->hasMany('CommonFloor\ProjectMeta');
    }

    public function projectPhase() {
        return $this->hasMany('CommonFloor\Phase');
    }

    public function creator() {
        return $this->hasOne('CommonFloor\User', 'id', 'created_by');
    }

    public function updater() {
        return $this->hasOne('CommonFloor\User', 'id', 'updated_by');
    }

    public function getPropertyTypesAttribute($value) {
        $types = explode("||", $value);
        $propertyTypes = array_map('ucfirst', $types);
        return $propertyTypes;
    }

    public function toArray() {
        $data = parent::toArray();
        $data['created_by'] = $this->creator->name;
        $data['updated_by'] = $this->updater->name;
        $projectDetails = $this->projectMeta()->get()->toArray();
        $projectphase = $this->projectPhase()->get()->toArray();
        $data['project_phase'] = $projectphase;

        foreach ($projectDetails as $property) {
            if ($property['meta_key'] === 'phase') {
                $data[$property['meta_key']][] = $property['meta_value'];
            }
            $data[$property['meta_key']] = $property['meta_value'];
        }
        return $data;
    }

}
