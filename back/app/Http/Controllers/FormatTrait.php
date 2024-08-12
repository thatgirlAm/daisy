<?php

namespace App\Http\Controllers;




use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

Trait FormatTrait 
{
    public function format($data){
        return response()->json([
            "message"=>$data[0],
            "status"=>$data[1],
            "data"=>$data[2]
        ]);
    }

    public function formatDelete($thing){
        return response()->json([
            "message"=> $thing. " deleted.",
            "status"=>Response::HTTP_OK,
            "data"=>null
        ])
        ;
    }
    public function formatError(string $message, string $status){
        return response()->json([
            "message"=> $message,
            "status"=>$status,
            "data"=>null
        ])
        ;

    }

    public function formatNoPage(){
        return $this->formatError("N'xiste pas", response::HTTP_NO_CONTENT);
    }
}
