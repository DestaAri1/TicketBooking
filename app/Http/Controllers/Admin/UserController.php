<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\IdHasher;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index():Response {
        $users = User::all();
        return Inertia::render('user', [
            'users' => $users
        ]);
    }
}