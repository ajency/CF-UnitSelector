<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddShadowToGroup extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table( 'property_type_groups', function(Blueprint $table) {
            $table->string( 'shadow_images', 500 )->default( 'a:0:{}' );
        } );
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table( 'property_type_groups', function(Blueprint $table) {
            $table->dropColumn( 'shadow_images' );
        } );
	}

}
