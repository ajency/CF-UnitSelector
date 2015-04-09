<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVariantRoomsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('variant_rooms', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('unit_variant_id')->unsigned();
            $table->integer('roomtype_id')->unsigned();
            $table->string('floorlevel', 100);
            $table->string('variant_room_attributes', 100);
            $table->timestamps();


            $table->foreign('unit_variant_id')
                    ->references('id')
                    ->on('unit_variants')
                    ->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop('variant_rooms');
    }

}
