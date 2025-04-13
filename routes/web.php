<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/ticket', [TicketController::class, 'index'])->name('ticket');
    Route::get('dashboard/ticket/add-ticket', [TicketController::class, 'addPage'])->name('add-ticket');
    Route::get('dashboard/user', [UserController::class, 'index'])->name('user');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';