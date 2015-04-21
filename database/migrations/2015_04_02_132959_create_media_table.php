<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMediaTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'media', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->string( 'image_name', 100 );
            $table->integer( 'mediable_id' )->unsigned();
            $table->string( 'mediable_type', 100 );
            $table->timestamps();
            $table->softDeletes();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'media' );
    }

}
