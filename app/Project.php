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

    public function projectUnitType() {
        return $this->hasMany('CommonFloor\UnitType');
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
        $projectunits = $this->projectUnitType()->get()->toArray();
        $data['project_phase'] = $projectphase;
        $data['project_unittype'] = [
            '1' => [],
            '2' => [],
            '3' => [],
        ];

        foreach ($projectDetails as $property) {
            if ($property['meta_key'] === 'phase') {
                $data[$property['meta_key']][] = $property['meta_value'];
            }
            $data[$property['meta_key']] = $property['meta_value'];
        }

        foreach ($projectunits as $units) {
            $data['project_unittype'][$units['property_type']][$units['id']] = $units['unittype_name'];
        }

        return $data;
    }

}
