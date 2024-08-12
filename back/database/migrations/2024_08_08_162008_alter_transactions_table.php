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
        Schema::table('stats', function(Blueprint $table){
            $table->integer('nb_transactions_OM')->nullable();
            $table->float('total_montant_OM')->nullable();
            $table->integer('nb_transactions_PARTENAIRE')->nullable();
            $table->float('total_montant_PARTENAIRE')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
