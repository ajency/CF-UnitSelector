<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIsAgentInUsers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('users', function(Blueprint $table) {
                $table->enum('is_agent', ['yes', 'no'])->default('no');
        });
        
        Schema::table('units', function(Blueprint $table) {
            $table->integer('agent_id')->unsigned()->nullable()->default( 0 );
            $table->dateTime('booked_at');
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
