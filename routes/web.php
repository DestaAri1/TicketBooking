<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('/ticket')->group(function() {
        Route::get('/', [TicketController::class, 'index'])->name('ticket');
        Route::get('/add-ticket', [TicketController::class, 'addPage'])->name('add-ticket');
        Route::post('/create-ticket', [TicketController::class, 'create'])->name('create-ticket');
        Route::get('/{id}/edit', [TicketController::class, 'edit'])->name('ticket.edit');
    });

    Route::prefix('/user')->group(function() {
        Route::get('/', [UserController::class, 'index'])->name('user');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';