<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\Project;
use CommonFloor\ProjectJson;

class AddStepOneToJsonResponse extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		 Project::all()->each(function($project) {
		 				$projectJson = new ProjectJson;
		        $projectJson->project_json = [];
		        $projectJson->type = 'step_one';
		        $projectJson->project_id = $project->id;
		        $projectJson->save();
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
