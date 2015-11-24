<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLeadsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('leads', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string( 'name' );
            $table->string( 'email' );
            $table->string( 'phone' );
            $table->string( 'pan_card' );
            $table->string( 'buyer_type' );
            $table->text( 'address1' );
            $table->text( 'address2' );
            $table->string( 'city' );
            $table->string( 'state' );
            $table->string( 'country' );
            $table->string( 'pincode' );
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
		Schema::drop('leads');
	}

}
