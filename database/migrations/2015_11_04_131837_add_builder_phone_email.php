<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\Project;
use CommonFloor\ProjectMeta;

class AddBuilderPhoneEmail extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Project::all()->each(function($project) {
            $meta = ProjectMeta::where('project_id', $project->id)->where('meta_key', 'builder_phone')->get();
            if ($meta->count() === 0) {
                $filtersMeta = new ProjectMeta();
                $filtersMeta->meta_key = 'builder_phone';
                $filtersMeta->meta_value = '';
                $project->projectMeta()->save($filtersMeta);
            }
        });

        Project::all()->each(function($project) {
            $meta = ProjectMeta::where('project_id', $project->id)->where('meta_key', 'builder_email')->get();
            if ($meta->count() === 0) {
                $filtersMeta = new ProjectMeta();
                $filtersMeta->meta_key = 'builder_email';
                $filtersMeta->meta_value = '';
                $project->projectMeta()->save($filtersMeta);
            }
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
