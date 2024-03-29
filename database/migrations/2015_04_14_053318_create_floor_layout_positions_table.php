<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFloorLayoutPositionsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'floor_layout_positions', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->integer( 'floor_layout_id' );
            $table->integer( 'position' );
            $table->integer( 'unit_variant_id' );
            $table->timestamps();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'floor_layout_positions' );
    }

}
