<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class VariantFloorLevel extends Model {

	 protected $fillable = ['floor_level_name', 'unit_variant_id'];
         public $timestamps = false;

}
