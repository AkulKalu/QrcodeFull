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
            $table->string('website')->nullable();
            $table->string('stripe_public_key')->nullable();
            $table->string('stripe_private_key')->nullable();
            $table->string('paypal_client_id')->nullable();
            $table->string('paypal_private_key')->nullable();
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
