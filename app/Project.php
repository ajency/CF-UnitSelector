<?php

namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;
use CommonFloor\UnitType;
use CommonFloor\Media;

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

    public function projectJson(){
        return $this->hasMany( 'CommonFloor\ProjectJson');
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

    function getUnitTypesToArray( $projectPropertyTypeId ) {
        $unitTypes = UnitType::where( 'project_property_type_id', $projectPropertyTypeId )->get();
        return $unitTypes;
    }

    public function getGoogleEarthSvgPath() {
        $mediaId = $this->projectMeta()->where( 'meta_key', 'google_earth' )->first()->meta_value;
        $fileName = Media::find( $mediaId )->image_name;
        return url( "/projects/" . $this->id . "/google_earth/" . $fileName );
    }

    public function getProjectMasterImages() {
        $masterValue = $this->projectMeta()->where( 'meta_key', 'master' )->get()->first()->meta_value;
        $svgImages = unserialize( $masterValue );

        foreach ($svgImages as $key => $images) {
            if (is_array( $images )) {
                $transitionImages = [];
                foreach ($images as $image) {
                    $imageName = Media::find( $image )->image_name;
                    $transitionImages[] = url() . "/projects/" . $this->id . "/master/" . $imageName;
                }
                $svgImages[$key] = $transitionImages;
            } else {
                if (is_numeric( $images )) {
                    $imageName = Media::find( $images )->image_name;
                    $svgImages[$key] = url() . "/projects/" . $this->id . "/master/" . $imageName;
                }
            }
        }
        return $svgImages;
    }

    public function getCFProjectStatus() {
        return 'Under Construction';
    }

    public function getProjectPropertyTypeId( $propertyTypeId ) {
        return $this->projectPropertyTypes()->where( 'property_type_id', $propertyTypeId )->first()->id;
    }

    public function toArray() {
        $data = parent::toArray();
        $data['created_by'] = $this->creator->name;
        $data['updated_by'] = $this->updater->name;
        $projectDetails = $this->projectMeta()->get()->toArray();
        $projectphase = $this->projectPhase()->get()->toArray();
        $data['project_phase'] = $projectphase;
        $commonFloorData = unserialize( $this->projectMeta()->where( 'meta_key', 'cf' )->first()->meta_value );

        $data['cf'] = $commonFloorData;
        $data['project_image'] = $this->projectMeta()->where( 'meta_key', 'project_image' )->first()->meta_value;

        foreach ($projectDetails as $property) {
            if ($property['meta_key'] === 'phase') {
                $data[$property['meta_key']][] = $property['meta_value'];
            }
            $data[$property['meta_key']] = $property['meta_value'];
        }
        return $data;
    }

}
