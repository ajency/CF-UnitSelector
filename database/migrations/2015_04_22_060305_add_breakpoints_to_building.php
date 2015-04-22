<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use CommonFloor\Building;

class AddBreakpointsToBuilding extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::table( 'buildings', function(Blueprint $table) {
            $table->string( 'breakpoints', 500 )->default( 'a:0:{}' );
        } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table( 'buildings', function(Blueprint $table) {
            $table->dropColumn( 'breakpoints' );
        } );
    }

}
