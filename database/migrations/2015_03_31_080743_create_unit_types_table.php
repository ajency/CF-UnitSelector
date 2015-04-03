<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnitTypesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'unit_types', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->integer( 'project_id' )->unsigned();
            $table->string( 'unittype_name', 100 );
            $table->integer( 'property_type' );

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
        Schema::drop( 'unit_types' );
    }

}
