<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBuildingsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'buildings', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->string( 'building_name', 150 );
            $table->integer( 'phase_id' );
            $table->integer( 'no_of_floors' );
            $table->timestamps();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'buildings' );
    }

}
