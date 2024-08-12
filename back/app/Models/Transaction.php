<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Transaction extends Model
{
    use HasFactory;
     /** 
    * @var array
    */

    protected $fillable=[
        'id_transaction',
        'partenaire_domain_code',
        'montant',
        'receiver_nb',
        'sender_nb',
        'card_nb',
        'archived',
        'id_stat',
        'created_at',
        'updated_at'
    ];

     /** 
    * @var array
    */


    protected $casts = [
        'archived' => 'boolean',
        'id_stat' => 'integer',
        'id_transaction'=>'string'
    ];
    /** 
    * @var array
    */

    protected $attributes = [
        'archived'=>true,
        'id_stat'=>null,
        'id_transaction'=>'string'
    ];

    public function stat()
    {
        return $this->belongsTo(Stat::class, 'id_stat');
    }


}
