<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Project extends Model {

    public function media() {
        return $this->morphMany( 'CommonFloor\Media', 'mediable' );
    }

    public function attributes() {
        return $this->morphMany( 'CommonFloor\Attribute', 'object' );
    }

    public function projectMeta() {
        return $this->hasMany( 'CommonFloor\ProjectMeta' );
    }

    public function projectPropertyTypes() {
        return $this->hasMany( 'CommonFloor\ProjectPropertyType' );
    }

    public function roomTypes() {
        return $this->hasMany( 'CommonFloor\RoomType' );
    }

    public function projectPhase() {
        return $this->hasMany( 'CommonFloor\Phase' );
    }

    public function creator() {
        return $this->hasOne( 'CommonFloor\User', 'id', 'created_by' );
    }

    public function updater() {
        return $this->hasOne( 'CommonFloor\User', 'id', 'updated_by' );
    }
public function toArray() {
        $data = parent::toArray();
        $data['created_by'] = $this->creator->name;
        $data['updated_by'] = $this->updater->name;
        $projectDetails = $this->projectMeta()->get()->toArray();
        $projectphase = $this->projectPhase()->get()->toArray();
        $projectunits = []; //$this->projectUnitType()->get()->toArray();
        $data['project_phase'] = $projectphase;
        $data['project_unittype'] = [
            '1' => [],
            '2' => [],
            '3' => [],
        ];
        $commonFloorData = unserialize( $this->projectMeta()->where( 'meta_key', 'cf' )->first()->meta_value );

        $data['cf'] = $commonFloorData;
        $data['project_image'] = $this->projectMeta()->where( 'meta_key', 'project_image' )->first()->meta_value;

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
