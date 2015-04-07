<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'rooms', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->integer( 'unit_variant_id' )->unsigned();
            $table->integer( 'floorable_id' );
            $table->string( 'floorable_type', 100 );
            $table->integer( 'roomtype_id' )->unsigned();
            $table->string( 'room_attributes', 150 );

            //reference  a foreign key
            $table->foreign( 'unit_variant_id' )
                    ->references( 'id' )
                    ->on( 'unit_variants' )
                    ->onDelete( 'cascade' );

            $table->foreign( 'roomtype_id' )
                    ->references( 'id' )
                    ->on( 'room_types' )
                    ->onDelete( 'cascade' );
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'rooms' );
    }

}
