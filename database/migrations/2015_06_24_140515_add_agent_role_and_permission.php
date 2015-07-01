<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\Role;
use CommonFloor\Permission;

class AddAgentRoleAndPermission extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		$role = new Role();
        $role->name = property_type_slug('CF-Agent');
        $role->display_name = 'Agent';
        $role->project_access = 'specific';
        $role->is_agent = 'yes';
        $role->save();
        $roleId = $role->id;
        
        $permissions = Permission :: where('name','unit_status_update')->get()->lists('id');

        if (!empty($permissions)) {
           $role->attachPermissions($permissions);
        
        }
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
