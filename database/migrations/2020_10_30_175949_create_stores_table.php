<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->string('website')->default('');
            $table->string('email');
            $table->string('phone')->default('');
            $table->string('stripe_public_key');
            $table->string('stripe_private_key');
            $table->string('paypal_client_id');
            $table->string('paypal_private_key');
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
        Schema::dropIfExists('stores');
    }
}
