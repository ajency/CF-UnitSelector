<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnitsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'units', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->string( 'unit_name', 100 );
            $table->integer( 'unit_variant_id' )->unsigned()->nullable();
            $table->integer( 'position' )->unsigned()->nullable()->default( 0 );
            $table->integer( 'floor' )->unsigned()->nullable()->default( 0 );
            $table->integer( 'building_id' )->unsigned()->nullable()->default( 0 );
            $table->enum( 'availability', ['available', 'sold', 'not_released', 'blocked'] )->default( 'available' );
            $table->timestamps();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'units' );
    }

}
