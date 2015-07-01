<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\Permission;

class AddPermissions extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
            Permission::create( ['name' => 'add_project','display_name' => 'Add Project'] );
            Permission::create( ['name' => 'configure_project','display_name' => 'Configure Project'] );
            Permission::create( ['name' => 'publish_project','display_name' => 'Publish Project'] );
            Permission::create( ['name' => 'configure_building','display_name' => 'Configure Building'] );
            Permission::create( ['name' => 'configure_unit','display_name' => 'Add/Edit Unit'] );
            Permission::create( ['name' => 'unit_status_update','display_name' => 'Status update of units'] );
            Permission::create( ['name' => 'svg_auth_tool','display_name' => 'SVG authoring tool'] );
            Permission::create( ['name' => 'manage_users','display_name' => 'Manage Users'] );
            Permission::create( ['name' => 'manage_roles','display_name' => 'Mange Roles'] );
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
