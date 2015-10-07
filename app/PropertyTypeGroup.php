<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class PropertyTypeGroup extends Model {

	public function media() {
        return $this->morphMany( 'CommonFloor\Media', 'mediable' );
    }

  public function phase() {
      return $this->belongsTo( 'CommonFloor\Phase' );
  }
	
	public function projectUnits() {
	      return $this->hasMany( 'CommonFloor\Unit' );
	  }


	public function toArray() {
        $data = parent::toArray();
        $data['breakpoints'] = (!empty($data['breakpoints']))?unserialize($data['breakpoints']):[];
        $groupMasters = $data['group_master'];
        $groupId = $data['id'];
        $phaseId = $data['phase_id'];
        $projectId = Phase::find( $phaseId )->project_id;
        $svgImages = [];
        
        ksort($groupMasters);
        foreach ($groupMasters as $key => $images) {
                if ($images != '' && is_numeric( $images )) {
                    $imageName = Media::find( $images )->image_name;
                    $svgImages[] = url() . "/projects/" . $projectId . "/group/" . $groupId . "/" . $imageName;
                }
            
        }
        $data['group_master'] = $svgImages; 
        return $data;
    }

    public function getGroupSVGs($groupId) {
        $group = Group::find($groupId);
        $projectmediaIds = $breakpoints = $mediaIds = [];
       
        $metaValue = $group->group_master;
        $breakpoints = $group->breakpoints; 
        $breakpoints = (!empty($breakpoints))?unserialize($breakpoints):[];
        foreach($metaValue as $position=> $projectmediaId)
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
