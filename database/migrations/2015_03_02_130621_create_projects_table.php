<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create( 'projects', function(Blueprint $table) {
            $table->increments( 'id' );
            $table->string( 'cf_project_id' );
            $table->string( 'city', 60 );
            // project model will have constants
            // 1: Apartment,2: Bunglows:Villas, 3: Land, 4 : Penthouse
            // stored as 1|2|3|4
            $table->string( 'sellable_unit_types', 50 );
            $table->integer( 'created_by' );
            $table->integer( 'updated_by' );
            $table->timestamps();
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop( 'projects' );
    }

}
