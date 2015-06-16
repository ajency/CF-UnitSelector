<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class Svg extends Model {

	protected $table = 'svg';
	public $timestamps = false;
	protected $fillable = array('image_id', 'svg_path');

    public function svgElement()
    {
        return $this->hasMany('CommonFloor\SvgElement');
    }	

    public function getSVGPath($image_id)
    {
        $path = Svg::where('image_id' , $image_id);
        return $path;
    }

}
