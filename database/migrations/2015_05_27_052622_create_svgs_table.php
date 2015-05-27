<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSvgsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('svg', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer( 'image_id' )->unsigned();
			$table->string('object_type');
			$table->integer('object_id');
			$table->string('canvas_type');
			$table->text('points')->nullable();
			$table->text('other_details')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('svg');
	}

}
