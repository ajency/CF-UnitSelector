<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EmptyProjectBuildingMaster extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        CommonFloor\ProjectMeta::all()->where('meta_key', 'master')->each(function($projectMeta) {
            $projectMeta->meta_value = serialize([]);
            $projectMeta->save();
        });
        
        CommonFloor\Building::all()->each(function($building) {
            $building->building_master = [];
            $building->save();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        //
    }

}
