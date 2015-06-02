<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFkConstraintToSvgelements extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('svg_elements', function(Blueprint $table) {
        	$table->integer( 'svg_id' )->unsigned()->change();
            $table->foreign( 'svg_id' )
                    ->references( 'id' )
                    ->on( 'svg' )
                    ->onDelete( 'cascade' );
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
