<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use DB  ;

class EcartSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [];
        $numPartenaires = 15; // Number of different partenaires
        $days = 5; // Number of days worth of ecarts

        for ($i = 1; $i <= $numPartenaires; $i++) {
            $partenaire = 'Partenaire ' . Str::random(1);

            for ($j = 0; $j < $days; $j++) {
                $data[] = [
                    'partenaire' => $partenaire,
                    'montant_ecart' => rand(1000, 200000) + rand(0, 99) / 100,
                    'nb_transactions_ecart' => rand(1, 50),
                    'nb_transactions_OM' => rand(1, 15),
                    'nb_transactions_PARTENAIRE' => rand(1, 15),
                    'total_montant_PARTENAIRE' => rand(100000, 200000000) + rand(0, 99) / 100,
                    'total_montant_OM' => rand(100000, 200000000) + rand(0, 99) / 100,
                    'created_at' => now()->subDays($j),
                    'updated_at' => now()->subDays($j),
                ];
            }
        }

        DB::table('stats')->insert($data);
    }
}
