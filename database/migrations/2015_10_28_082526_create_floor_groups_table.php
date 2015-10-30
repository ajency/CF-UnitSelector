<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFloorGroupsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('floor_groups', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer( 'building_id' );
			$table->string( 'name', 150 );
            $table->text( 'floors' );
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('floor_groups');
	}

}
