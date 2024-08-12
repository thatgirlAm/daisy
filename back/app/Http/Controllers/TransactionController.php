<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\Gate;
class TransactionController extends Controller

{
    use FormatTrait;
    /* Display all of the existing transactions */
    public function index()
    {
        return $this->format(['Index found', Response::HTTP_OK, TransactionResource::collection(Transaction::all())]);
    }

    
    /* Display the specified transaction */
    public function showSingle(Request $request)
    { 

        $id = $request->id_transaction;
        $transaction = Transaction::where('id_transaction', $id)->first();
        if($transaction)
        {
            $transactionResource = new TransactionResource($transaction);
            return $this->format(['Transaction found', Response::HTTP_OK, $transactionResource]);
        }
        return $this->formatError('Transaction not found', Response::HTTP_NOT_FOUND);
        
    }

    /* Display transactions per partner */
    public function showPerPartner(Request $request)
    {
        $partner = $request->partner_id;
        $transactions = Transaction::where('partenaire_domain_code',$partner)->get();
        if($transactions && count($transactions)>0)
        {
            $transactionResource = TransactionResource::collection($transactions);
            return $this->format(['Transactions found', Response::HTTP_OK, $transactionResource]);
        }
        return $this->formatError('Partner not found', Response::HTTP_NOT_FOUND);
        
    }

    /* Display transactions per partner at a given date */
    public function showPerPartnerPerDate(Request $request)
    {
        $partner = $request->partner_id;
        $date = $request->created_at;
        $parsedDate = Carbon::parse($date)->format('Y-m-d');
        $transactions = Transaction::where('partenaire_domain_code',$partner)->whereDate('created_at', $parsedDate)->get();
        if($transactions && count($transactions)>0)
        {
           $transactionsresource = TransactionResource::collection($transactions); 
           return $this->format(['Transactions found', Response::HTTP_OK, $transactionsresource]);
        }
        return $this->formatError('Partner not found', Response::HTTP_NOT_FOUND);
    }

    /* Display transactions per date */
    public function showPerDate(Request $request)
    {
        $date = $request->created_at;
        $parsedDate = Carbon::parse($date)->format('Y-m-d');
        $transactions = Transaction::whereDate('created_at', $parsedDate)->get();
        if($transactions && count($transactions)>0)
        {
            $transactionsresource = TransactionResource::collection($transactions);
            return $this->format(['Transactions found', Response::HTTP_OK, $transactionsresource]);
        }
        return $this->formatError('Transactions not found', Response::HTTP_NOT_FOUND);
    }
    

    /************Not useful for now************/
     
    public function update(Request $request, string $id)
    {
        return "function not initiated : udpate";
    }

    
    public function destroy(string $id)
    {
        return "function not initiated : destroy";
    }
    
    
    public function store(Request $request)
    {
        return "function not initiated : store";
    }

    public function getErrorCodes()
    {
        $errorCodes = config('error_code');
        return response()->json($errorCodes);
    }
    
}
