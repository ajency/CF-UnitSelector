<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropertyTypeGroupsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

		Schema::create( 'property_type_groups', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->string( 'property_type_group_name', 150 );
            $table->integer( 'project_property_type_id' )->unsigned();
            $table->integer( 'phase_id' );
            $table->enum('has_master', ['yes', 'no'])->default('no');
            $table->string( 'group_master', 500 )->default( 'a:0:{}' );
            $table->string( 'breakpoints', 500 )->default( 'a:0:{}' );
            $table->timestamps();
     } );



      $table->foreign( 'project_property_type_id' )
              ->references( 'id' )
              ->on( 'project_property_types' )
              ->onDelete( 'cascade' );
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('property_type_groups');
	}

}
