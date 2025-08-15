<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::get('/jabatan', function () {
    return Inertia::render('Jabatan');
})->name('jabatan');

Route::get('/role', function () {
    return Inertia::render('Role');
})->name('role');

Route::get('/pegawai', function () {
    return Inertia::render('Pegawai');
})->name('pegawai');
