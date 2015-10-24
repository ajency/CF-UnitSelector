<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBookingidInUnits extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table( 'units', function(Blueprint $table) {
            $table->string( 'booking_id', 150 );
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
            $table->dropColumn( 'booking_id' );
        } );
	}

}
