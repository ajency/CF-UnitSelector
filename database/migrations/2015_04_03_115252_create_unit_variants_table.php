<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUnitVariantsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'unit_variants', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->string( 'unit_variant_name', 100 );
            $table->integer( 'unit_type_id' )->unsigned();
            $table->double( 'carpet_area', 100 );
            $table->double( 'built_up_area', 100 );
            $table->double( 'super_built_up_area', 100 );
            $table->text( 'variant_attributes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            //reference  a foreign key
            $table->foreign( 'unit_type_id' )
                    ->references( 'id' )
                    ->on( 'unit_types' )
                    ->onDelete( 'cascade' );
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'unit_variants' );
    }

}
