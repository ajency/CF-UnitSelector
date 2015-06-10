<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\Project;
use CommonFloor\ProjectMeta;

class AddFiltersToProject extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Project::all()->each(function($project) {
            $meta = ProjectMeta::where('project_id', $project->id)->where('meta_key', 'filters')->get();
            if ($meta->count() === 0) {
                $filtersMeta = new ProjectMeta();
                $filtersMeta->meta_key = 'filters';
                $filtersMeta->meta_value = serialize([]);
                $project->projectMeta()->save($filtersMeta);
            }
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
