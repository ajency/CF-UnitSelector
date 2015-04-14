<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVariantMetasTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('variant_meta', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('unit_variant_id')->unsigned();
            $table->string('meta_key', 100);
            $table->text('meta_value')->nullable();

            //reference  a foreign key
            $table->foreign('unit_variant_id')
                    ->references('id')
                    ->on('unit_variants')
                    ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::drop('variant_meta');
    }

}
