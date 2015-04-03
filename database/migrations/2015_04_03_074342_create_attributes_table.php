<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAttributesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'attributes', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->string( 'label' );
            $table->enum( 'control_type',['textbox', 'select', 'radio', 'checkbox', 'textarea', 'media'] );
            $table->string( 'attributable_type' );
            $table->integer( 'attributable_id' );
            $table->text( 'defaults' );
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
        Schema::drop( 'attributes' );
    }

}
