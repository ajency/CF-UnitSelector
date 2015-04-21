<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBuildingMetasTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'building_meta', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->integer( 'building_id' )->unsigned();
            $table->string( 'meta_key', 100 );
            $table->text( 'meta_value' )->nullable();

            //reference  a foreign key
            $table->foreign( 'building_id' )
                    ->references( 'id' )
                    ->on( 'buildings' )
                    ->onDelete( 'cascade' );
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'building_meta' );
    }

}
