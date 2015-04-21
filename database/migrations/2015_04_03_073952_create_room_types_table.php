<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomTypesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'room_types', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->integer('project_id')->unsigned();
            $table->string( 'name' );
            
            $table->foreign( 'project_id' )
                    ->references( 'id' )
                    ->on( 'projects' )
                    ->onDelete( 'cascade' );
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'room_types' );
    }

}
