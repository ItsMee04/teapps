<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserManagement\UserController;
use App\Http\Controllers\UserManagement\JabatanController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Login');
    })->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/jabatan', function () {
        return Inertia::render('Jabatan');
    })->name('jabatan');
    Route::get('jabatan/getJabatan', [JabatanController::class, 'getJabatan']);
    Route::post('jabatan/storeJabatan', [JabatanController::class, 'storeJabatan']);
    Route::get('jabatan/getJabatanByID/{id}', [JabatanController::class, 'getJabatanByID']);
    Route::post('jabatan/updateJabatan/{id}', [JabatanController::class, 'updateJabatan']);
    Route::delete('jabatan/deleteJabatan/{id}', [JabatanController::class, 'deleteJabatan']);

    Route::get('/role', function () {
        return Inertia::render('Role');
    })->name('role');

    Route::get('/pegawai', function () {
        return Inertia::render('Pegawai');
    })->name('pegawai');

    Route::get('/users', function () {
        return Inertia::render('Users');
    })->name('users');
    Route::get('users/getUsers', [UserController::class, 'getUsers']);

    Route::get('/test', function () {
        return auth()->user();
    });
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
