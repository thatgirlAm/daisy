<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Stat extends Model
{
    use HasFactory;

    /**
     * @var array
     */

     protected $fillable = [
        'partenaire',
        'montant_ecart',
        'nb_transactions_ecart',
        'created_at',
        'updated_at'
     ];

     /**
      * @var array
      */

    protected $casts = [
        'partenaire' => 'string',
        'montant_ecart' => 'float',
        'nb_transactions_ecart' => 'integer',
    ];


    public function transactions(){
        return $this->hasMany(Transaction::class, 'id_stat');
    }
}
