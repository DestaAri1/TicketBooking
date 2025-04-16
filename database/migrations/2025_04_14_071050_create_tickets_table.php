<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('artist');
            $table->date('date');
            $table->string('time');
            $table->string('venue');
            $table->float('price');
            $table->enum('status', [0,1,2,3,4])->default(0);
            $table->integer('sales')->default(0);
            $table->text('description')->nullable();
            $table->string('imageUrl')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};