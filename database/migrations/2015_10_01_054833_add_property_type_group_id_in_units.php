<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPropertyTypeGroupIdInUnits extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table( 'units', function(Blueprint $table) {
        	$table->integer( 'property_type_group_id' );
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
	        $table->dropColumn( 'property_type_group_id' );
	    } );
	}

}
