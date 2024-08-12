<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id_transaction'=>'required|string',
            'partenaire_domain_code'=>'required|string',
            'montant'=>'required|float',
            'created_at'=>'required|date',
            'id_stat'=>'rquired|integer'
        ];
    }
}
