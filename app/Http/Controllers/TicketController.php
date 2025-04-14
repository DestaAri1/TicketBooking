<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(): Response
    {
        $tickets = Ticket::all();
        return Inertia::render('ticket', [
            'tickets' => $tickets,
        ]);
    }

    public function addPage(): Response
    {
        return Inertia::render('ticket/addTicket');
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'artist' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'venue' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'image' => 'required|image|max:5120', // 5MB max
        ]);

        dd($validated);

        try {
            // Handle image upload
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('ticket', 'public');
            }

            // Create the ticket with proper field mapping
            Ticket::create([
                'name' => $validated['title'],
                'artist' => $validated['artist'],
                'date' => $validated['date'],
                'time' => $validated['time'],
                'vanue' => $validated['venue'],
                'price' => $validated['price'],
                'description' => $validated['description'],
                'image' => $imagePath,
            ]);

            return redirect()->route('dashboard.ticket')->with('success', 'Ticket created successfully!');
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('Ticket creation failed: ' . $e->getMessage());

            return redirect()->back()
                ->withInput()
                ->with('error', 'Failed to create ticket. Please try again.');
        }
    }
}