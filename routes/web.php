<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Produk\DiskonController;
use App\Http\Controllers\Produk\NampanController;
use App\Http\Controllers\Produk\ProdukController;
use App\Http\Controllers\Produk\KondisiController;
use App\Http\Controllers\Produk\JenisProdukController;
use App\Http\Controllers\Produk\NampanProdukController;
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
    Route::get('/me', function () {
        return auth()->user();
    });

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
    Route::get('users/getUsersByID/{id}', [UserController::class, 'getUsersByID']);
    Route::post('users/updateUsers/{id}', [UserController::class, 'updateUsers']);

    Route::get('/kondisi', function () {
        return Inertia::render('Kondisi');
    })->name('kondisi');
    Route::get('kondisi/getKondisi', [KondisiController::class, 'getKondisi']);
    Route::post('kondisi/storeKondisi', [KondisiController::class, 'storeKondisi']);
    Route::get('kondisi/getKondisiByID/{id}', [KondisiController::class, 'getKondisiByID']);
    Route::post('kondisi/updateKondisi/{id}', [KondisiController::class, 'updateKondisi']);
    Route::delete('kondisi/deleteKondisi/{id}', [KondisiController::class, 'deletekondisi']);

    Route::get('/diskon', function () {
        return Inertia::render('Diskon');
    })->name('diskon');
    Route::get('diskon/getDiskon', [DiskonController::class, 'getDiskon']);
    Route::post('diskon/storeDiskon', [DiskonController::class, 'storeDiskon']);
    Route::get('diskon/getDiskonByID/{id}', [DiskonController::class, 'getDiskonByID']);
    Route::post('diskon/updateDiskon/{id}', [DiskonController::class, 'updateDiskon']);
    Route::delete('diskon/deleteDiskon/{id}', [DiskonController::class, 'deleteDiskon']);

    Route::get('/jenisproduk', function () {
        return Inertia::render('JenisProduk');
    })->name('jenisproduk');
    Route::get('jenisproduk/getJenisProduk', [JenisProdukController::class, 'getJenisProduk']);
    Route::post('jenisproduk/storeJenisProduk', [JenisProdukController::class, 'storeJenisProduk']);
    Route::get('jenisproduk/getJenisProdukByID/{id}', [JenisProdukController::class, 'getJenisProdukByID']);
    Route::post('jenisproduk/updateJenisProduk/{id}', [JenisProdukController::class, 'updateJenisProduk']);
    Route::delete('jenisproduk/deleteJenisProduk/{id}', [JenisProdukController::class, 'deleteJenisProduk']);

    Route::get('/produk', function () {
        return Inertia::render('Produk');
    })->name('produk');
    Route::get('produk/getProduk', [ProdukController::class, 'getProduk']);
    Route::post('produk/storeProduk', [ProdukController::class, 'storeProduk']);
    Route::get('produk/getProdukByID/{id}', [ProdukController::class, 'getProdukByID']);
    Route::post('produk/updateProduk/{id}', [ProdukController::class, 'updateProduk']);
    Route::delete('produk/deleteProduk/{id}', [ProdukController::class, 'deleteProduk']);

    Route::get('/nampan', function () {
        return Inertia::render('Nampan');
    })->name('nampan');
    Route::get('nampan/getNampan', [NampanController::class, 'getNampan']);
    Route::post('nampan/storeNampan', [NampanController::class, 'storeNampan']);
    Route::get('nampan/getNampanByID/{id}', [NampanController::class, 'getNampanByID']);
    Route::post('nampan/updateNampan/{id}', [NampanController::class, 'updateNampan']);
    Route::get('nampan/finalNampan/{id}', [NampanController::class, 'finalNampan']);
    Route::get('nampan/tutupNampan/{id}', [NampanController::class, 'tutupNampan']);

    Route::match(['get', 'post'], '/nampanproduk', function (Request $request) {
        // Kalau ada data dari POST, simpan ke session
        if ($request->isMethod('post')) {
            session(['selected_nampan_id' => $request->id]);
        }

        // Ambil dari session untuk dikirim ke Inertia
        return Inertia::render('NampanProduk', [
            'id' => session('selected_nampan_id'),
        ]);
    })->name('nampanproduk');
    Route::get('/nampanproduk/getNampanProduk/{id}', [NampanProdukController::class, 'getNampanProduk']);
    Route::get('/nampanroduk/getProdukNampan/{id}', [NampanProdukController::class, 'getProdukNampan']);
    Route::post('nampan/nampanproduk/storeProdukNampan/{id}', [NampanProdukController::class, 'storeProdukNampan']);
    Route::delete('nampan/nampanproduk/deleteNampanProduk/{id}', [NampanProdukController::class, 'deleteNampanProduk']);


    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
