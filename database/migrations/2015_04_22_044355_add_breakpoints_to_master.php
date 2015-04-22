<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\Project;
use CommonFloor\ProjectMeta;

class AddBreakpointsToMaster extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Project::all()->each( function($project) {
            $meta = ProjectMeta::where( 'project_id', $project->id )->where( 'meta_key', 'breakpoints' )->get();
            if ($meta->count() === 0) {
                $breakpointsMeta = new ProjectMeta();
                $breakpointsMeta->meta_key = 'breakpoints';
                $breakpointsMeta->meta_value = serialize( [] );
                $project->projectMeta()->save( $breakpointsMeta );
            }
        } );
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
