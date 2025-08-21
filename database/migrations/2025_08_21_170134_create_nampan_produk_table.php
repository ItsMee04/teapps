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
        Schema::create('nampan_produk', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('nampan_id');
            $table->unsignedBigInteger('produk_id');

            // Catat jenis event untuk histori
            $table->enum('jenis', ['awal', 'masuk', 'keluar', 'pindah']);
            $table->date('tanggal_event');

            // Khusus untuk pindah
            $table->unsignedBigInteger('nampan_asal_id')->nullable();
            $table->unsignedBigInteger('nampan_tujuan_id')->nullable();

            $table->text('keterangan')->nullable();
            $table->unsignedBigInteger('oleh');
            $table->integer('status');
            $table->timestamps();

            $table->foreign('nampan_id')->references('id')->on('nampan')->onDelete('cascade');
            $table->foreign('produk_id')->references('id')->on('produk')->onDelete('cascade');
            $table->foreign('oleh')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nampan_produk');
    }
};
