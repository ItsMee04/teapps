<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserManagement\RoleController;
use App\Http\Controllers\UserManagement\UserController;
use App\Http\Controllers\UserManagement\JabatanController;
use App\Http\Controllers\UserManagement\PegawaiController;

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
    Route::get('role/getRole', [RoleController::class, 'getRole']);
    Route::post('role/storeRole', [RoleController::class, 'storeRole']);
    Route::get('role/getRoleByID/{id}', [RoleController::class, 'getRoleByID']);
    Route::post('role/updateRole/{id}', [RoleController::class, 'updateRole']);
    Route::delete('role/deleteRole/{id}', [RoleController::class, 'deleteRole']);

    Route::get('/pegawai', function () {
        return Inertia::render('Pegawai');
    })->name('pegawai');
    Route::get('pegawai/getPegawai', [PegawaiController::class, 'getPegawai']);
    Route::post('pegawai/storePegawai', [PegawaiController::class, 'storePegawai']);
    Route::get('pegawai/getPegawaiByID/{id}', [PegawaiController::class, 'getPegawaiByID']);
    Route::post('pegawai/updatePegawai/{id}', [PegawaiController::class, 'updatePegawai']);
    Route::delete('pegawai/deletePegawai/{id}', [PegawaiController::class, 'deletePegawai']);

    Route::get('/users', function () {
        return Inertia::render('Users');
    })->name('users');
    Route::get('users/getUsers', [UserController::class, 'getUsers']);

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
