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
            $table->integer( 'unit_valriant_id' );
            $table->timestamps();
            
            //reference  a foreign key
            $table->foreign( 'floor_layout_id' )
                    ->references( 'id' )
                    ->on( 'floor_layouts' )
                    ->onDelete( 'cascade' );
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
