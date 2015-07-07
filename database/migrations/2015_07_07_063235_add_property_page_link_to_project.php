<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\Project;
use CommonFloor\ProjectMeta;

class AddPropertyPageLinkToProject extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Project::all()->each( function($project) {
            $meta = ProjectMeta::where( 'project_id', $project->id )->where( 'meta_key', 'cf' )->get()->first()->toArray(); 
            if (count($meta)) {
                $projectMeta = ProjectMeta::find($meta['id']);
                $data = $meta['meta_value'];
                $data['property_page_link'] ='';
                $projectMeta->meta_value = serialize($data);
                $projectMeta->save();

               
            }
        } );
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
