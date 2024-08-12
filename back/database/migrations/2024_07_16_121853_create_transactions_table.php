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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id()->unique()->invisible();
            $table->string('id_transaction');
            $table->string('partenaire');
            $table->float('montant');
            $table->integer('receiver_nb')->nullable();
            $table->integer('sender_nb')->nullable();
            $table->integer('card_nb')->nullable()->default(null);
            $table->integer('code_erreur')->nullable()->default(null);
            $table->integer('id_stat');
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
