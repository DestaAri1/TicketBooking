<?php

namespace App\Http\Controllers;

use App\Helpers\ImageUploader;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
public function index(): Response
{
    $tickets = Ticket::all()->map(function($ticket) {
        // Pastikan imageUrl hanya berisi nama file tanpa folder
        $ticket->imageUrl = url($ticket->imageUrl);
        return $ticket;
    });

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
        // $validated = $request->validate([
        //     'title' => 'required|string|max:255',
        //     'artist' => 'required|string|max:255',
        //     'date' => 'required|date',
        //     'time' => 'required',
        //     'venue' => 'required|string|max:255',
        //     'price' => 'required|numeric',
        //     'description' => 'required|string',
        //     'image' => 'required|image|max:5120', // 5MB max
        // ]);

        // dd($request->all());

        $imagePath = null;
        if ($request->imagePreview) {
            $imagePath = ImageUploader::uploadBase64($request->imagePreview);
        } elseif ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imagePath = ImageUploader::upload($request->file('image'));
        }

        // Create the ticket
        Ticket::create([
            'name' => $request->title,
            'artist' => $request->artist,
            'date' => $request->date,
            'time' => $request->time,
            'venue' => $request->venue,
            'price' => $request->price,
            'description' => $request->description,
            'imageUrl' => $imagePath,
        ]);

        return redirect()->route('ticket')->with('success', 'Ticket created successfully!');
    }
}
