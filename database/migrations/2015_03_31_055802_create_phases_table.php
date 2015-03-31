<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhasesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'phases', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->integer( 'project_id' )->unsigned();
            $table->string( 'phase_name', 100 );

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
        Schema::drop( 'phases' );
    }

}
