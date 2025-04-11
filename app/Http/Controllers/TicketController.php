<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index():Response {
        return Inertia::render('ticket');
    }

    public function addPage():Response {
        return Inertia::render('ticket/addTicket');
    }
}