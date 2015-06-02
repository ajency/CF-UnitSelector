<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSvgElementsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('svg_elements', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('svg_id');
			$table->string('object_type');
			$table->integer('object_id');
			$table->string('canvas_type');
			$table->text('points')->nullable();
			$table->text('other_details')->nullable();
			$table->string('primary_breakpoint')->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('svg_elements');
	}

}
