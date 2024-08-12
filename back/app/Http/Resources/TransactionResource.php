<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_transaction' => $this->id_transaction,
            'montant'=>$this->montant,
            'created_at'=>$this->created_at,
            'partenaire'=>$this->partenaire,
            'archived'=>$this->archived, 
            'receiver_nb'=> $this->receiver_nb,
            'sender_nb'=>$this->sender_nb, 
            'code_erreur'=>$this->code_erreur,
            'id_stat'=>$this->id_stat
        ];  
    }
}
