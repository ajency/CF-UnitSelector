<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectMetasTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {

        Schema::create( 'project_meta', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->integer( 'project_id' )->unsigned();
            $table->integer( 'meta_key' );
            $table->integer( 'meta_value' );

            //reference  a foreign key
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
        Schema::drop( 'project_meta' );
    }

}
