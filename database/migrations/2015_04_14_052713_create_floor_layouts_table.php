<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFloorLayoutsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'floor_layouts', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->integer( 'project_property_type_id' )->unsigned();
            $table->string( 'layout_name' );
            $table->integer( 'no_of_flats' )->unsigned();
            $table->integer( 'detailed_svg' )->nullable();
            $table->integer( 'basic_svg' )->nullable();
            $table->timestamps();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'floor_layouts' );
    }

}
