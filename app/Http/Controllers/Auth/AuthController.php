<?php

namespace App\Http\Controllers\Auth;

use App\Models\Role;
use App\Models\User;
use App\Models\Jabatan;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use Laravel\Sanctum\TransientToken;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ], $messages);

        $user = User::with(['pegawai', 'role'])->where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Username atau password salah!',
            ], 401);
        }

        if ($user->status != 1) {
            return response()->json([
                'success' => false,
                'message' => 'User Account Belum Aktif!',
            ], 403);
        }

        // Login user dengan session
        Auth::login($user, $request->remember ?? false);

        // regenerate session supaya aman
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'Login Berhasil',
            'user'    => $user,
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logout Berhasil',
        ]);
    }
}
