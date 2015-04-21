<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class ProjectJson extends Model {

	public function setProjectJsonAttribute($value){
		$this->attributes['project_json'] = serialize($value);
	}

	public function getProjectJsonAttribute($value){
		return unserialize($value);
	}

}
