<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Rute untuk login
Route::post('/login', [AuthController::class, 'login']);
// Rute untuk logout
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
// Rute lain yang memerlukan autentikasi
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function() {
    // Route::get('/jabatan/getjabatan', [JabatanController::class, 'getJabatan']);
});
