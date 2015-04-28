<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\FloorLayout;
use CommonFloor\ProjectPropertyType;

class RenameFloorlayoutColumn extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table('floor_layouts', function($table) {
            $table->renameColumn('project_property_type_id', 'project_id');
        });
        
        FloorLayout::all()->each( function($floorlayout) {
             $projectPropertyTypeId = $floorlayout->project_id;
             $projectId = ProjectPropertyType::find($projectPropertyTypeId)->project_id;
             $floorlayout->project_id=$projectId;
             $floorlayout->save();
             
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('floor_layouts', function($table) {
            $table->renameColumn('project_id', 'project_property_type_id');
        });
    }

}
