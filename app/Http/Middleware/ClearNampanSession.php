<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ClearNampanSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        // kalau bukan route nampanproduk, hapus session
        if (!$request->is('nampanproduk*')) {
            session()->forget('selected_nampan_id');
        }

        return $next($request);
    }
}
