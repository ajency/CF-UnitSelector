<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVariantFloorLevelsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'variant_floor_levels', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->string( 'floor_level_name', 100 );
            $table->integer( 'unit_variant_id' )->unsigned();

            //reference  a foreign key
            $table->foreign( 'unit_variant_id' )
                    ->references( 'id' )
                    ->on( 'unit_variants' )
                    ->onDelete( 'cascade' );
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'variant_floor_levels' );
    }

}
