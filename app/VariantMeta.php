<?php namespace CommonFloor;

use Illuminate\Database\Eloquent\Model;

class VariantMeta extends Model {

    protected $table = 'variant_meta';
    protected $fillable = ['meta_key', 'meta_value', 'unit_variant_id'];
    public $timestamps = false;

}
