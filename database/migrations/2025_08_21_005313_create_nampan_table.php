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
        Schema::create('nampan', function (Blueprint $table) {
            $table->id();
            $table->string('kodenampan', 100)->unique();
            $table->unsignedBigInteger('jenisproduk_id');
            $table->integer('final_nampan')->default(1);
            $table->integer('status');
            $table->timestamps();

            $table->foreign('jenisproduk_id')->references('id')->on('jenis_produk')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nampan');
    }
};
