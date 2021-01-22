<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('store_id');
            $table->string('manufacturer')->nullable();
            $table->string('category');
            $table->string('model');
            $table->string('image_url')->nullable();
            $table->string('url')->nullable();
            $table->text('description')->nullable();
            $table->string('theme');
            $table->integer('stock')->default(1);
            $table->float('price', 10, 4);
            $table->string('currency')->default('$');
            $table->text('qrcode')->nullable();
            $table->tinyInteger('active')->default(1);
            $table->tinyInteger('shipping')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
