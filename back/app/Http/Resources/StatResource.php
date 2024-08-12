<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_ecart' => $this->id,
            'partenaire'=>$this->partenaire,
            'montant_ecart'=>$this->montant_ecart,
            'nombre'=>$this->nb_transactions_ecart,
            'created_at'=>$this->created_at, 
            'nb_transactions_OM'=>$this->nb_transactions_OM,
            'nb_transactions_PARTENAIRE'=>$this->nb_transactions_OM,
            'total_montant_OM'=>$this->total_montant_OM,
            'total_montant_PARTENAIRE'=>$this->total_montant_PARTENAIRE,
        ];
    }
}
