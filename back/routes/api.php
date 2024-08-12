<?php

use App\Http\Controllers\StatController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;

// //-----Routes with no particuliar access needed----//
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout']);
Route::get('/auth/isLoggedIn', [AuthController::class, 'isLoggedIn']);
Route::get('/auth/getUser', [AuthController::class, 'getUser']);



//----Routes with Access required---------//
Route::middleware('auth:api')->group(function(){
    
    //----------Functions-----------/
    Route::get('/users/sendemail', [UserController::class, 'create']);
    Route::get("/user", [AuthController::class, 'user']);
    Route::get("/transactionsSingle", [TransactionController::class, 'showSingle']);
    Route::get("/transactionsPerPartner", [TransactionController::class, 'showPerPartner']);
    Route::get("/transactionsPerPartnerPerDate", [TransactionController::class, 'showPerPartnerPerDate']);
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::get("/transactionsPerDate", [TransactionController::class, 'showPerDate']);
    Route::post("/auth/logout", [AuthController::class, 'logout']); 
    Route::get("/auth/isAdmin", [AuthController::class, 'isAdmin']); 
    Route::apiResource("/stats", StatController::class);
    Route::apiResource("/transactions", TransactionController::class); 
    Route::get("/error_code", [TransactionController::class, 'getErrorCodes']); 


});

