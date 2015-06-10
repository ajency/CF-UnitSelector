<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDefaultsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('defaults', function(Blueprint $table)
		{
			$table->increments('id');
                        $table->string( 'type', 100 );
                        $table->string( 'label', 100 );
                        $table->text( 'serialize_data' )->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('defaults');
	}

}
