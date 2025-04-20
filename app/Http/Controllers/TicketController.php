<?php

namespace App\Http\Controllers;

use App\Helpers\IdHasher;
use App\Helpers\ImageUploader;
use App\Http\Requests\TicketRequest;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(): Response
    {
        $tickets = Ticket::all()->map(function($ticket) {
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

    public function create(TicketRequest $request)
    {
        $imagePath = null;
        if ($request->imagePreview) {
            $imagePath = ImageUploader::uploadBase64($request->imagePreview);
        } elseif ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imagePath = ImageUploader::upload($request->file('image'));
        } else {
            return redirect()->back()->withErrors(['image' => 'Poster konser wajib diunggah']);
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

    public function edit($id)
    {
        // $id = $this->idHasher->decode($id);
        // // dd($id);
        // if (!$id) {
        //     abort(404);
        // }

        $ticket = Ticket::findOrFail($id);
        // lanjutkan proses edit

        return Inertia::render('ticket/EditTicket', [
            'ticket' => $ticket
        ]);
    }

}
