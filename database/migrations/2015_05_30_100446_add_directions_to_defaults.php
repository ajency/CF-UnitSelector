<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\Defaults;

class AddDirectionsToDefaults extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		$default = new Defaults();
		$default ->type = 'direction';
		$default ->label = 'North';
		$default ->serialize_data = serialize([]);
		$default ->save();

		$default = new Defaults();
		$default ->type = 'direction';
		$default ->label = 'South';
		$default ->serialize_data = serialize([]);
		$default ->save();

		$default = new Defaults();
		$default ->type = 'direction';
		$default ->label = 'East';
		$default ->serialize_data = serialize([]);
		$default ->save();

		$default = new Defaults();
		$default ->type = 'direction';
		$default ->label = 'West';
		$default ->serialize_data = serialize([]);
		$default ->save();

		$default = new Defaults();
		$default ->type = 'direction';
		$default ->label = 'North-East';
		$default ->serialize_data = serialize([]);
		$default ->save();

		$default = new Defaults();
		$default ->type = 'direction';
		$default ->label = 'North-West';
		$default ->serialize_data = serialize([]);
		$default ->save();

		$default = new Defaults();
		$default ->type = 'direction';
		$default ->label = 'South-East';
		$default ->serialize_data = serialize([]);
		$default ->save();

		$default = new Defaults();
		$default ->type = 'direction';
		$default ->label = 'South-West';
		$default ->serialize_data = serialize([]);
		$default ->save();
			   
    Schema::table('units', function(Blueprint $table) {
        $table->integer('direction');
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
