<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFloorGroupIdToUnits extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table( 'units', function(Blueprint $table) {
            $table->integer( 'floor_group_id' );
        } );
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table( 'units', function(Blueprint $table) {
            $table->dropColumn( 'floor_group_id' );
        } );
	}

}
