<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\Project;
use CommonFloor\ProjectJson;

class SetProjectJsonForPreviousProjects extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Project::all()->each(function($project){
			if($project->projectJson()->get()->count() === 0){
				$projectJson = new ProjectJson;
		        $projectJson->project_json = [];
		        $projectJson->type = 'step_two';
		        $projectJson->project_id = $project->id;
		        $projectJson->save();
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
