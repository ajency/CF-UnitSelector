<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectJsonsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'project_jsons', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->integer( 'project_id' )->unsigned();
            $table->longText( 'project_json' );
            $table->timestamps();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'project_jsons' );
    }

}
