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
            $table->integer( 'position', 100 )->unsigned()->nullable()->default( 0 );
            $table->integer( 'floor', 100 )->unsigned()->nullable()->default( 0 );
            // $table->string('facing', 100);
            // $table->text( 'unit_attributes')->nullable();
            $table->enum( 'availability', ['available', 'sold', 'not_released', 'blocked'] )->default( 'available' );
            $table->timestamps();

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
        Schema::drop( 'units' );
    }

}
