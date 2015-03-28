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
            $table->string( 'cf_project_id' )->unique();
            $table->string( 'project_title', 150 );
            $table->string( 'city', 60 );
            $table->string( 'project_address', 200 );
            $table->string( 'property_types', 150 );
            $table->enum( 'status', ['draft', 'published', 'archieved', 'under_review'] )
                  ->default( 'draft' );
            $table->integer( 'created_by' );
            $table->integer( 'updated_by' );
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
        Schema::drop( 'projects' );
    }

}
