<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTourUrlToUnits extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('units', function(Blueprint $table) {
            $table->text('tour_url');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table( 'units', function(Blueprint $table) {
            $table->dropColumn( 'tour_url' );
        } );
	}

}
