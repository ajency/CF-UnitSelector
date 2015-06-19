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
            $table->string( 'unittype_name', 100 );
            $table->integer( 'project_property_type_id' )->unsigned();

            $table->foreign( 'project_property_type_id' )
                    ->references( 'id' )
                    ->on( 'project_property_types' )
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
