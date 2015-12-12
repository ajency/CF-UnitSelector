<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddProjectIdToLeads extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table( 'leads', function(Blueprint $table) {
            $table->string( 'project_id');
        } );
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table( 'leads', function(Blueprint $table) {
            $table->dropColumn( 'project_id' );
        } );
	}

}
