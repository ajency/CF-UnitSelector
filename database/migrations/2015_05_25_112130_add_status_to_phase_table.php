<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStatusToPhaseTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table('phases', function(Blueprint $table) {
            $table->enum( 'status', ['live', 'not_live', 'archive'] )->default( 'not_live' );
        });

        Schema::table('units', function(Blueprint $table) {
            $table->integer('phase_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        //
    }

}
