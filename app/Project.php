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
    
    public function floorLayout() {
        return $this->hasMany( 'CommonFloor\FloorLayout' );
    }

    public function projectJson() {
        return $this->hasMany( 'CommonFloor\ProjectJson' );
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

    public function getProjectMasterBreakPoints() {
        $meta = $this->projectMeta()->where( 'meta_key', 'breakpoints' )->get()->first();
        $breakpoints = unserialize( $meta->meta_value );
        return $breakpoints;
    }

    public function getGoogleEarthSvgPath() {
        $mediaId = $this->projectMeta()->where( 'meta_key', 'google_earth' )->first()->meta_value;
        if(!is_numeric($mediaId)) return '';
        $fileName = Media::find( $mediaId )->image_name;
        return url( "/projects/" . $this->id . "/google_earth/" . $fileName );
    }

    public function getProjectMasterImages() {
        $masterValue = $this->projectMeta()->where( 'meta_key', 'master' )->get()->first()->meta_value;
        $masterImages = unserialize( $masterValue );
        $Images =[];
        if(!empty($masterImages))
        {
            ksort($masterImages);
            foreach ($masterImages as $key => $images) {
                if($images!=''){
                $imageName = Media::find($images)->image_name;
                $Images[] = url() . "/projects/" .  $this->id . "/master/" . $imageName;
                }
            }
        }
        return $Images;
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
            
            if ($property['meta_key'] === 'cf') {  //Apend Cf utl to property page link
                $commonFloorData = $property['meta_value'];
                $commonFloorData['property_page_link'] = CF_WEBSITE_URL.$commonFloorData['property_page_link'];
                $property['meta_value'] = $commonFloorData;
            }
            
            $data[$property['meta_key']] = $property['meta_value'];
        } 
        return $data;
    }

    public function getProjectSVGs($projectId) {
        $project = Project::find($projectId);
        $projectmediaIds = $breakpoints = $mediaIds = [];
       
        $projectMeta = $project->projectMeta()->whereIn('meta_key', ['breakpoints','master'])->get()->toArray();
       foreach ($projectMeta as $metaValues) {

           if ('master' == $metaValues['meta_key']) {
               $projectmediaIds = unserialize($metaValues['meta_value']);

           } elseif ('breakpoints' == $metaValues['meta_key']) {
               $breakpoints = unserialize($metaValues['meta_value']);

           } 
       }

       foreach($projectmediaIds as $position=> $projectmediaId)
       {
           if(in_array($position,$breakpoints))
           {
               $mediaIds[]=$projectmediaId;
           }
       }
       
        $path = [];
        foreach ($mediaIds as $key => $value) {
            $temp =  Svg::where( 'image_id', '=', $value )->first();
            
            if($temp != "")
                $path[$value] = $temp->svg_path;
            
        }
        return $path;

        
                
    }

}
