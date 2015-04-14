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
            $table->integer( 'project_property_type_id' );
            $table->string( 'layout_name' );
            $table->integer( 'no_of_floors' );
            $table->integer( 'detailed_svg' );
            $table->integer( 'basic_svg' );
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
